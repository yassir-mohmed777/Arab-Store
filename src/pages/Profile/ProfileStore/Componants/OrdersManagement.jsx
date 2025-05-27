import { useState } from "react";
import OrderModal from "../Modal/OrderModal";

const fakeOrders = [
  {
    id: "ORD001",
    customer: "أحمد علي",
    date: "2025-05-25",
    total: 150,
    status: "قيد التنفيذ",
    items: [
      { name: "منتج 1", quantity: 2, price: 50 },
      { name: "منتج 2", quantity: 1, price: 50 },
    ],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
  {
    id: "ORD002",
    customer: "سارة محمد",
    date: "2025-05-24",
    total: 200,
    status: "تم الشحن",
    items: [{ name: "منتج 3", quantity: 4, price: 50 }],
  },
];

export default function OrdersManagement() {
  const [orders, setOrders] = useState(fakeOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const openModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleSaveStatus = () => {
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
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.total}CAD</td>
                <td>{order.status}</td>
              </tr>
            ))}
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
