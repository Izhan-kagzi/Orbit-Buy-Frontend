import { useEffect, useState } from "react";
import { FiTool, FiPower, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../../components/Admin/AdminLayout";
import api from "../../services/api";

const DEFAULT_MESSAGE =
  "Orbit Buy is undergoing scheduled maintenance. Please check back soon.";

// <input type="datetime-local"> needs "YYYY-MM-DDTHH:mm" in LOCAL time —
// toISOString() gives UTC, so this shifts by the timezone offset first.
const toLocalInputValue = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
};

const emptyForm = {
  enabled: false,
  startTime: "",
  endTime: "",
  message: DEFAULT_MESSAGE,
};

const AdminMaintenance = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get("/settings/maintenance", { auth: false })
      .then((res) => {
        const m = res?.maintenance || {};
        setStatus(m);
        setForm({
          enabled: Boolean(m.enabled),
          startTime: toLocalInputValue(m.startTime),
          endTime: toLocalInputValue(m.endTime),
          message: m.message || DEFAULT_MESSAGE,
        });
      })
      .catch(() => toast.error("Couldn't load maintenance settings."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const save = async (overrides = {}) => {
    const next = { ...form, ...overrides };

    if (
      next.startTime &&
      next.endTime &&
      new Date(next.endTime) <= new Date(next.startTime)
    ) {
      toast.error("End time must be after the start time.");
      return;
    }

    setSaving(true);
    try {
      const res = await api.put("/settings/maintenance", {
        enabled: next.enabled,
        startTime: next.startTime ? new Date(next.startTime).toISOString() : null,
        endTime: next.endTime ? new Date(next.endTime).toISOString() : null,
        message: next.message,
      });

      setStatus(res.maintenance);
      setForm((prev) => ({ ...prev, enabled: Boolean(res.maintenance?.enabled) }));
      toast.success(
        res.maintenance?.enabled
          ? "Maintenance mode is on."
          : "Maintenance mode is off."
      );
    } catch (error) {
      toast.error(error.message || "Couldn't save maintenance settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    save();
  };

  const toggleNow = () => save({ enabled: !form.enabled });

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <FiTool /> Maintenance Mode
          </h1>
          <p className="text-gray-500 mt-1">
            Take the storefront offline for customers during a chosen window.
            Admins and managers can still sign in and use the dashboard.
          </p>
        </div>

        {!loading && (
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              status?.active
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status?.active ? "bg-red-500" : "bg-green-500"
              }`}
            />
            {status?.active ? "Maintenance is live" : "Site is live"}
          </span>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
          Loading maintenance settings…
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="md:col-span-2 flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div>
              <p className="font-semibold">Maintenance mode</p>
              <p className="text-sm text-gray-500">
                Master switch — turning this off ends maintenance immediately,
                regardless of the time window below.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleNow}
              disabled={saving}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition disabled:opacity-60 ${
                form.enabled
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-brand-primary text-white hover:bg-brand-brown"
              }`}
            >
              <FiPower />
              {form.enabled ? "Turn Off" : "Turn On"}
            </button>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Starts at (optional)
            </label>
            <input
              type="datetime-local"
              value={form.startTime}
              onChange={handleChange("startTime")}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave blank to start as soon as the switch above is on.
            </p>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Ends at (optional)
            </label>
            <input
              type="datetime-local"
              value={form.endTime}
              onChange={handleChange("endTime")}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave blank to stay on until you turn it off manually.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold block mb-2">
              Message shown to customers
            </label>
            <textarea
              value={form.message}
              onChange={handleChange("message")}
              rows={3}
              maxLength={300}
              placeholder={DEFAULT_MESSAGE}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={load}
              disabled={saving}
              className="px-6 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition disabled:opacity-60"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-brown transition disabled:opacity-60"
            >
              <FiSave />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
};

export default AdminMaintenance;