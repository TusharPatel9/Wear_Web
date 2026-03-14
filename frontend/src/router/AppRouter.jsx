import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";

import MainLayout from "../components/Customer/MainLayout";
import HomePage from "../pages/HomePage";

import SellerLayout from "../components/Seller/SellerLayout";

import AdminLayout from "../components/Admin/AdminLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AddProduct from "../pages/seller/AddProduct";

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
    element: <SellerLayout />,
    children: [
      {
        path: "dashboard",
        element: <div>Seller Dashboard</div>,
      },
      {path:"addproduct", element:<AddProduct/>}
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
