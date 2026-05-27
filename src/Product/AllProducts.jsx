import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    badge: "",
    image: "",
  });

  const { data: ProductList = [], refetch } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const result = await axiosSecure.get("/Products");
      return result.data;
    },
  });

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // edit
  const handleEdit = (product) => {
    setSelectedProduct(product);

    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      oldPrice: product.oldPrice,
      badge: product.badge,
      image: product.image,
    });

    setShowEditModal(true);
  };

  // delete modal
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/Products/${selectedProduct._id}`, form);

      refetch();
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // confirm delete
  const confirmDelete = async () => {
    try {
      if (!selectedProduct?._id) return;

      await axiosSecure.delete(`/products/${selectedProduct._id}`);

      await refetch(); // better than plain refetch()

      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>

          <p className="text-gray-500 mt-1">Manage your all products easily</p>
        </div>

        <div className="bg-white shadow px-5 py-3 rounded-xl">
          <h2 className="font-semibold">Total Products: {ProductList.length}</h2>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ProductList.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group"
          >
            {/* IMAGE */}
            <div className="overflow-hidden relative">
              <img
                src={p.image}
                alt={p.title}
                className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              {p.badge && (
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  {p.badge}
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{p.title}</h2>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{p.description}</p>

              {/* PRICE */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-bold text-green-600">৳{p.price}</span>

                <span className="line-through text-gray-400">৳{p.oldPrice}</span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <FiEdit2 />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white text-green-600 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-5 text-center">Edit Product</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Product Title"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleChange}
                placeholder="Old Price"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                placeholder="Badge"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
                >
                  Update Product
                </button>

                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-red-500">Delete Product?</h2>

            <p className="text-gray-500 mt-3 mb-6">Are you sure you want to delete this product?</p>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
              >
                Confirm Delete
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
