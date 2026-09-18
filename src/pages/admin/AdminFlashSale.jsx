import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FiCalendar,
  FiClock,
  FiEdit2,
  FiImage,
  FiPercent,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiTrash2,
  FiUpload,
  FiX,
  FiZap,
} from "react-icons/fi";

import AdminLayout from "../../components/Admin/AdminLayout";
import api, {
  getImageUrl,
} from "../../services/api";

/* ============================================================
   HELPERS
============================================================ */

/* Backend ISO date -> value a <input type="datetime-local"> accepts. */
const toDateTimeLocal = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const pad = (number) =>
    String(number).padStart(2, "0");

  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
};

const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatNumber = (value) =>
  String(Math.max(0, Number(value) || 0)).padStart(2, "0");

/*
 * Countdown for a single sale.
 *
 * Before it starts  -> counts down to the start time.
 * While it runs     -> counts down to the end time.
 * After it ends     -> zeroes.
 */
const getCountdown = (sale, currentTime) => {
  const zero = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (!sale?.active || !sale.startTime || !sale.endTime) {
    return zero;
  }

  const start = new Date(sale.startTime).getTime();
  const end = new Date(sale.endTime).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) return zero;

  const target =
    currentTime < start
      ? start
      : currentTime < end
      ? end
      : null;

  if (!target) return zero;

  const diff = Math.max(0, target - currentTime);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

/*
 * The backend already returns a computed `status`, but recomputing
 * it locally keeps the badge ticking between refetches.
 */
const getStatus = (sale, currentTime) => {
  if (!sale?.active) {
    return {
      label: "Inactive",
      className: "bg-gray-100 text-gray-600",
    };
  }

  const start = sale.startTime
    ? new Date(sale.startTime).getTime()
    : null;

  const end = sale.endTime
    ? new Date(sale.endTime).getTime()
    : null;

  if (start && currentTime < start) {
    return {
      label: "Upcoming",
      className: "bg-amber-100 text-amber-700",
    };
  }

  if (end && currentTime >= end) {
    return {
      label: "Ended",
      className: "bg-red-100 text-red-700",
    };
  }

  return {
    label: "Live",
    className: "bg-emerald-100 text-emerald-700",
  };
};

const MAX_IMAGES = 6;

const emptyForm = {
  title: "Flash Sale!",
  description: "Up to 30% off - Limited Time Offer!",
  discountPercent: "",
  startTime: "",
  endTime: "",
  active: true,
};

/* ============================================================
   COMPONENT
============================================================ */

