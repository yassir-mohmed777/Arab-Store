// src/components/profile/SidebarDrawer.jsx

import { NavLink } from "react-router-dom";

export default function SidebarDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40">
      <div className="w-64 bg-white h-full shadow-md p-4 animate__animated animate__fadeInRight">
        <button
          className="text-gray-600 text-xl mb-4"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-6">لوحة التحكم</h2>
        <nav className="flex flex-col gap-4 text-right">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }
            onClick={onClose}
          >
            المعلومات الشخصية
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }
            onClick={onClose}
          >
            إدارة الطلبات
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }
            onClick={onClose}
          >
            منتجاتي
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
