import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUploadCloud, FiSave } from "react-icons/fi";
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
  "Gul Ahmed",
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

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
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    api
      .get(`/products/${id}`)
      .then((res) => {
        const p = res.product;
        setForm({
          name: p.name || "",
          brand: p.brand || "OrbitBuy",
          category: p.category || "Men",
          slug: p.slug || "mens-shirts",
          description: p.description || "",
          price: p.price ?? "",
          oldPrice: p.oldPrice ?? "",
          stock: p.stock ?? "20",
          sizes: p.sizes && p.sizes.length ? p.sizes : ["S", "M", "L", "XL"],
          isBestSeller: Boolean(p.isBestSeller),
          isNewArrival: Boolean(p.isNewArrival),
        });
        setPreview(getImageUrl(p.image));
      })
      .catch(() => toast.error("Couldn't load product."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.slug || !form.category) {
      toast.error("Name, category, page section and price are required.");
      return;
    }

    if (!isEdit && !imageFile) {
      toast.error("Please upload a product image.");
      return;
    }

    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("brand", form.brand);
      fd.append("category", form.category);
      fd.append("slug", form.slug);
      fd.append("description", form.description);
      fd.append("price", form.price);
      if (form.oldPrice) fd.append("oldPrice", form.oldPrice);
      fd.append("stock", form.stock);
      fd.append("sizes", form.sizes.join(","));
      fd.append("isBestSeller", form.isBestSeller);
      fd.append("isNewArrival", form.isNewArrival);
      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await api.put(`/products/${id}`, fd, { isFormData: true });
        toast.success("Product updated.");
      } else {
        await api.post("/products", fd, { isFormData: true });
        toast.success("Product added.");
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
            ? "Update product details below."
            : "Fill in the details to add a new product to your store."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >

        {/* Image upload */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">

          <label className="font-semibold block mb-4">
            Product Image
          </label>

          <label
            htmlFor="product-image"
            className="block aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-brand-primary transition cursor-pointer overflow-hidden bg-gray-50 flex items-center justify-center"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-400 p-6">
                <FiUploadCloud className="text-4xl mx-auto mb-2" />
                <p className="text-sm">
                  Click to upload JPG, PNG or WEBP
                </p>
              </div>
            )}
          </label>

          <input
            id="product-image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleImageChange}
            className="hidden"
          />

          <p className="text-xs text-gray-400 mt-3">
            Max size 5MB. Square images look best.
          </p>

        </div>

        {/* Details */}
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
                {BRAND_OPTIONS.map((b) => (
                  <option key={b} value={b} />
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
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">
              This decides which page/category this product appears on.
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
                  <span className="font-medium block">Best Seller</span>
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
                  <span className="font-medium block">New Arrival</span>
                  <span className="text-xs text-gray-400">
                    Shows in the homepage New Arrivals section
                  </span>
                </span>
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              A product still needs a Store Section above — these just add it
              to extra homepage sections too.
            </p>
          </div>

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
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>

        </div>

      </form>

    </AdminLayout>
  );
};

export default AdminProductForm;
