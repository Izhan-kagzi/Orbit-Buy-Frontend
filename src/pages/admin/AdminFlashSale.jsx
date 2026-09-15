import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiImage,
  FiRefreshCw,
  FiSave,
  FiTrash2,
  FiUpload,
  FiX,
  FiZap,
} from "react-icons/fi";

import AdminLayout from "../../components/Admin/AdminLayout";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://orbit-buy.onrender.com/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

const getImageUrl = (path) => {
  if (!path) return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
};

const toDateTimeLocal = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (number) =>
    String(number).padStart(2, "0");

  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
};

const getToken = () => {
  return localStorage.getItem("orbit-token") || "";
};

const getStatus = (sale) => {
  if (!sale?.active) {
    return {
      label: "Inactive",
      className:
        "bg-gray-100 text-gray-600",
    };
  }

  const now = Date.now();

  const start = sale.startTime
    ? new Date(sale.startTime).getTime()
    : null;

  const end = sale.endTime
    ? new Date(sale.endTime).getTime()
    : null;

  if (start && now < start) {
    return {
      label: "Upcoming",
      className:
        "bg-amber-100 text-amber-700",
    };
  }

  if (end && now >= end) {
    return {
      label: "Ended",
      className:
        "bg-red-100 text-red-700",
    };
  }

  return {
    label: "Live",
    className:
      "bg-emerald-100 text-emerald-700",
  };
};

