import { useState } from "react";
import { FiPlus, FiBox, FiUploadCloud, FiGrid, FiActivity, FiLayers } from "react-icons/fi"; // সঠিক আইকন প্যাক
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Floating Input Component
const FloatingInput = ({
  name,
  value,
  onChange,
  label,
  className = "",
  required = true,
  type = "text",
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        required={required}
        name={name}
        type={type}
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
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  // প্রোডাক্টের টাইপ স্টেট (মধু, আম, অন্যান্য)
  const [productType, setProductType] = useState("honey");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    badge: "",
    image: "",
    // ক্যাটাগরি ভিত্তিক অতিরিক্ত ফিল্ডসমূহ
    honeyWeight: "",
    mangoType: "",
    mangoSize: "",
  });

  // ক্যাটাগরি পরিবর্তন হলে ফর্ম স্টেট রিসেট বা অ্যাডজাস্ট করা
  const handleTypeChange = (type) => {
    setProductType(type);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image upload to imgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Hosting}`,
        { method: "POST", body: formData },
      );

      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.data.url }));
        toast.success("ছবি সফলভাবে আপলোড হয়েছে!");
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

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!form.image) {
      return toast.error("দয়া করে প্রোডাক্টের ইমেজ আপলোড করুন!");
    }

    // ক্যাটাগরি অনুযায়ী ডেটা ফিল্টার করে পাঠানো
    const baseProduct = {
      id: Date.now(),
      category: productType,
      title: form.title,
      description: form.description,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice),
      badge: form.badge,
      image: form.image,
    };

    if (productType === "honey") {
      baseProduct.honeyWeight = form.honeyWeight;
    } else if (productType === "mango") {
      baseProduct.mangoType = form.mangoType;
      baseProduct.mangoSize = form.mangoSize;
    }

    try {
      await axiosSecure.post("products", baseProduct);
      queryClient.invalidateQueries(["products"]);
      toast.success("প্রোডাক্টটি সফলভাবে তালিকায় যুক্ত করা হয়েছে!");

      // Form Reset
      setForm({
        title: "",
        description: "",
        price: "",
        oldPrice: "",
        badge: "",
        image: "",
        honeyWeight: "",
        mangoType: "",
        mangoSize: "",
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
            <span className="text-2xl font-bold tracking-wide CustomFont">
              <span className="text-black">Al-Amin</span>{" "}
              <span className="text-yellow-400">Shop</span>
              <span className="text-green-600 ml-2">
                B<span className="text-red-500">D</span>
              </span>
            </span>
            <p className="text-emerald-100 text-sm mt-0.5">
              সহজে সঠিক ক্যাটাগরি বেছে নিয়ে প্রোডাক্ট যোগ করুন
            </p>
          </div>
        </div>

        {/* STEP 1: UNIQUE CATEGORY SELECTION TABS */}
        <div className="p-6 pb-2 bg-slate-50/50 border-b border-slate-100">
          <label className="block text-sm font-semibold text-slate-700 mb-3 text-center md:text-left">
            ১. প্রথমে প্রোডাক্টের ধরন (Category) সিলেক্ট করুন:
          </label>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {/* মধু ক্যাটাগরি */}
            <button
              type="button"
              onClick={() => handleTypeChange("honey")}
              className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-bold text-sm md:text-base transition-all duration-300 cursor-pointer ${
                productType === "honey"
                  ? "border-amber-500 bg-amber-50 text-amber-700 shadow-md shadow-amber-100 scale-[1.02]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50/30"
              }`}
            >
              <span className="text-xl">🍯</span>
              <span>মধু (Honey)</span>
            </button>

            {/* আম ক্যাটাগরি */}
            <button
              type="button"
              onClick={() => handleTypeChange("mango")}
              className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-bold text-sm md:text-base transition-all duration-300 cursor-pointer ${
                productType === "mango"
                  ? "border-orange-500 bg-orange-50 text-orange-700 shadow-md shadow-orange-100 scale-[1.02]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50/30"
              }`}
            >
              <span className="text-xl">🥭</span>
              <span>আম (Mango)</span>
            </button>

            {/* অন্যান্য ক্যাটাগরি */}
            <button
              type="button"
              onClick={() => handleTypeChange("others")}
              className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-bold text-sm md:text-base transition-all duration-300 cursor-pointer ${
                productType === "others"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100 scale-[1.02]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/30"
              }`}
            >
              <FiGrid
                className={`text-xl ${productType === "others" ? "text-emerald-600" : "text-slate-400"}`}
              />
              <span>অন্যান্য</span>
            </button>
          </div>
        </div>

        {/* STEP 2: DYNAMIC FORM CONTENT */}
        <form onSubmit={handleAddProduct} className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              ২. প্রোডাক্টের বিস্তারিত তথ্য দিন (
              {productType === "honey" ? "মধু" : productType === "mango" ? "আম" : "অন্যান্য"})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* কমন ইনপুট ফিল্ডস */}
            <FloatingInput
              name="title"
              value={form.title}
              onChange={handleChange}
              label={
                productType === "honey"
                  ? "মধুর নাম / টাইটেল"
                  : productType === "mango"
                    ? "আমের নাম / টাইটেল"
                    : "Product Title"
              }
            />

            <div className="relative">
              <select
                name="badge"
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

            {/* --- ডায়নামিক ফিল্ড: মধুর জন্য ওজনের অপশন --- */}
            {productType === "honey" && (
              <div className="relative md:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-5 bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                <FloatingInput
                  name="honeyWeight"
                  value={form.honeyWeight}
                  onChange={handleChange}
                  label="মধুর ওজন বা পরিমাপ (যেমন: ৫০০ গ্রাম, ১ কেজি বা ১ লিটার)"
                  required={true}
                />
              </div>
            )}

            {/* --- ডায়নামিক ফিল্ড: আমের জন্য কাস্টম অপশন --- */}
            {productType === "mango" && (
              <div className="relative md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 bg-orange-50/40 p-4 rounded-xl border border-orange-100">
                <div className="relative">
                  <select
                    name="mangoType"
                    value={form.mangoType}
                    onChange={handleChange}
                    required={true}
                    className="w-full border border-gray-200 text-gray-700 bg-white p-3 rounded-lg outline-none appearance-none font-medium cursor-pointer focus:border-orange-400"
                  >
                    <option value="" disabled>
                      আমের জাত সিলেক্ট করুন
                    </option>
                    <option value="হাড়িভাঙ্গা">হাড়িভাঙ্গা 🥭</option>
                    <option value="ল্যাংড়া">ল্যাংড়া 🥭</option>
                    <option value="ক্ষীরশাপাত / হিমসাগর">হিমসাগর / ক্ষীরশাপাত 🥭</option>
                    <option value="আম্রপালি">আম্রপালি 🥭</option>
                    <option value="অন্যান্য জাত">অন্যান্য জাত 🌟</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                    ▾
                  </div>
                </div>

                <FloatingInput
                  name="mangoSize"
                  value={form.mangoSize}
                  onChange={handleChange}
                  label="আমের সাইজ/গ্রেড (যেমন: মাঝারি, প্রিমিয়াম গ্রেড)"
                  required={false}
                />
              </div>
            )}

            {/* কমন প্রাইস ও ইমেজ ফিল্ডস */}
            <FloatingInput
              name="price"
              value={form.price}
              onChange={handleChange}
              label="Regular Price (৳)"
              type="number"
            />

            <FloatingInput
              name="oldPrice"
              value={form.oldPrice}
              onChange={handleChange}
              label="Old Price (৳)"
              type="number"
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
              className={`w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-200 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] transition-all duration-200 text-base tracking-wide ${
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
