import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";

import MainLayout from "../components/Customer/MainLayout";
import HomePage from "../pages/HomePage";

import SellerLayout from "../components/Seller/SellerLayout";

import AdminLayout from "../components/Admin/AdminLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AddProduct from "../pages/seller/AddProduct";
import Order from "../components/Seller/Order";
import ProtectedRoutes from "../components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/seller",
    element: (
      <ProtectedRoutes userRoles={["seller"]}>
        <SellerLayout />
      </ProtectedRoutes> 
    ),
    children: [
      { path:"dashboard", element: <div>Seller Dashboard</div> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "orders", element: <Order /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoutes userRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      // {path: "dashboard",element: <AdminDashboard />},
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