function AdminFlashSale() {
  const [sale, setSale] = useState(null);

  const [title, setTitle] =
    useState("Flash Sale!");

  const [description, setDescription] =
    useState(
      "Up to 30% off - Limited Time Offer!"
    );

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [active, setActive] = useState(false);

  const [existingImages, setExistingImages] =
    useState([]);

  const [newImages, setNewImages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [resetting, setResetting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* ============================================================
     LOAD
  ============================================================ */

  const loadFlashSale = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/flash-sale`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load Flash Sale."
        );
      }

      const flashSale =
        data.flashSale || {};

      setSale(flashSale);

      setTitle(
        flashSale.title ||
          "Flash Sale!"
      );

      setDescription(
        flashSale.description ||
          "Up to 30% off - Limited Time Offer!"
      );

      setStartTime(
        toDateTimeLocal(
          flashSale.startTime
        )
      );

      setEndTime(
        toDateTimeLocal(
          flashSale.endTime
        )
      );

      setActive(
        Boolean(flashSale.active)
      );

      setExistingImages(
        Array.isArray(flashSale.images)
          ? flashSale.images
          : []
      );

      setNewImages([]);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load Flash Sale."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlashSale();
  }, []);

  /* ============================================================
     IMAGE SELECTION
  ============================================================ */

  const handleImageChange = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const availableSlots =
      Math.max(
        0,
        6 -
          existingImages.length -
          newImages.length
      );

    if (availableSlots <= 0) {
      setError(
        "You can use a maximum of 6 Flash Sale images."
      );
      return;
    }

    const selected = files
      .slice(0, availableSlots)
      .filter((file) =>
        file.type.startsWith("image/")
      );

    setNewImages((previous) => [
      ...previous,
      ...selected,
    ]);

    event.target.value = "";
  };

  const removeExistingImage = (index) => {
    setExistingImages((previous) =>
      previous.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  const removeNewImage = (index) => {
    setNewImages((previous) =>
      previous.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  /* ============================================================
     SAVE
  ============================================================ */

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (
        startTime &&
        endTime &&
        new Date(startTime) >=
          new Date(endTime)
      ) {
        throw new Error(
          "End time must be after start time."
        );
      }

      const formData =
        new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "description",
        description.trim()
      );

      formData.append(
        "startTime",
        startTime
      );

      formData.append(
        "endTime",
        endTime
      );

      formData.append(
        "active",
        String(active)
      );

      formData.append(
        "existingImages",
        JSON.stringify(
          existingImages
        )
      );

      newImages.forEach((file) => {
        formData.append(
          "images",
          file
        );
      });

      const token = getToken();

      const response = await fetch(
        `${API_URL}/flash-sale`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to save Flash Sale."
        );
      }

      setSale(data.flashSale);

      setExistingImages(
        data.flashSale?.images || []
      );

      setNewImages([]);

      setSuccess(
        "Flash Sale saved successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err.message ||
          "Unable to save Flash Sale."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     RESET
  ============================================================ */

  const handleReset = async () => {
    const confirmed =
      window.confirm(
        "Reset the Flash Sale? This will remove the sale images and timing."
      );

    if (!confirmed) return;

    setResetting(true);
    setError("");
    setSuccess("");

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/flash-sale`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to reset Flash Sale."
        );
      }

      const flashSale =
        data.flashSale || {};

      setSale(flashSale);

      setTitle(
        flashSale.title ||
          "Flash Sale!"
      );

      setDescription(
        flashSale.description ||
          "Up to 30% off - Limited Time Offer!"
      );

      setStartTime("");
      setEndTime("");

      setActive(false);

      setExistingImages([]);

      setNewImages([]);

      setSuccess(
        "Flash Sale has been reset."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to reset Flash Sale."
      );
    } finally {
      setResetting(false);
    }
  };

  const status = useMemo(
    () => getStatus(sale),
    [sale]
  );

  const totalImages =
    existingImages.length +
    newImages.length;

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <FiRefreshCw className="animate-spin" />
            Loading Flash Sale...
          </div>
        </div>
      </AdminLayout>
    );
  }

  /* ============================================================
     UI
  ============================================================ */

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-lg">
                <FiZap size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Flash Sale
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your homepage Flash Sale,
                  images and countdown.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}
            >
              {status.label}
            </span>

            <button
              type="button"
              onClick={handleReset}
              disabled={resetting}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiTrash2 />

              {resetting
                ? "Resetting..."
                : "Reset"}
            </button>
          </div>
        </div>

        {/* ALERTS */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
            <FiX className="mt-0.5 shrink-0" />

            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
            <FiCheck className="mt-0.5 shrink-0" />

            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* LEFT */}

            <div className="space-y-6">
              {/* BASIC DETAILS */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Sale Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Configure the content displayed
                    on the Flash Sale section.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Sale Title
                    </label>

                    <input
                      type="text"
                      value={title}
                      onChange={(event) =>
                        setTitle(
                          event.target.value
                        )
                      }
                      placeholder="Flash Sale!"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      value={description}
                      onChange={(event) =>
                        setDescription(
                          event.target.value
                        )
                      }
                      rows={4}
                      placeholder="Up to 30% off - Limited Time Offer!"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/10"
                    />
                  </div>
                </div>
              </section>

              {/* TIMING */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Sale Schedule
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Set when the Flash Sale should
                    start and end.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FiCalendar />
                      Start Date & Time
                    </label>

                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(event) =>
                        setStartTime(
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FiClock />
                      End Date & Time
                    </label>

                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(event) =>
                        setEndTime(
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/10"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Enable Flash Sale
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      The sale follows the schedule
                      above.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setActive(
                        (previous) =>
                          !previous
                      )
                    }
                    className={`relative h-7 w-12 rounded-full transition ${
                      active
                        ? "bg-brand-primary"
                        : "bg-gray-300"
                    }`}
                    aria-label="Toggle Flash Sale"
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                        active
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </section>

              {/* IMAGES */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Sale Images
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Upload up to 6 images for the
                      Flash Sale section.
                    </p>
                  </div>

                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
                    <FiUpload />

                    Add Images

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      multiple
                      onChange={
                        handleImageChange
                      }
                      className="hidden"
                    />
                  </label>
                </div>

                {totalImages === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 px-6 py-12 text-center">
                    <FiImage
                      size={34}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-semibold text-gray-700">
                      No Flash Sale images
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Upload images to display on
                      the homepage.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {existingImages.map(
                      (image, index) => (
                        <div
                          key={`existing-${image}-${index}`}
                          className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                        >
                          <img
                            src={getImageUrl(image)}
                            alt={`Flash Sale ${index + 1}`}
                            className="aspect-[4/3] w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeExistingImage(
                                index
                              )
                            }
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-lg transition hover:bg-red-50"
                            aria-label="Remove image"
                          >
                            <FiX />
                          </button>

                          <span className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
                            Saved
                          </span>
                        </div>
                      )
                    )}

                    {newImages.map(
                      (file, index) => (
                        <div
                          key={`new-${file.name}-${index}`}
                          className="group relative overflow-hidden rounded-2xl border border-brand-primary/20 bg-gray-100"
                        >
                          <img
                            src={URL.createObjectURL(
                              file
                            )}
                            alt={file.name}
                            className="aspect-[4/3] w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeNewImage(
                                index
                              )
                            }
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-lg transition hover:bg-red-50"
                            aria-label="Remove image"
                          >
                            <FiX />
                          </button>

                          <span className="absolute bottom-2 left-2 rounded-lg bg-brand-primary px-2 py-1 text-[10px] font-semibold text-white">
                            New
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}

                <p className="mt-4 text-xs text-gray-400">
                  {totalImages}/6 images selected
                </p>
              </section>
            </div>

            {/* RIGHT */}

            <aside className="space-y-6">
              {/* PREVIEW */}

              <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-5">
                  <h2 className="font-bold text-gray-900">
                    Preview
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    How the Flash Sale will appear
                    conceptually.
                  </p>
                </div>

                <div className="bg-gray-950 p-5 text-white">
                  <div className="mb-5 flex items-center gap-2">
                    <FiZap />

                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      {title ||
                        "Flash Sale!"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">
                    {description ||
                      "Limited Time Offer!"}
                  </h3>

                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {[
                      "00",
                      "00",
                      "00",
                      "00",
                    ].map(
                      (value, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-white/10 p-2 text-center"
                        >
                          <div className="text-xl font-bold">
                            {value}
                          </div>

                          <div className="mt-1 text-[9px] uppercase text-white/50">
                            {[
                              "Days",
                              "Hours",
                              "Min",
                              "Sec",
                            ][index]}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {totalImages > 0 && (
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {[
                        ...existingImages,
                        ...newImages,
                      ]
                        .slice(0, 2)
                        .map(
                          (image, index) => (
                            <div
                              key={index}
                              className="overflow-hidden rounded-xl"
                            >
                              <img
                                src={
                                  typeof image ===
                                  "string"
                                    ? getImageUrl(
                                        image
                                      )
                                    : URL.createObjectURL(
                                        image
                                      )
                                }
                                alt=""
                                className="aspect-[4/3] w-full object-cover"
                              />
                            </div>
                          )
                        )}
                    </div>
                  )}
                </div>
              </section>

              {/* STATUS */}

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 font-bold text-gray-900">
                  Sale Status
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Status
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Images
                    </span>

                    <span className="font-semibold text-gray-900">
                      {totalImages}/6
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Enabled
                    </span>

                    <span className="font-semibold text-gray-900">
                      {active
                        ? "Yes"
                        : "No"}
                    </span>
                  </div>
                </div>
              </section>

              {/* SAVE */}

              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-4 font-bold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <FiRefreshCw className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Save Flash Sale
                  </>
                )}
              </button>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs leading-5 text-blue-700">
                <strong>Tip:</strong> Set both a
                start and end time for automatic
                countdown control. The homepage will
                automatically determine whether the
                sale is upcoming, live or ended.
              </div>
            </aside>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminFlashSale;