import { useState } from "react";
import { FiPlus, FiBox, FiTrash2 } from "react-icons/fi";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: ProductList = [] } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const result = await axiosSecure.get("Products");
      return result.data;
    },
  });
  console.log(ProductList);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    badge: "",
    image: "",
  });

  // text input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // image upload to imgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Hosting}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    setForm((prev) => ({
      ...prev,
      image: data.data.url,
    }));
  };

  // add product
  const handleAddProduct = async (e) => {
  e.preventDefault();

  const newProduct = {
    id: Date.now(),
    ...form,
    price: Number(form.price),
    oldPrice: Number(form.oldPrice),
  };

  try {
    await axiosSecure.post("Products", newProduct);

    // instantly refetch data
    queryClient.invalidateQueries(["Products"]);

    // reset form
    setForm({
      title: "",
      description: "",
      price: "",
      oldPrice: "",
      badge: "",
      image: "",
    });
  } catch (err) {
    console.log(err);
  }
};
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

    setEditingId(product.id);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));

    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setProducts(products.map((p) => (p.id === editingId ? { ...p, ...form } : p)));

    setShowEditModal(false);
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      price: "",
      oldPrice: "",
      badge: "",
      image: "",
    });
  };
  // floating input component
  const FloatingInput = ({ name, value, onChange, label, className = "" }) => {
    return (
      <div className={`relative ${className}`}>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="peer w-full border p-2 rounded outline-none"
        />

        <label
          className="
          absolute left-2 transition-all duration-200
          bg-white px-1

          top-2 text-base text-gray-500

          peer-focus:-top-3
          peer-focus:text-sm

          peer-not-placeholder-shown:-top-3
          peer-not-placeholder-shown:text-sm
        "
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-green-500 p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FiBox /> Admin Dashboard
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleAddProduct}
        className="bg-white p-5 rounded-xl shadow-md grid md:grid-cols-2 gap-4 mb-8"
      >
        <FloatingInput
          name="title"
          value={form.title}
          onChange={handleChange}
          label="Product Title"
        />

        <FloatingInput name="price" value={form.price} onChange={handleChange} label="Price" />

        <FloatingInput
          name="oldPrice"
          value={form.oldPrice}
          onChange={handleChange}
          label="Old Price"
        />

        <select
          name="badge"
          value={form.badge}
          onChange={handleChange}
          className="border border-green-400 rounded-sm p-2 w-full"
        >
          <option value="" disabled>
            (ব্যাজ) সিলেক্ট করুন
          </option>

          <option value="নতুন">নতুন</option>
          <option value="বিশেষ ছাড়">বিশেষ ছাড়</option>
          <option value="বেশি বিক্রয়">বেশি বিক্রয়</option>
          <option value="জনপ্রিয়">জনপ্রিয়</option>
        </select>

        {/* IMAGE UPLOAD */}
        <div className="md:col-span-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />
        </div>

        <FloatingInput
          name="image"
          value={form.image}
          onChange={handleChange}
          label="Image URL (auto)"
          className="md:col-span-1"
        />

        <div className="md:col-span-2 relative">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full border p-2 rounded outline-none"
          />

          <label
            className="absolute left-2 top-2 text-gray-500 transition-all
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
            peer-focus:-top-3 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1"
          >
            Description
          </label>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 rounded flex items-center justify-center gap-2 md:col-span-2"
        >
          <FiPlus /> Add Product
        </button>
      </form>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-5 gap-4">
        {ProductList.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img src={p.image} className="h-40 w-full object-cover rounded" />

            <h2 className="text-lg font-bold mt-2">{p.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>

            <div className="flex justify-between mt-2">
              <span className="font-bold">৳{p.price}</span>
              <span className="line-through text-gray-400">৳{p.oldPrice}</span>
            </div>

            {p.badge && (
              <span className="inline-block mt-2 text-xs bg-green-100 px-2 py-1 rounded">
                {p.badge}
              </span>
            )}

            <div className="flex gap-2 mt-3">
              {/* EDIT BUTTON */}
              <div className="flex w-full gap-2 mt-3">
                {/* EDIT */}
                <button
                  type="button"
                  onClick={() => handleEdit(p)}
                  className="w-1/2 bg-blue-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                >
                  ✏️ Edit
                </button>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="w-1/2 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 transition"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
            {showEditModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-[500px]">
                  <h2 className="text-xl font-bold mb-4">Edit Product</h2>

                  <form onSubmit={handleUpdate} className="space-y-3">
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full border p-2"
                      placeholder="Title"
                    />

                    <input
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full border p-2"
                      placeholder="Price"
                    />

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full border p-2"
                      placeholder="Description"
                    />

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                      >
                        Update
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded w-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-[400px] text-center">
                  <h2 className="text-xl font-bold mb-4 text-red-600">Delete Product?</h2>

                  <p className="mb-6 text-gray-600">
                    Are you sure you want to delete this product?
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={confirmDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded w-full"
                    >
                      Delete Confirm
                    </button>

                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded w-full"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
