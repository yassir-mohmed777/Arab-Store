import dayjs from "dayjs";
import { useState } from "react";
import { FcOk } from "react-icons/fc";
import { Link } from "react-router-dom";
import OrderModal from "../../Modal/OrderModal";

export default function CustomerOrders({ userOrder }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <div>
      {userOrder.length === 0 ? (
        <div className="flex items-center gap-2">
          <FcOk />
          <p className="text-gray-400">ليس لديك طلبات بعد</p>
          <Link className="text-gray-400 border-b border-gray-400">
            انشئ اول طلب من هنا
          </Link>
        </div>
      ) : (
        <div className="overflow-auto rounded-box border border-base-content/5 bg-base-100 h-[400px]">
          <table className="table ">
            <thead>
              <tr>
                <th>رقم</th>
                <th>رقم الطلب</th>
                <th>حالة الطلب</th>
                <th>التاريخ</th>
                <th>طرقة الدفع</th>
                <th>المجموع</th>
              </tr>
            </thead>
            <tbody>
              {userOrder.map((order, index) => (
                <tr
                  className="cursor-pointer"
                  key={index}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td>{index + 1}</td>
                  <td>{order.order_code}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        order.order_status === "تحت التجهيز"
                          ? "bg-yellow-500"
                          : order.order_status === "تم التوصيل"
                          ? "bg-green-600"
                          : order.order_status === "ملغي"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td>
                    {dayjs(order.created_at)
                      .add(2, "hour")
                      .format("YYYY/MM/DD - hh:mm A")}
                  </td>
                  <td>
                    {order.payment_method == "cod"
                      ? "عند الاستلام"
                      : "بطاقة مصرفية"}
                  </td>
                  <td>{order.total_price}CAD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <OrderModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
