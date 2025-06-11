import { useEffect, useState } from "react";
import OrderModal from "../Modal/OrderModal";
import { supabase } from "../../../../supabaseClient";
import useAuth from "../../../../zustand-store/auth/authStore";

export default function StoreOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
  *,
  customer:customer_id (full_name)
`
        )
        .eq("store_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("خطأ في جلب الطلبات:", error.message);
      } else {
        const formatted = data.map((order) => ({
          ...order,
          customer: order.customer?.full_name || "غير معروف",
          date: new Date(order.created_at).toLocaleDateString(),
        }));
        setOrders(formatted);
        console.log(formatted);
      }
    };

    if (user.id) fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleSaveStatus = async () => {
    const { error } = await supabase
      .from("orders")
      .update({ order_status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", selectedOrder.id);

    if (error) {
      console.error("فشل في تحديث حالة الطلب:", error.message);
      return;
    }

    // تحديث في الواجهة الأمامية بعد الحفظ
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    closeModal();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">إدارة الطلبات</h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 overflow-y-auto h-[500px]">
        <table className="table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>التاريخ</th>
              <th>الإجمالي</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => openModal(order)}
                className="cursor-pointer hover:bg-base-200"
              >
                <td>{order.order_code}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.total_price}CAD</td>
                <td>{order.order_status}</td>
              </tr>
            ))}
              {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-10">
                      لا توجد 'طلبات' بعد.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
         
      </div>
      <OrderModal
        isOpen={!!selectedOrder}
        onClose={closeModal}
        order={selectedOrder}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onSave={handleSaveStatus}
      />
    </div>
  );
}
