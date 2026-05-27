import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Orders
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const result = await axiosSecure.get("/orders");
      return result.data;
    },
  });
  console.log(orders);
  // Filter Pending Orders
  const pendingOrders = orders.filter((order) => order.orderStatus === "pending");

  // Update Status
  const handleCancel = async (id) => {
    try {
      const result = await axiosSecure.patch(`/orders/cancel/${id}`);

      if (result.data.modifiedCount > 0) {
        toast.success("Order Cancelled");

        refetch();
      }
    } catch (error) {
      console.log(error);

      toast.error("Cancel failed");
    }
  };

  const handleDelivered = async (id) => {
    try {
      const result = await axiosSecure.patch(`/orders/delivered/${id}`);

      if (result.data.modifiedCount > 0) {
        toast.success("Order Delivered Successfully");

        refetch();
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Pending Orders</h2>

        <p className="text-gray-500 mt-2">Total Pending: {pendingOrders.length}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white text-black rounded-2xl shadow-md">
        <table className="table w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Shipping</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingOrders.map((order, index) => (
              <tr key={order._id} className="hover">
                {/* Index */}
                <td>{index + 1}</td>

                {/* Customer */}
                <td>
                  <div className="font-bold">{order.customerName}</div>
                </td>

                {/* Phone */}
                <td>{order.customerPhone}</td>

                {/* Address */}
                <td className="max-w-xs">{order.customerAddress}</td>

                {/* Product */}
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={order.productImage}
                      alt={order.productTitle}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-semibold">{order.productTitle}</p>

                      <p className="text-sm text-gray-500">৳ {order.productPrice}</p>
                    </div>
                  </div>
                </td>

                {/* Quantity */}
                <td>{order.quantity} kg</td>

                {/* Total */}
                <td className="font-bold text-green-600">৳ {order.total}</td>

                {/* Shipping */}
                <td>{order.shippingArea === "inside" ? "Inside" : "Outside"}</td>

                {/* Status */}
                <td>
                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                    {order.orderStatus}
                  </span>
                </td>

                {/* Action */}
                <td>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleDelivered(order._id)}
                      className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delivered
                    </button>

                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-3 py-1 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {pendingOrders.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-500">No Pending Orders</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
