import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../../components/Admin/AdminLayout";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import api, { getImageUrl } from "../../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    api
      .get("/products?limit=500")
      .then((res) => setProducts(res.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (product) => {
    if (
      !window.confirm(
        `Delete "${product.name}"? This can't be undone.`
      )
    ) {
      return;
    }

    setDeletingId(product.id);

    try {
      await api.delete(`/products/${product.id}`);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      toast.success("Product deleted.");
    } catch (error) {
      toast.error(error.message || "Couldn't delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black">Products</h1>
          <p className="text-gray-500 mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""} in your catalog
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-brand-brown transition"
        >
          <FiPlus />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {loading ? (
          <TableSkeleton rows={6} cols={5} />
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-24">
            No products found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0 bg-gray-100"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold truncate max-w-xs">
                            {product.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.category}
                      {product.slug && (
                        <span className="block text-xs text-gray-400">
                          {product.slug}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.stock <= 5
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-brand-primary hover:text-white flex items-center justify-center transition"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDelete(product)}
                          disabled={deletingId === product.id}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white flex items-center justify-center transition disabled:opacity-50"
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

export default AdminProducts;
