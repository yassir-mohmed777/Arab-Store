import { useState } from "react";
import { FcOk } from "react-icons/fc";
import { Link } from "react-router-dom";
export default function Orders({ userOrder }) {
  const [showAll, setShowAll] = useState(false);
  const visibleOrders = showAll ? userOrder : userOrder.slice(0, 2);
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
        <div className="list-group">
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
              {visibleOrders.map((order, index) => (
                <tr className="cursor-pointer" key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.order_code}</td>
                  <td>
                    <span
                      className={`${
                        order.order_status === "تحت التجهيز"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {order.order_status.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
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
          {userOrder.length > 2 && (
            <div className="text-center mt-4">
              <button
                className="btn btn-dark"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "عرض أقل" : "عرض المزيد"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
