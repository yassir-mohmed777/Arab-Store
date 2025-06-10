import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SidebarDrawer from "../Modal/PhoneMenu";
import useAuth from "../../../../../zustand-store/auth/authStore";

export default function StoreProfileLayout() {
  const { user, isLoading } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isLoading) return <div className="p-4">جار تحميل البيانات...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-90px)] bg-gray-100 relative">
      {/* زر القائمة - للجوال */}
      <button
        className="md:hidden flex items-start text-2xl m-4 "
        onClick={() => setIsDrawerOpen(true)}
      >
        ☰
      </button>

      {/* القائمة الجانبية - للكمبيوتر */}
      <aside className="hidden md:block w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">لوحة التحكم</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }
          >
            المعلومات الشخصية
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }
          >
            إدارة الطلبات
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }
          >
            منتجاتي
          </NavLink>
        </nav>
      </aside>

      {/* محتوى الصفحة */}
      <main className="flex-1 p-4">
        <Outlet context={{ user }} />
      </main>

      {/* مودال Drawer للجوال */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
