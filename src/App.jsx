import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/app";
import RegisterPage from "./pages/RegisterPage/app";
import MainLayout from "./pages/MainLayout";
import LoginPage from "./pages/LoginPage/app";
import { ToastContainer } from "react-toastify";
import StoreProfileLayout from "./pages/Profile/ProfileStore/StoreProfileLayout/app";
import FavoritePage from "./pages/FavoritePage/app";
import PersonalInfoPage from "./pages/Profile/ProfileStore/Componants/PersonalInfoPage";
import ProductsManagement from "./pages/Profile/ProfileStore/Componants/ProductsManagement";
import CategoryPage from "./pages/CategoryPage/app";
import StorePage from "./pages/StorePage/app";
import ProductDetailPage from "./pages/ProductDetailPage/app";
import CartPage from "./pages/CartPage/app";
import CheckoutPage from "./pages/CheckoutPage/app";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import StoreOrders from "./pages/Profile/ProfileStore/Componants/StoreOrders";
import ProfileCustomerPage from "./pages/Profile/profileCustomer/app";
import OrderTrackingPage from "./pages/TrakingOrderPage";
import useAuth from "./zustand-store/auth/authStore";
import { useEffect } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";

dayjs.locale("ar");
export default function App() {
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* صفحة القسم - تعرض المتاجر التابعة لهذا القسم */}
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          {/* صفحة المتجر - تعرض المنتجات الخاصة بهذا المتجر */}
          <Route path="/store/:storeId" element={<StorePage />} />
          {/* صفحة تفاصيل المنتج */}
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/trackorder" element={<OrderTrackingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<FavoritePage />} />

          <Route
            path="/profile/customer"
            element={
              <ProtectedRoute allowedTypes={["customer"]}>
                <ProfileCustomerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/store"
            element={
              <ProtectedRoute allowedTypes={["store"]}>
                <StoreProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<PersonalInfoPage />} />
            <Route path="orders" element={<StoreOrders />} />
            <Route path="products" element={<ProductsManagement />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 - الصفحة غير موجودة</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
