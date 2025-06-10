import { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import CustomerOrders from "../Componants/CustomerOrders";
import useAuth from "../../../../zustand-store/auth/authStore";


dayjs.locale("ar");

export default function ProfileCustomerPage() {
  const user = useAuth((state) => state.user); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });
      if (ordersError) {
        console.error("خطأ في جلب الطلبات:", ordersError);
      } else {
        setOrders(ordersData);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [user?.id]);

  if (loading) return <div className="p-6">جاري تحميل البيانات...</div>;

  if (!user) return <div className="p-6">لم يتم تسجيل الدخول.</div>;

  return (
    <div className="container mx-auto min-h-[calc(100vh-90px)] bg-white rounded">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-2">معلومات الحساب</h2>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>الاسم بالكامل</th>
                <th>البريد الالكتروني</th>
                <th>رقم الهاتف</th>
                <th>العنوان</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-7">
          <h2 className="text-2xl font-bold mb-2">طلباتي</h2>
          <CustomerOrders userOrder={orders} />
        </div>
      </div>
    </div>
  );
}
