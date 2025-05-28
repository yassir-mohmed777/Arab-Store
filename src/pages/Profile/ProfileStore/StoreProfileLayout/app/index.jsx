import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../../../../supabaseClient";
import SidebarDrawer from "../Modal/PhoneMenu";

export default function StoreProfileLayout() {
  const [userData, setUserData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      if (!userId) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error) setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) return <div className="p-4">جار تحميل البيانات...</div>;

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
            to="settings"
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
        <Outlet context={{ user: userData }} />
      </main>

      {/* مودال Drawer للجوال */}
      <SidebarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
