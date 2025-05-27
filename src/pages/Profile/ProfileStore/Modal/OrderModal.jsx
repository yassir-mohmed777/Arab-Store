import { useEffect } from "react";

export default function OrderModal({ isOpen, onClose, order, newStatus, setNewStatus, onSave }) {
  const orderStatuses = [
    "قيد التنفيذ",
    "تم الشحن",
    "تم التسليم",
    "ملغى",
  ];

  // عند تغيير الطلب، نهيئ الحالة الجديدة للحالة الحالية
  useEffect(() => {
    if (order) {
      setNewStatus(order.status);
    }
  }, [order, setNewStatus]);

  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
          aria-label="إغلاق"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          تفاصيل الطلب {order.id}
        </h2>

        <p><strong>العميل:</strong> {order.customer}</p>
        <p><strong>التاريخ:</strong> {order.date}</p>
        <p><strong>الإجمالي:</strong> {order.total}CAD</p>

        <div className="mt-4">
          <label className="block mb-1 font-semibold">الحالة:</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <h3 className="mt-4 font-semibold">العناصر:</h3>
        <ul className="list-disc list-inside max-h-40 overflow-y-auto">
          {order.items.map((item, i) => (
            <li key={i}>
              {item.name} - الكمية: {item.quantity} - السعر: {item.price}CAD
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-4 justify-end">
          <button
            onClick={onSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            حفظ
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
