import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiUploadCloud,
  FiSave,
  FiX,
  FiPlay,
  FiImage,
  FiVideo,
} from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../../components/Admin/AdminLayout";
import api, { getImageUrl } from "../../services/api";

const SLUG_OPTIONS = [
  { value: "mens-shirts", label: "Men's Shirts" },
  { value: "mens-tshirts", label: "Men's T-Shirts" },
  { value: "mens-jeans", label: "Men's Jeans" },
  { value: "mens-trackpants", label: "Men's Track Pants" },
  { value: "mens-hoodies", label: "Men's Hoodies" },
  { value: "mens-jackets", label: "Men's Jackets" },
  { value: "women-dresses", label: "Women's Dresses" },
  { value: "women-partywear", label: "Women's Party Wear" },
  { value: "women-jeans", label: "Women's Jeans" },
  { value: "women-cordset", label: "Women's Co-ord Sets" },
  { value: "women-formals", label: "Women's Formals" },
  { value: "women-shirts", label: "Women's Shirts" },
  { value: "women-skirts", label: "Women's Skirts" },
  { value: "women-jumpsuits", label: "Women's Jumpsuits" },
];

const BRAND_OPTIONS = [
  "OrbitBuy",
  "Zara",
  "H&M",
  "Adidas",
  "Jack & Jones",
  "Diesel",
  "Calvin Klein",
  "D&G",
  "Versace",
  "Forever 21",
  "PrettyLittleThing",
  "Shein",
  "Revolve",
  "Wrangler",
  "Hugo Boss",
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const MAX_IMAGES = 10;
const MAX_VIDEOS = 5;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const emptyForm = {
  name: "",
  brand: "OrbitBuy",
  category: "Men",
  slug: "mens-shirts",
  description: "",
  price: "",
  oldPrice: "",
  stock: "20",
  sizes: ["S", "M", "L", "XL"],
  isBestSeller: false,
  isNewArrival: false,
};

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);

  // New files selected from computer
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  // Existing files already saved on server
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  /*
   * Clean up object URLs when component unmounts.
   */
  useEffect(() => {
    return () => {
      imageFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });

      videoFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [imageFiles, videoFiles]);

  /*
   * Load existing product when editing.
   */
  useEffect(() => {
    if (!isEdit) return;

    let cancelled = false;

    api
      .get(`/products/${id}`)
      .then((res) => {
        if (cancelled) return;

        const p = res.product;

        const normalizedImages =
          Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : p.image
              ? [p.image]
              : [];

        const normalizedVideos = Array.isArray(p.videos)
          ? p.videos
          : [];

        setForm({
          name: p.name || "",
          brand: p.brand || "OrbitBuy",
          category: p.category || "Men",
          slug: p.slug || "mens-shirts",
          description: p.description || "",
          price: p.price ?? "",
          oldPrice: p.oldPrice ?? "",
          stock: p.stock ?? "20",
          sizes:
            p.sizes && p.sizes.length
              ? p.sizes
              : ["S", "M", "L", "XL"],
          isBestSeller: Boolean(p.isBestSeller),
          isNewArrival: Boolean(p.isNewArrival),
        });

        setExistingImages(normalizedImages);
        setExistingVideos(normalizedVideos);
      })
      .catch(() => {
        toast.error("Couldn't load product.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  const totalImages = existingImages.length + imageFiles.length;
  const totalVideos = existingVideos.length + videoFiles.length;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  /*
   * Add multiple images.
   */
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const availableSlots = MAX_IMAGES - totalImages;

    if (availableSlots <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images are allowed.`);
      e.target.value = "";
      return;
    }

    const filesToAdd = selectedFiles.slice(0, availableSlots);

    if (selectedFiles.length > availableSlots) {
      toast.error(
        `Only ${availableSlots} more image${
          availableSlots === 1 ? "" : "s"
        } can be added.`
      );
    }

    const validFiles = [];

    for (const file of filesToAdd) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error(`${file.name}: JPG, PNG or WEBP only.`);
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name}: Maximum image size is 5MB.`);
        continue;
      }

      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
      });
    }

    setImageFiles((prev) => [...prev, ...validFiles]);

    e.target.value = "";
  };

  /*
   * Add multiple videos.
   */
  const handleVideoChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const availableSlots = MAX_VIDEOS - totalVideos;

    if (availableSlots <= 0) {
      toast.error(`Maximum ${MAX_VIDEOS} videos are allowed.`);
      e.target.value = "";
      return;
    }

    const filesToAdd = selectedFiles.slice(0, availableSlots);

    if (selectedFiles.length > availableSlots) {
      toast.error(
        `Only ${availableSlots} more video${
          availableSlots === 1 ? "" : "s"
        } can be added.`
      );
    }

    const validFiles = [];

    for (const file of filesToAdd) {
      if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        toast.error(`${file.name}: MP4, WebM or MOV only.`);
        continue;
      }

      if (file.size > MAX_VIDEO_SIZE) {
        toast.error(`${file.name}: Maximum video size is 50MB.`);
        continue;
      }

      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
      });
    }

    setVideoFiles((prev) => [...prev, ...validFiles]);

    e.target.value = "";
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const removeExistingVideo = (index) => {
    setExistingVideos((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const removeNewImage = (id) => {
    setImageFiles((prev) => {
      const item = prev.find((file) => file.id === id);

      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
      }

      return prev.filter((file) => file.id !== id);
    });
  };

  const removeNewVideo = (id) => {
    setVideoFiles((prev) => {
      const item = prev.find((file) => file.id === id);

      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
      }

      return prev.filter((file) => file.id !== id);
    });
  };

  /*
   * Main image is always the first image.
   */
  const mainImage = useMemo(() => {
    if (imageFiles.length > 0) {
      return imageFiles[0].preview;
    }

    if (existingImages.length > 0) {
      return getImageUrl(existingImages[0]);
    }

    return "";
  }, [existingImages, imageFiles]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.price ||
      !form.slug ||
      !form.category
    ) {
      toast.error(
        "Name, category, store section and price are required."
      );
      return;
    }

    const finalImageCount = existingImages.length + imageFiles.length;

    if (finalImageCount === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    if (form.sizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    setSaving(true);

    try {
      const fd = new FormData();

      fd.append("name", form.name.trim());
      fd.append("brand", form.brand);
      fd.append("category", form.category);
      fd.append("slug", form.slug);
      fd.append("description", form.description);
      fd.append("price", form.price);

      if (form.oldPrice !== "") {
        fd.append("oldPrice", form.oldPrice);
      }

      fd.append("stock", form.stock);
      fd.append("sizes", form.sizes.join(","));
      fd.append("isBestSeller", String(form.isBestSeller));
      fd.append("isNewArrival", String(form.isNewArrival));

      /*
       * Existing media that the admin decided to keep.
       */
      fd.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      fd.append(
        "existingVideos",
        JSON.stringify(existingVideos)
      );

      /*
       * Add all new images.
       */
      imageFiles.forEach((item) => {
        fd.append("images", item.file);
      });

      /*
       * Add all new videos.
       */
      videoFiles.forEach((item) => {
        fd.append("videos", item.file);
      });

      if (isEdit) {
        await api.put(`/products/${id}`, fd, {
          isFormData: true,
        });

        toast.success("Product updated successfully.");
      } else {
        await api.post("/products", fd, {
          isFormData: true,
        });

        toast.success("Product added successfully.");
      }

      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message || "Couldn't save product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-24">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black">
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>

        <p className="text-gray-500 mt-1">
          {isEdit
            ? "Update product details, images and videos."
            : "Add product details, multiple images and product videos."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* =====================================================
            MEDIA
        ====================================================== */}
        <div className="lg:col-span-1 space-y-6">
          {/* Main image preview */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="font-semibold">
                Product Media
              </label>

              <span className="text-xs text-gray-400">
                {totalImages} images · {totalVideos} videos
              </span>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt="Main product preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <FiImage className="text-5xl mb-3" />
                  <p className="text-sm">
                    No product image
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Image upload */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="font-semibold">
                Product Images
              </label>

              <span className="text-xs text-gray-400">
                {totalImages}/{MAX_IMAGES}
              </span>
            </div>

            <label
              htmlFor="product-images"
              className="block rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-primary transition cursor-pointer bg-gray-50"
            >
              <div className="text-center py-8 px-5">
                <FiUploadCloud className="text-4xl mx-auto mb-3 text-gray-400" />

                <p className="font-semibold text-gray-700">
                  Upload Product Images
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Select multiple JPG, PNG or WEBP images
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Maximum 10 images · 5MB each
                </p>
              </div>
            </label>

            <input
              id="product-images"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            {(existingImages.length > 0 ||
              imageFiles.length > 0) && (
              <div className="grid grid-cols-3 gap-3 mt-5">
                {/* Existing images */}
                {existingImages.map((img, index) => (
                  <div
                    key={`existing-image-${index}`}
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {index === 0 && (
                      <span className="absolute left-2 bottom-2 bg-brand-primary text-white text-[10px] px-2 py-1 rounded-full font-semibold">
                        Main
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingImage(index)
                      }
                      className="absolute right-2 top-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-500 transition"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}

                {/* New images */}
                {imageFiles.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                  >
                    <img
                      src={item.preview}
                      alt={`New product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {existingImages.length === 0 &&
                      index === 0 && (
                        <span className="absolute left-2 bottom-2 bg-brand-primary text-white text-[10px] px-2 py-1 rounded-full font-semibold">
                          Main
                        </span>
                      )}

                    <button
                      type="button"
                      onClick={() => removeNewImage(item.id)}
                      className="absolute right-2 top-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-500 transition"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video upload */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="font-semibold">
                Product Videos
              </label>

              <span className="text-xs text-gray-400">
                {totalVideos}/{MAX_VIDEOS}
              </span>
            </div>

            <label
              htmlFor="product-videos"
              className="block rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-primary transition cursor-pointer bg-gray-50"
            >
              <div className="text-center py-8 px-5">
                <FiVideo className="text-4xl mx-auto mb-3 text-gray-400" />

                <p className="font-semibold text-gray-700">
                  Upload Product Videos
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Select multiple MP4, WebM or MOV videos
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Maximum 5 videos · 100MB each
                </p>
              </div>
            </label>

            <input
              id="product-videos"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              multiple
              onChange={handleVideoChange}
              className="hidden"
            />

            {(existingVideos.length > 0 ||
              videoFiles.length > 0) && (
              <div className="space-y-3 mt-5">
                {existingVideos.map((video, index) => (
                  <div
                    key={`existing-video-${index}`}
                    className="relative rounded-xl overflow-hidden bg-black"
                  >
                    <video
                      src={getImageUrl(video)}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full max-h-56 object-contain"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingVideo(index)
                      }
                      className="absolute right-2 top-2 w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-red-500 transition"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}

                {videoFiles.map((item) => (
                  <div
                    key={item.id}
                    className="relative rounded-xl overflow-hidden bg-black"
                  >
                    <video
                      src={item.preview}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full max-h-56 object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => removeNewVideo(item.id)}
                      className="absolute right-2 top-2 w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-red-500 transition"
                    >
                      <FiX />
                    </button>

                    <div className="absolute left-2 bottom-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FiPlay />
                      New Video
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 px-2">
            The first product image is used as the main product
            image. You can upload up to {MAX_IMAGES} images and{" "}
            {MAX_VIDEOS} videos.
          </p>
        </div>

        {/* =====================================================
            DETAILS
        ====================================================== */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-5">
          <div>
            <label className="font-semibold block mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="e.g. Classic Oxford Shirt"
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold block mb-2">
                Brand
              </label>

              <input
                type="text"
                list="brand-options"
                value={form.brand}
                onChange={handleChange("brand")}
                placeholder="Select or type a brand"
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
              />

              <datalist id="brand-options">
                {BRAND_OPTIONS.map((brand) => (
                  <option key={brand} value={brand} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Category
              </label>

              <select
                value={form.category}
                onChange={handleChange("category")}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary bg-white"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Store Section
            </label>

            <select
              value={form.slug}
              onChange={handleChange("slug")}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary bg-white"
            >
              {SLUG_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>

            <p className="text-xs text-gray-400 mt-2">
              This decides which page/category this product
              appears on.
            </p>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={4}
              placeholder="Fabric, fit, care instructions, etc."
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="font-semibold block mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange("price")}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Old Price (₹)
              </label>

              <input
                type="number"
                min="0"
                value={form.oldPrice}
                onChange={handleChange("oldPrice")}
                placeholder="Optional"
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Stock
              </label>

              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange("stock")}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-3">
              Available Sizes
            </label>

            <div className="flex flex-wrap gap-3">
              {ALL_SIZES.map((size) => {
                const active = form.sizes.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-14 h-11 rounded-lg font-semibold border transition ${
                      active
                        ? "bg-brand-primary text-white border-brand-primary"
                        : "bg-white text-gray-600 border-gray-200 hover:border-brand-primary"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-3">
              Featured Placement
            </label>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer flex-1 min-w-[200px]">
                <input
                  type="checkbox"
                  checked={form.isBestSeller}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isBestSeller: e.target.checked,
                    }))
                  }
                  className="w-4 h-4"
                />

                <span>
                  <span className="font-medium block">
                    Best Seller
                  </span>

                  <span className="text-xs text-gray-400">
                    Shows in the homepage Best Sellers section
                  </span>
                </span>
              </label>

              <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer flex-1 min-w-[200px]">
                <input
                  type="checkbox"
                  checked={form.isNewArrival}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isNewArrival: e.target.checked,
                    }))
                  }
                  className="w-4 h-4"
                />

                <span>
                  <span className="font-medium block">
                    New Arrival
                  </span>

                  <span className="text-xs text-gray-400">
                    Shows in the homepage New Arrivals section
                  </span>
                </span>
              </label>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              A product still needs a Store Section above —
              these just add it to extra homepage sections too.
            </p>
          </div>

          {/* Media summary */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <FiImage />
              </div>

              <div>
                <p className="font-semibold">
                  {totalImages} Images
                </p>

                <p className="text-xs text-gray-400">
                  Product gallery
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <FiVideo />
              </div>

              <div>
                <p className="font-semibold">
                  {totalVideos} Videos
                </p>

                <p className="text-xs text-gray-400">
                  Product videos
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-brown transition disabled:opacity-60"
            >
              <FiSave />

              {saving
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminProductForm;