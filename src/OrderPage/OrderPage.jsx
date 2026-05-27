import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useParams } from "react-router";
import toast from "react-hot-toast";

const OrderPage = () => {
  const [selected, setSelected] = useState("inside");
  const [qty, setQty] = useState(1);

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  // Fetch Product
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/products/${id}`);
      return result.data;
    },
  });

  // Quantity Increase
  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  // Quantity Decrease
  const decreaseQty = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Shipping Cost
  const shippingCost = selected === "inside" ? 80 : 150;

  // Subtotal
  const subtotal = (product?.price || 0) * qty;

  // Total
  const total = subtotal + shippingCost;

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // ORDER FUNCTION
  const handleOrder = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.address) {
      return toast.error("সব তথ্য পূরণ করুন");
    }

    const newOrders = {
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,

      productId: product?._id,
      productTitle: product?.title,
      productImage: product?.image,
      productPrice: product?.price,

      quantity: qty,
      shippingArea: selected,
      shippingCost,
      subtotal,
      total,

      orderStatus: "pending",
      createdAt: new Date(),
    };

    try {
      const result = await axiosSecure.post("/Orders", newOrders);

      if (result.data.insertedId) {
        toast.success("আপনার অর্ডার কনফার্ম হয়েছে");

        // RESET FORM
        setFormData({
          name: "",
          phone: "",
          address: "",
        });

        setQty(1);
      }
    } catch (error) {
      console.log(error);
      toast.error("অর্ডার করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4 noto-serif">
      {/* Heading */}
      <h2 className="text-3xl text-center text-blue-600 py-2 font-bold mb-8">
        অর্ডার করতে আপনার তথ্য দিন
      </h2>

      <div className="mx-auto grid lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="rounded-2xl shadow-lg p-6 bg-white">
          {/* Product Card */}
          <div className="flex flex-col md:flex-row gap-6 border rounded-xl p-5 bg-white shadow-md">
            {/* IMAGE */}
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full md:w-52 h-52 object-cover rounded-xl"
            />

            {/* CONTENT */}
            <div className="flex-1">
              {/* TITLE */}
              <h3 className="text-2xl border-b border-green-500 pb-2 font-semibold">
                {product?.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 mt-3 text-justify">
                {product?.description}
              </p>

              {/* PRICE */}
              <div className="mt-4 space-y-2">
                <p className="text-lg flex items-center gap-3 flex-wrap">
                  <span>Price:</span>

                  <span className="font-bold text-green-600">
                    ৳ {product?.price}
                    <span className="text-blue-600 ml-1">(প্রতি কেজি)</span>
                  </span>

                  {/* BADGE */}
                  {product?.badge && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {product?.badge}
                    </span>
                  )}
                </p>

                {/* OLD PRICE */}
                <p className="text-lg">
                  Old Price:
                  <span className="font-bold text-gray-400 line-through ml-2">
                    ৳ {product?.oldPrice}
                  </span>
                </p>
              </div>

              {/* QUANTITY */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseQty}
                    className="px-4 py-1 bg-gray-200 rounded text-xl font-bold"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">{qty}</span>

                  <button
                    onClick={increaseQty}
                    className="px-4 py-1 bg-green-500 text-white rounded text-xl font-bold"
                  >
                    +
                  </button>
                </div>

                {/* TOTAL */}
                <p className="text-2xl font-semibold">
                  Total:
                  <span className="text-green-600 ml-2">৳ {subtotal}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-5">
            ব্যক্তিগত এবং ডেলিভারি ঠিকানা
          </h3>

          <form onSubmit={handleOrder} className="space-y-4">
            {/* NAME */}
            <div className="border rounded-xl w-full px-4 py-3 flex gap-3 items-center">
              <MdDriveFileRenameOutline className="text-xl" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="সম্পূর্ণ নাম"
                className="outline-none w-full bg-transparent"
              />
            </div>

            {/* PHONE */}
            <div className="border rounded-xl px-4 py-3 flex gap-3 items-center">
              <IoCallOutline className="text-xl" />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="মোবাইল নাম্বার"
                className="outline-none w-full bg-transparent"
              />
            </div>

            {/* ADDRESS */}
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="গ্রাম/মহল্লা, থানা, জেলা এবং উপজেলা"
              rows="4"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            ></textarea>

            {/* DELIVERY AREA */}
            <h3 className="text-xl my-5">ডেলিভারি এরিয়া</h3>

            <div className="space-y-4">
              {/* INSIDE */}
              <div
                onClick={() => setSelected("inside")}
                className={`flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer transition
                ${
                  selected === "inside"
                    ? "border-green-600 bg-green-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {selected === "inside" ? (
                    <FaCircle className="text-green-600" />
                  ) : (
                    <FaRegCircle className="text-gray-400" />
                  )}

                  <span>বাগেরহাট জেলার ভিতরে</span>
                </div>

                <span className="font-semibold">80 Tk</span>
              </div>

              {/* OUTSIDE */}
              <div
                onClick={() => setSelected("outside")}
                className={`flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer transition
                ${
                  selected === "outside"
                    ? "border-green-600 bg-green-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {selected === "outside" ? (
                    <FaCircle className="text-green-600" />
                  ) : (
                    <FaRegCircle className="text-gray-400" />
                  )}

                  <span>বাগেরহাট জেলার বাইরে</span>
                </div>

                <span className="font-semibold">150 Tk</span>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="mt-8 rounded-2xl border p-6 bg-gray-50">
              <h2 className="text-2xl font-bold mb-6 border-b pb-3">
                Order Summary
              </h2>

              <div className="space-y-4 border-b pb-5">
                {/* Product Price */}
                <div className="flex justify-between text-lg">
                  <span>Product Price ({qty} kg)</span>

                  <span className="font-semibold">৳ {subtotal}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-lg">
                  <span>Shipping Fee</span>

                  <span className="font-semibold">৳ {shippingCost}</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between mt-5 text-2xl font-bold">
                <span>Total</span>

                <span className="text-green-600">৳ {total}</span>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 cursor-pointer rounded-xl text-lg font-semibold transition duration-300"
              >
                অর্ডার কনফার্ম করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;