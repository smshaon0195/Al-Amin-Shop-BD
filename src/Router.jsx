import { createBrowserRouter } from "react-router";
import HomeLayout from "./Page/HomeLayout";
import Home from "./Home/Home";
import OrderPage from "./OrderPage/OrderPage";
import Categories from "./Categories/Categories";
import Contact from "./Contact/Contact";
import AdminDashboard from "./assets/AdminDashboard/AdminDashboard";
import AddProduct from "./assets/AdminDashboard/AddProduct";
import PendingOrders from "./assets/AdminDashboard/PendingOrders";
import DeliveredProduct from "./assets/AdminDashboard/DeliveredProduct";
import AdminLogin from "./assets/AdminDashboard/AdminLogin";
import PrivateRoute from "./assets/AdminDashboard/PrivateRoute";
import AllProducts from "./Product/AllProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/Contact-us",
        element: <Contact></Contact>,
      },
      {
        path: "/Order-Details/:id",
        element: <OrderPage></OrderPage>,
      },
      {
        path: "/user-admin-dashboard/add-product",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>,
          </PrivateRoute>
        ),
      },
      {
        path: "/user-admin-dashboard/Pending-Orders",
        element: (
          <PrivateRoute>
            <PendingOrders></PendingOrders>,
          </PrivateRoute>
        ),
      },
      {
        path: "/user-admin-dashboard/delivered-Product",
        element: (
          <PrivateRoute>
            <DeliveredProduct></DeliveredProduct>,
          </PrivateRoute>
        ),
      },
      {
        path: "/user-admin-dashboard/all-Product",
        element: (
          <PrivateRoute>
            <AllProducts></AllProducts>,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "user-admin-login",
    element: <AdminLogin></AdminLogin>,
  },
]);
