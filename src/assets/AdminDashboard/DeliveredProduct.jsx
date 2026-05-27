import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { SearchContext } from "../SearchContext/SearchContext";

const DeliveredProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("delivered");
  const { search } = useContext(SearchContext);

  // Fetch Orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  // 1️⃣ Status Filter
  const statusFiltered = orders.filter((order) => order.orderStatus === filter);

  // 2️⃣ Search Filter (customer / product)
  const filteredOrders = statusFiltered.filter(
    (order) =>
      order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      order.customerPhone?.includes(search) ||
      order.productTitle?.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 text-black min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Orders Management</h2>

        <p className="text-gray-500 mt-2">
          Total {filter}: {filteredOrders.length}
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("delivered")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === "delivered" ? "bg-green-600 text-white" : "bg-white border"
          }`}
        >
          Delivered
        </button>

        <button
          onClick={() => setFilter("cancelled")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === "cancelled" ? "bg-red-500 text-white" : "bg-white border"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="table w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td className="font-bold">{order.customerName}</td>

                <td>{order.customerPhone}</td>

                <td className="flex items-center gap-3">
                  <img src={order.productImage} className="w-12 h-12 rounded object-cover" />
                  <span>{order.productTitle}</span>
                </td>

                <td>{order.quantity}</td>

                <td className="font-bold text-green-600">৳ {order.total}</td>

                {/* DATE */}
                <td className="text-sm text-gray-600">
                  {order.deliveredAt || order.cancelledAt
                    ? new Date(order.deliveredAt || order.cancelledAt).toLocaleString()
                    : "N/A"}
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16 text-gray-500">No {filter} orders found</div>
        )}
      </div>
    </div>
  );
};

export default DeliveredProduct;
