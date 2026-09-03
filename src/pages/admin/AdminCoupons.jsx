import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiTag } from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../../components/Admin/AdminLayout";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import api from "../../services/api";

const emptyForm = {
  code: "",
  discountType: "flat",
  discountValue: "",
  maxDiscount: "",
  startDate: "",
  endDate: "",
  active: true,
};

const toInputDate = (iso) => (iso ? iso.slice(0, 10) : "");

const statusStyles = {
  active: "bg-green-100 text-green-700",
  upcoming: "bg-brand-tan/50 text-brand-brown",
  expired: "bg-gray-100 text-gray-500",
  inactive: "bg-red-100 text-red-700",
};

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadCoupons = () => {
    setLoading(true);
    api
      .get("/coupons")
      .then((res) => setCoupons(res.coupons))
      .catch(() => setCoupons([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (coupon) => {
    setEditingId(coupon.id);
    setForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maxDiscount: coupon.maxDiscount || "",
      startDate: toInputDate(coupon.startDate),
      endDate: toInputDate(coupon.endDate),
      active: coupon.active,
    });
    setShowForm(true);
  };

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.code || !form.discountValue || !form.startDate || !form.endDate) {
      toast.error("Please fill in code, discount value, and both dates.");
      return;
    }

    setSaving(true);

    const payload = {
      code: form.code,
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      startDate: form.startDate,
      endDate: form.endDate,
      active: form.active,
    };

    try {
      if (editingId) {
        await api.put(`/coupons/${editingId}`, payload);
        toast.success("Coupon updated.");
      } else {
        await api.post("/coupons", payload);
        toast.success("Coupon created.");
      }
      setShowForm(false);
      loadCoupons();
    } catch (error) {
      toast.error(error.message || "Couldn't save coupon.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (coupon) => {
    if (!window.confirm(`Delete coupon "${coupon.code}"?`)) return;

    try {
      await api.delete(`/coupons/${coupon.id}`);
      setCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
      toast.success("Coupon deleted.");
    } catch (error) {
      toast.error(error.message || "Couldn't delete coupon.");
    }
  };

  return (
    <AdminLayout>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black">Coupons</h1>
          <p className="text-gray-500 mt-1">
            {coupons.length} coupon{coupons.length !== 1 ? "s" : ""} configured
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-brand-brown transition"
        >
          <FiPlus />
          Add Coupon
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label className="font-semibold block mb-2">Coupon Code</label>
            <input
              type="text"
              value={form.code}
              onChange={handleChange("code")}
              placeholder="e.g. FESTIVE25"
              className="w-full border border-gray-200 rounded-xl p-3 uppercase focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Discount Type</label>
            <select
              value={form.discountType}
              onChange={handleChange("discountType")}
              className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:outline-none focus:border-brand-primary"
            >
              <option value="flat">Flat amount (₹)</option>
              <option value="percent">Percentage (%)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Discount Value {form.discountType === "percent" ? "(%)" : "(₹)"}
            </label>
            <input
              type="number"
              min="0"
              value={form.discountValue}
              onChange={handleChange("discountValue")}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
            />
          </div>

          {form.discountType === "percent" && (
            <div>
              <label className="font-semibold block mb-2">
                Max Discount Cap (₹, optional)
              </label>
              <input
                type="number"
                min="0"
                value={form.maxDiscount}
                onChange={handleChange("maxDiscount")}
                placeholder="No cap"
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
              />
            </div>
          )}

          <div>
            <label className="font-semibold block mb-2">Available From</label>
            <input
              type="date"
              value={form.startDate}
              onChange={handleChange("startDate")}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Available Until</label>
            <input
              type="date"
              value={form.endDate}
              onChange={handleChange("endDate")}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={handleChange("active")}
              className="w-4 h-4"
            />
            <label htmlFor="active" className="text-gray-700">
              Active (customers can use this coupon during its available dates)
            </label>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-brown transition disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Coupon"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {loading ? (
          <TableSkeleton rows={6} cols={5} />
        ) : coupons.length === 0 ? (
          <div className="text-center text-gray-500 py-24">
            <FiTag className="text-4xl mx-auto mb-3 text-gray-300" />
            No coupons yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4">Available</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">{coupon.code}</td>
                    <td className="px-6 py-4">
                      {coupon.discountType === "percent"
                        ? `${coupon.discountValue}%${
                            coupon.maxDiscount
                              ? ` (max ₹${coupon.maxDiscount})`
                              : ""
                          }`
                        : `₹${coupon.discountValue}`}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(coupon.startDate).toLocaleDateString("en-IN")}
                      {" – "}
                      {new Date(coupon.endDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          statusStyles[coupon.status] ||
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {coupon.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(coupon)}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-brand-primary hover:text-white flex items-center justify-center transition"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon)}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </AdminLayout>
  );
};

export default AdminCoupons;
