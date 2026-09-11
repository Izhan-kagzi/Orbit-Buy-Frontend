import { useEffect, useState } from "react";
import { FiUserPlus, FiTrash2, FiSearch, FiUsers } from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../../components/Admin/AdminLayout";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import api from "../../services/api";

const emptyForm = { name: "", email: "", password: "" };

const AdminManagers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);

  const loadUsers = () => {
    setLoading(true);
    api
      .get("/users")
      .then((res) => setUsers(res.users))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const managers = users.filter((u) => u.role === "manager");
  const customers = users.filter((u) => {
    if (u.role !== "customer") return false;
    const query = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
    );
  });

  const changeRole = async (user, role) => {
    setBusyId(user.id);
    try {
      await api.put(`/users/${user.id}/role`, { role });
      toast.success(
        role === "manager"
          ? `${user.name} is now a manager.`
          : `${user.name} is now a regular customer.`
      );
      loadUsers();
    } catch (error) {
      toast.error(error.message || "Couldn't update role.");
    } finally {
      setBusyId(null);
    }
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const createManager = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      toast.error("Name, email and password are all required.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setCreating(true);
    try {
      await api.post("/users/managers", form);
      toast.success(`${form.name} was added as a manager.`);
      setForm(emptyForm);
      loadUsers();
    } catch (error) {
      toast.error(error.message || "Couldn't create manager.");
    } finally {
      setCreating(false);
    }
  };

  const deleteManager = async (user) => {
    const confirmed = window.confirm(
      `Permanently delete ${user.name}'s account? This can't be undone.`
    );
    if (!confirmed) return;

    setBusyId(user.id);
    try {
      await api.delete(`/users/${user.id}`);
      toast.success(`${user.name}'s account was deleted.`);
      loadUsers();
    } catch (error) {
      toast.error(error.message || "Couldn't delete manager.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-serif text-brand-dark">Managers</h1>
        <p className="text-gray-500 mt-1">
          Create manager accounts or promote trusted customers. Managers
          have full control over products, inventory, and orders — but
          can't manage coupons or other managers.
        </p>
      </div>

      {/* Create a new manager */}
      <div className="bg-white rounded-2xl shadow overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="font-semibold text-lg">Create New Manager</h2>
        </div>

        <form
          onSubmit={createManager}
          className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="text-sm font-semibold block mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleFormChange("name")}
              placeholder="Full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleFormChange("email")}
              placeholder="manager@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleFormChange("password")}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-5 py-3 rounded-xl hover:bg-brand-brown transition disabled:opacity-50"
            >
              <FiUserPlus size={16} />
              {creating ? "Creating..." : "Create Manager"}
            </button>
          </div>
        </form>
      </div>

      {/* Current managers */}
      <div className="bg-white rounded-2xl shadow overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
          <FiUsers className="text-brand-primary" />
          <h2 className="font-semibold text-lg">
            Current Managers ({managers.length})
          </h2>
        </div>

        {loading ? (
          <TableSkeleton rows={3} cols={3} />
        ) : managers.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No managers yet — promote a customer below.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {managers.map((user) => (
              <div key={user.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-semibold shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteManager(user)}
                  disabled={busyId === user.id}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 transition disabled:opacity-50 shrink-0"
                >
                  <FiTrash2 size={15} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promote a customer */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="font-semibold text-lg mb-4">Promote a Customer</h2>
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={4} cols={3} />
        ) : search.trim() === "" ? (
          <p className="text-center text-gray-400 py-12 text-sm">
            Start typing to search for a customer to promote.
          </p>
        ) : customers.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No matching customers found.
          </p>
        ) : (
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {customers.slice(0, 20).map((user) => (
              <div key={user.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => changeRole(user, "manager")}
                  disabled={busyId === user.id}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-brown transition disabled:opacity-50 shrink-0"
                >
                  <FiUserPlus size={15} />
                  Make Manager
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  );
};

export default AdminManagers;
