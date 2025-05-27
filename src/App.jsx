import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/app";
import RegisterPage from "./pages/RegisterPage/app";
import MainLayout from "./pages/MainLayout";
import LoginPage from "./pages/LoginPage/app";
import { ToastContainer } from "react-toastify";
import StoreProfileLayout from "./pages/Profile/ProfileStore/StoreProfileLayout/app";
import ProfilecustomerPage from "./pages/Profile/profileCustomer/app";
import FavoritePage from "./pages/FavoritePage/app";
import PersonalInfoPage from "./pages/Profile/ProfileStore/Componants/PersonalInfoPage";
import OrdersManagement from "./pages/Profile/ProfileStore/Componants/OrdersManagement";
import ProductsManagement from "./pages/Profile/ProfileStore/Componants/ProductsManagement";
import NavigateToProfile from "./pages/Profile/NavigateToProfile";

export default function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* صفحة القسم - تعرض المتاجر التابعة لهذا القسم */}
          <Route path="/category/:categoryId" element={<h1>صفحة القسم</h1>} />
          {/* صفحة المتجر - تعرض المنتجات الخاصة بهذا المتجر */}
          <Route path="/store/:storeId" element={<h1> صفحة المتجر</h1>} />
          {/* صفحة تفاصيل المنتج */}
          <Route
            path="/product/:productId"
            element={<h1> صفحة تفاصيل المنتج</h1>}
          />
          <Route path="/cart" element={<h1> صفحة السلة</h1>} />
          <Route path="/checkout" element={<h1> صفحة الدفع</h1>} />
          <Route path="/wishlist" element={<FavoritePage />} />
          <Route path="/profile" element={<NavigateToProfile />} />
          <Route path="/profile/customer" element={<ProfilecustomerPage />} />
          <Route path="/profile/store" element={<StoreProfileLayout />}>
            <Route index element={<PersonalInfoPage />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="settings" element={<ProductsManagement />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
