import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiBox } from "react-icons/fi";
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
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosSecure.get("/products");
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
      await refetch();
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen text-black">
      {/* HEADER SECTION - মোবাইল ফ্রেন্ডলি রেসপন্সিভ লেআউট */}
      <div className="flex sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-gray-800 tracking-wide">
            All Products
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage your inventory easily</p>
        </div>

        <div className="bg-white border border-gray-100 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2.5 self-start sm:self-auto">
          <div className="bg-orange-50 text-orange-500 p-2 rounded-lg text-sm sm:text-base">
            <FiBox />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Total Items
            </p>
            <p className="text-sm text-center sm:text-base font-bold text-gray-800">
              {ProductList.length}
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID - ১ কলাম থেকে অটোমেটিকালি ৪ কলাম রেসপন্সিভ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {ProductList.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* IMAGE AREA */}
            <div className="overflow-hidden relative bg-gray-50 aspect-video sm:h-52 w-full">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition duration-500"
              />
              {p.badge && (
                <span className="absolute top-3 left-3 bg-green-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
                  {p.badge}
                </span>
              )}
            </div>

            {/* CONTENT AREA */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-1">
                  {p.title}
                </h2>
                <p className="text-gray-400 text-xs mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* PRICE & BUTTONS */}
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-extrabold text-green-600">
                    ৳{p.price}
                  </span>
                  {p.oldPrice && (
                    <span className="line-through text-xs text-gray-400">৳{p.oldPrice}</span>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-4 text-xs">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition duration-200"
                  >
                    <FiEdit2 className="text-xs" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p)}
                    className="flex-1 cursor-pointer bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition duration-200"
                  >
                    <FiTrash2 className="text-xs" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 sm:p-6 shadow-2xl border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Edit Product</h2>

            <form onSubmit={handleUpdate} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  className="w-full text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase">
                    Old Price
                  </label>
                  <input
                    type="text"
                    name="oldPrice"
                    value={form.oldPrice}
                    onChange={handleChange}
                    placeholder="Old Price"
                    className="w-full text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase">
                    Badge
                  </label>
                  <input
                    type="text"
                    name="badge"
                    value={form.badge}
                    onChange={handleChange}
                    placeholder="e.g. Sale, 10% Off"
                    className="w-full text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="URL Address"
                    className="w-full text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                  rows="3"
                  className="w-full text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <div className="flex gap-2.5 pt-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-sm shadow-2xl text-center border border-gray-50">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3.5 text-xl">
              <FiTrash2 />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Delete Product?</h2>
            <p className="text-gray-400 text-xs mt-1.5 mb-5 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">"{selectedProduct?.title}"</span>? This
              action cannot be undone.
            </p>

            <div className="flex gap-2.5 text-xs font-semibold">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl transition cursor-pointer"
              >
                No, Keep it
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition shadow-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