function AdminFlashSale() {
  const [sales, setSales] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* null = the "add a new sale" form, otherwise the id being edited */
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  /* Updates every second so the countdowns and badges stay live. */
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  /* ============================================================
     LOAD
  ============================================================ */

  const loadSales = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.get("/flash-sale/all", {
        auth: false,
      });

      setSales(data?.flashSales || []);
    } catch (err) {
      setSales([]);
      setError(
        err.message || "Unable to load flash sales."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSuccess = (text) => {
    setSuccess(text);
    window.setTimeout(() => setSuccess(""), 3000);
  };

  /* ============================================================
     FORM HELPERS
  ============================================================ */

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setExistingImages([]);
    setNewImages([]);
    setEditingId(null);
    setError("");
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (sale) => {
    setEditingId(sale.id);

    setForm({
      title: sale.title || "",
      description: sale.description || "",
      discountPercent:
        sale.discountPercent === null ||
        sale.discountPercent === undefined
          ? ""
          : String(sale.discountPercent),
      startTime: toDateTimeLocal(sale.startTime),
      endTime: toDateTimeLocal(sale.endTime),
      active: Boolean(sale.active),
    });

    setExistingImages(
      Array.isArray(sale.images) ? sale.images : []
    );

    setNewImages([]);
    setError("");
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };

  /* ============================================================
     IMAGES
  ============================================================ */

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const availableSlots = Math.max(
      0,
      MAX_IMAGES - existingImages.length - newImages.length
    );

    if (availableSlots <= 0) {
      setError(
        `You can use a maximum of ${MAX_IMAGES} flash sale images.`
      );
      event.target.value = "";
      return;
    }

    const selected = files
      .slice(0, availableSlots)
      .filter((file) => file.type.startsWith("image/"));

    if (!selected.length) {
      setError("Please select valid image files.");
      event.target.value = "";
      return;
    }

    setNewImages((previous) => [
      ...previous,
      ...selected.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);

    setError("");
    event.target.value = "";
  };

  const removeExistingImage = (path) => {
    setExistingImages((previous) =>
      previous.filter((image) => image !== path)
    );
  };

  const removeNewImage = (index) => {
    setNewImages((previous) => {
      const target = previous[index];

      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }

      return previous.filter((_, i) => i !== index);
    });
  };

  /* Release object URLs when the component goes away. */
  useEffect(() => {
    return () => {
      newImages.forEach((item) => {
        if (item?.preview) URL.revokeObjectURL(item.preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================================================
     SAVE  (POST to add, PUT to edit)
  ============================================================ */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Please enter a flash sale title.");
      return;
    }

    if (!form.startTime || !form.endTime) {
      setError(
        "Please choose both a start and an end date & time."
      );
      return;
    }

    if (
      new Date(form.startTime) >= new Date(form.endTime)
    ) {
      setError("End time must be after start time.");
      return;
    }

    if (form.discountPercent !== "") {
      const percent = Number(form.discountPercent);

      if (
        !Number.isFinite(percent) ||
        percent < 0 ||
        percent > 100
      ) {
        setError("Discount must be between 0 and 100.");
        return;
      }
    }

    setSaving(true);

    try {
      /*
       * Sent as FormData because banner images ride along with the
       * text fields. The backend accepts both FormData and JSON.
       */
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append(
        "description",
        form.description.trim()
      );
      formData.append("startTime", form.startTime);
      formData.append("endTime", form.endTime);
      formData.append("active", String(form.active));
      formData.append(
        "discountPercent",
        form.discountPercent
      );
      formData.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      newImages.forEach((item) => {
        formData.append("images", item.file);
      });

      const data = editingId
        ? await api.put(
            `/flash-sale/${editingId}`,
            formData,
            { isFormData: true }
          )
        : await api.post("/flash-sale", formData, {
            isFormData: true,
          });

      showSuccess(
        data?.message ||
          (editingId
            ? "Flash sale updated successfully."
            : "Flash sale added successfully.")
      );

      closeForm();
      await loadSales();
      setCurrentTime(Date.now());
    } catch (err) {
      setError(
        err.status === 401
          ? "Your session has expired. Please log in again."
          : err.message || "Unable to save the flash sale."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     DELETE ONE SALE
  ============================================================ */

  const handleDelete = async (sale) => {
    const confirmed = window.confirm(
      `Delete "${sale.title}"?\n\nThis cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(sale.id);
    setError("");

    try {
      await api.delete(`/flash-sale/${sale.id}`);

      // Drop it locally straight away so the card disappears
      // without waiting on the refetch.
      setSales((previous) =>
        previous.filter((item) => item.id !== sale.id)
      );

      showSuccess("Flash sale deleted successfully.");

      if (editingId === sale.id) closeForm();

      await loadSales();
    } catch (err) {
      setError(
        err.message || "Unable to delete the flash sale."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* ============================================================
     QUICK ACTIVE TOGGLE
  ============================================================ */

  const toggleActive = async (sale) => {
    setError("");

    try {
      await api.put(`/flash-sale/${sale.id}`, {
        active: !sale.active,
      });

      showSuccess(
        sale.active
          ? "Flash sale switched off."
          : "Flash sale switched on."
      );

      await loadSales();
    } catch (err) {
      setError(
        err.message || "Unable to update the flash sale."
      );
    }
  };

  /* ============================================================
     DERIVED
  ============================================================ */

  const liveCount = useMemo(
    () =>
      sales.filter(
        (sale) =>
          getStatus(sale, currentTime).label === "Live"
      ).length,
    [sales, currentTime]
  );

  const upcomingCount = useMemo(
    () =>
      sales.filter(
        (sale) =>
          getStatus(sale, currentTime).label === "Upcoming"
      ).length,
    [sales, currentTime]
  );

  const totalImages =
    existingImages.length + newImages.length;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-brand-primary">
              Promotions
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold text-brand-dark">
              Flash Sales
            </h1>

            <p className="mt-2 text-gray-500">
              Schedule as many sales as you like — each with
              its own start and end date &amp; time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadSales}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-brand-dark shadow-sm transition hover:border-brand-primary hover:text-brand-primary"
            >
              <FiRefreshCw
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={
                showForm && !editingId
                  ? closeForm
                  : openAddForm
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white transition hover:bg-brand-dark"
            >
              {showForm && !editingId ? (
                <>
                  <FiX />
                  Close
                </>
              ) : (
                <>
                  <FiPlus />
                  Add Flash Sale
                </>
              )}
            </button>
          </div>
        </div>

        {/* ==================================================
            ALERTS
        ================================================== */}

        {error && (
          <div className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-bold"
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {/* ==================================================
            SUMMARY
        ================================================== */}

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Total Sales
            </p>
            <p className="mt-2 text-3xl font-black text-brand-dark">
              {sales.length}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Live Now
            </p>
            <p className="mt-2 text-3xl font-black text-emerald-600">
              {liveCount}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Scheduled
            </p>
            <p className="mt-2 text-3xl font-black text-amber-600">
              {upcomingCount}
            </p>
          </div>
        </div>

        {/* ==================================================
            ADD / EDIT FORM
        ================================================== */}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary text-white">
                <FiZap />
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-dark">
                  {editingId
                    ? "Edit Flash Sale"
                    : "New Flash Sale"}
                </h2>

                <p className="text-sm text-gray-500">
                  Set the banner copy and the exact window
                  it should run for.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              {/* TITLE */}
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-brand-dark">
                  Title
                </label>

                <input
                  value={form.title}
                  onChange={(event) =>
                    updateField("title", event.target.value)
                  }
                  maxLength={120}
                  placeholder="Weekend Flash Sale"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-brand-dark">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  rows={3}
                  maxLength={500}
                  placeholder="Up to 40% off across the store."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary"
                />
              </div>

              {/* START */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-dark">
                  <FiCalendar className="text-brand-primary" />
                  Starts on (date &amp; time)
                </label>

                <input
                  type="datetime-local"
                  value={form.startTime}
                  onChange={(event) =>
                    updateField(
                      "startTime",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary"
                />
              </div>

              {/* END */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-dark">
                  <FiClock className="text-brand-primary" />
                  Ends on (date &amp; time)
                </label>

                <input
                  type="datetime-local"
                  value={form.endTime}
                  onChange={(event) =>
                    updateField(
                      "endTime",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary"
                />
              </div>

              {/* DISCOUNT */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-dark">
                  <FiPercent className="text-brand-primary" />
                  Discount shown on the banner (optional)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.discountPercent}
                  onChange={(event) =>
                    updateField(
                      "discountPercent",
                      event.target.value
                    )
                  }
                  placeholder="30"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-brand-primary"
                />
              </div>

              {/* ACTIVE */}
              <div className="flex items-end">
                <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                  <span className="text-sm font-semibold text-brand-dark">
                    Active
                  </span>

                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(event) =>
                      updateField(
                        "active",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 accent-brand-primary"
                  />
                </label>
              </div>

              {/* IMAGES */}
              <div className="lg:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-dark">
                  <FiImage className="text-brand-primary" />
                  Banner images ({totalImages}/{MAX_IMAGES})
                </label>

                <div className="flex flex-wrap gap-4">
                  {existingImages.map((path) => (
                    <div
                      key={path}
                      className="relative h-28 w-28 overflow-hidden rounded-2xl border border-gray-200"
                    >
                      <img
                        src={getImageUrl(path)}
                        alt="Flash sale banner"
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingImage(path)
                        }
                        className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-red-600 shadow"
                        title="Remove image"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}

                  {newImages.map((item, index) => (
                    <div
                      key={item.preview}
                      className="relative h-28 w-28 overflow-hidden rounded-2xl border border-brand-primary/40"
                    >
                      <img
                        src={item.preview}
                        alt="New banner"
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeNewImage(index)
                        }
                        className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-red-600 shadow"
                        title="Remove image"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}

                  {totalImages < MAX_IMAGES && (
                    <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 transition hover:border-brand-primary hover:text-brand-primary">
                      <FiUpload size={20} />
                      <span className="text-xs font-semibold">
                        Upload
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
              >
                <FiSave />
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Add Flash Sale"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-brand-dark transition hover:border-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ==================================================
            SALES LIST
        ================================================== */}

        {loading ? (
          <div className="space-y-5">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-3xl border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        ) : sales.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-14 text-center">
            <FiZap
              className="mx-auto text-gray-300"
              size={45}
            />

            <h2 className="mt-5 text-2xl font-bold text-brand-dark">
              No flash sales yet
            </h2>

            <p className="mt-2 text-gray-500">
              Add one and it will appear on the storefront
              as soon as its start time arrives.
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
            >
              <FiPlus />
              Add Flash Sale
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {sales.map((sale) => {
              const status = getStatus(sale, currentTime);
              const countdown = getCountdown(
                sale,
                currentTime
              );

              const isCounting =
                status.label === "Live" ||
                status.label === "Upcoming";

              return (
                <article
                  key={sale.id}
                  className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-6 p-7 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold text-brand-dark">
                          {sale.title}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${status.className}`}
                        >
                          {status.label}
                        </span>

                        {sale.discountPercent !== null &&
                          sale.discountPercent !==
                            undefined && (
                            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary">
                              {sale.discountPercent}% OFF
                            </span>
                          )}
                      </div>

                      {sale.description && (
                        <p className="mt-2 text-gray-500">
                          {sale.description}
                        </p>
                      )}

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-gray-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Starts
                          </p>
                          <p className="mt-1 font-semibold text-brand-dark">
                            {formatDateTime(
                              sale.startTime
                            )}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-gray-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Ends
                          </p>
                          <p className="mt-1 font-semibold text-brand-dark">
                            {formatDateTime(sale.endTime)}
                          </p>
                        </div>
                      </div>

                      {isCounting && (
                        <div className="mt-5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {status.label === "Upcoming"
                              ? "Starts in"
                              : "Ends in"}
                          </p>

                          <div className="mt-2 flex gap-3">
                            {[
                              ["Days", countdown.days],
                              ["Hrs", countdown.hours],
                              ["Min", countdown.minutes],
                              ["Sec", countdown.seconds],
                            ].map(([label, value]) => (
                              <div
                                key={label}
                                className="rounded-xl bg-brand-dark px-3 py-2 text-center text-white"
                              >
                                <p className="text-lg font-black leading-none">
                                  {formatNumber(value)}
                                </p>
                                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/60">
                                  {label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {Array.isArray(sale.images) &&
                        sale.images.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-3">
                            {sale.images.map((path) => (
                              <img
                                key={path}
                                src={getImageUrl(path)}
                                alt={sale.title}
                                className="h-20 w-20 rounded-xl border border-gray-200 object-cover"
                              />
                            ))}
                          </div>
                        )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex shrink-0 flex-wrap gap-2 lg:flex-col">
                      <button
                        type="button"
                        onClick={() => toggleActive(sale)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition hover:border-brand-primary hover:text-brand-primary"
                      >
                        {sale.active
                          ? "Switch Off"
                          : "Switch On"}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditForm(sale)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
                      >
                        <FiEdit2 />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === sale.id}
                        onClick={() => handleDelete(sale)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                      >
                        <FiTrash2 />
                        {deletingId === sale.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminFlashSale;
