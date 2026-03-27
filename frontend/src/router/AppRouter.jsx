import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";

import MainLayout from "../components/Customer/MainLayout";
import HomePage from "../pages/HomePage";

import SellerLayout from "../components/Seller/SellerLayout";
import AdminLayout from "../components/Admin/AdminLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import CustomerProfileLayout from "../components/Customer/CustomerProfileLayout";
import Order from "../components/Seller/Order";
import ProtectedRoutes from "../components/ProtectedRoutes";
import AddProduct from "../pages/seller/AddProduct";
import Products from "../pages/seller/Products";
import UpdateProduct from "../pages/seller/UpdateProduct";
import SellerProfile from "../pages/seller/SellerProfile";
import Wishlist from "../pages/customer/Wishlist";
import Cart from "../pages/customer/Cart";
import ProductDetail from "../pages/customer/ProductDetail";
import CategoryProducts from "../pages/customer/CategoryProducts";
import SearchPage from "../pages/customer/SearchPage";
import Profile from "../pages/customer/Profile";
import Orders from "../pages/customer/Orders";
import Address from "../pages/customer/Address";
import OrderDetails from "../pages/customer/OrderDetails";
import SellerDashboard from "../pages/seller/SellerDashboard";

const router = createBrowserRouter([
  {
    path: "/",

    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "profile",
        element: <CustomerProfileLayout />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "orders", element: <Orders /> },
          { path: "order/:id", element: <OrderDetails /> },
          { path: "addresses", element: <Address /> },
        ],
      },
      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
      { path: "productdetail/:productId", element: <ProductDetail /> },
      { path: "products/category/:categoryId", element: <CategoryProducts /> },
      { path: "/search", element: <SearchPage /> },
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
      { path: "dashboard", element: <SellerDashboard /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "updateproduct/:id", element: <UpdateProduct /> },
      { path: "orders", element: <Order /> },
      { path: "products", element: <Products /> },
      { path: "profile", element: <SellerProfile /> },
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
