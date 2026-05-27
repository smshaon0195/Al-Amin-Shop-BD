import { useState } from "react";
import { FiPlus, FiBox, FiUploadCloud } from "react-icons/fi";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// ১. Floating Input Component (ফোকাস প্রবলেম ফিক্স করার জন্য এটিকে মূল ফাংশনের বাইরে রাখা হয়েছে)
const FloatingInput = ({ name, value, onChange, label, className = "", required = true }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border border-gray-200 text-gray-800 bg-white p-3 rounded-lg outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
      <label
        className="absolute left-3 top-3 px-1 bg-white text-gray-400 text-base transition-all duration-200 pointer-events-none
        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-emerald-600 font-medium
        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-600"
      >
        {label}
      </label>
    </div>
  );
};

export default function AddProduct() {
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false); // ইমেজ আপলোড লোডিং স্টেট
  const queryClient = useQueryClient();

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
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Hosting}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({
          ...prev,
          image: data.data.url,
        }));
        toast.success("ইমেজ সফলভাবে আপলোড হয়েছে!");
      } else {
        toast.error("ইমেজ আপলোড ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      toast.error("ইমেজে আপলোডে কোনো সমস্যা হয়েছে।");
    } finally {
      setUploading(false);
    }
  };

  // add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!form.image) {
      return toast.error("দয়া করে প্রোডাক্টের ইমেজ আপলোড করুন!");
    }

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
      toast.success(
        "আপনার প্রোডাক্ট তালিকায় সফলভাবে যুক্ত হয়েছে, তালিকা থেকে সকল প্রোডাক্ট দেখতে পারবেন",
      );

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
      toast.error("প্রোডাক্ট যুক্ত করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
        {/* HEADER BANNER */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            <FiBox className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
            <p className="text-emerald-100 text-sm mt-0.5">নতুন প্রোডাক্ট যুক্ত করুন খুব সহজেই</p>
          </div>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleAddProduct} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FloatingInput
              name="title"
              value={form.title}
              onChange={handleChange}
              label="Product Title"
            />

            <div className="relative">
              <select
                name="badge"
                required
                value={form.badge}
                onChange={handleChange}
                className="w-full border border-gray-200 text-gray-700 bg-white p-3 rounded-lg outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 appearance-none font-medium cursor-pointer"
              >
                <option value="" disabled>
                  (ব্যাজ) সিলেক্ট করুন
                </option>
                <option value="নতুন">নতুন ✨</option>
                <option value="বিশেষ ছাড়">বিশেষ ছাড় 🔥</option>
                <option value="বেশি বিক্রয়">বেশি বিক্রয় 🚀</option>
                <option value="জনপ্রিয়">জনপ্রিয় ❤️</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                ▾
              </div>
            </div>

            <FloatingInput
              name="price"
              value={form.price}
              onChange={handleChange}
              label="Regular Price ($ / ৳)"
            />

            <FloatingInput
              name="oldPrice"
              value={form.oldPrice}
              onChange={handleChange}
              label="Old Price ($ / ৳)"
            />

            {/* CUSTOM IMAGE UPLOAD DESIGN */}
            <div className="md:col-span-1">
              <label className="flex flex-col items-center justify-center w-full h-[50px] border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-emerald-400 transition-all duration-200 relative overflow-hidden">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                  <FiUploadCloud
                    className={`text-lg text-emerald-500 ${uploading ? "animate-bounce" : ""}`}
                  />
                  <span>{uploading ? "Uploading..." : "Upload Product Image"}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required={!form.image}
                />
              </label>
            </div>

            <FloatingInput
              name="image"
              value={form.image}
              onChange={handleChange}
              label="Image URL (Auto Generated)"
              className="md:col-span-1"
              required={true}
            />

            {/* DESCRIPTION FIELD */}
            <div className="md:col-span-2 relative">
              <textarea
                name="description"
                required
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-200 text-gray-800 bg-white p-3 rounded-lg outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 resize-none"
              />
              <label
                className="absolute left-3 top-3 px-1 bg-white text-gray-400 text-base transition-all duration-200 pointer-events-none
                peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-emerald-600 font-medium
                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-600"
              >
                Product Description
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={uploading}
              className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-200 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] transition-all duration-200 text-base tracking-wide ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiPlus className="text-xl" /> Add Product to List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
