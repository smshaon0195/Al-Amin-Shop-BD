import { FiPlus, FiBox, FiShoppingCart, FiClock, FiUsers } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
const AdminDashboard = () => {
  const { logOut } = useAuth();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: Products = [] } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Products");
      return res.data;
    },
  });
  const handleLogout = () => {
    logOut();
    toast.success("Admin Logout Succesfull");
    navigate("/user-admin-login");
  };
  const handaleAddProduct = () => {
    navigate("/user-admin-dashboard/add-product");
  };
  const PendingOrders = () => {
    navigate("/user-admin-dashboard/Pending-Orders");
  };
  const HandleDelivared = () => {
    navigate("/user-admin-dashboard/delivered-Product");
  };
  return (
    <div className="min-h-screen text-green-400 bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Add Product */}
        <button
          onClick={handaleAddProduct}
          className="bg-black cursor-pointer text-white p-5 rounded-xl flex items-center gap-3 hover:bg-gray-800"
        >
          <FiPlus /> Add Product
        </button>

        {/* All Products */}
        <button className="bg-white cursor-pointer text-gray-500 border-0 border p-5 rounded-xl flex items-center gap-3 hover:shadow">
          <FiBox /> All Products
        </button>

        {/* Pending Orders */}
        <button
          onClick={PendingOrders}
          className="bg-yellow-100 cursor-pointer text-yellow-800 p-5 rounded-xl flex items-center gap-3 hover:shadow"
        >
          <FiClock /> Pending Orders
        </button>

        {/* All Orders */}
        <button
          onClick={HandleDelivared}
          className="bg-blue-100 cursor-pointer text-blue-800 p-5 rounded-xl flex items-center gap-3 hover:shadow"
        >
          <FiShoppingCart /> All Orders
        </button>

        {/* Users */}
        <button
          onClick={handleLogout}
          className="bg-purple-100 cursor-pointer text-purple-800 p-5 rounded-xl flex items-center gap-3 hover:shadow"
        >
          <FiUsers /> Admin Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
