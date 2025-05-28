import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserInfoModal from "../Modal/UserInfoModal";
import StoreInfoModal from "../Modal/StoreInfoModal";

export default function PersonalInfoPage() {
  const { user } = useOutletContext();

  const [showUserModal, setShowUserModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  return (
    <div className="p-2  bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">المعلومات الشخصية</h1>

      {/* بيانات الحساب */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">بيانات الحساب</h2>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>الاسم الكامل</th>
                <th>البريد الإلكتروني</th>
                <th>رقم الهاتف</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-base-200">
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={() => setShowUserModal(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          تعديل البيانات الشخصية
        </button>
      </section>

      {/* بيانات المتجر */}
      <section>
        <h2 className="text-xl font-semibold mb-2">بيانات المتجر</h2>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>اسم المتجر</th>
                <th>القسم</th>
                <th>العنوان</th>
                <th>شعار المتجر</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-base-200">
                <td>{user.store_name}</td>
                <td>{user.store_categories.name}</td>
                <td>{user.address}</td>
                <td>
                  <img
                    src={user.store_logo_url}
                    alt="شعار المتجر"
                    className="w-20 h-20 object-contain border mt-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setShowStoreModal(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          تعديل بيانات المتجر
        </button>
      </section>

      {/* النوافذ المنبثقة */}
      {showUserModal && (
        <UserInfoModal onClose={() => setShowUserModal(false)} />
      )}
      {showStoreModal && (
        <StoreInfoModal onClose={() => setShowStoreModal(false)} />
      )}
    </div>
  );
}
