import { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";

export default function OrderModal({
  isOpen,
  onClose,
  order,
  newStatus,
  setNewStatus,
  onSave,
}) {
  const orderStatuses = [
    "قيد الانتظار",
    "تم الشحن",
    "تم التوصيل",
    "مؤكد",
    "ملغى",
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (order) {
      setNewStatus(order.order_status);

      // جلب عناصر الطلب
      const fetchItems = async () => {
        const { data, error } = await supabase
          .from("order_items")
          .select("*, product:product_id (name, image_url)")
          .eq("order_id", order.id);

        if (!error) {
          const mapped = data.map((item) => ({
            name: item.product?.name || "منتج غير معروف",
            image_url: item.product?.image_url,
            quantity: item.quantity,
            price: item.price,
          }));
          setItems(mapped);
        } else {
          console.error("فشل تحميل عناصر الطلب:", error.message);
        }
      };

      fetchItems();
    }
  }, [order, setNewStatus]);

  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl relative"
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
          تفاصيل الطلب #{order.order_code}
        </h2>

        {/* معلومات العميل */}
        <div className="space-y-2 mb-4">
          <p>
            <strong>العميل:</strong> {order.customer}
          </p>
          <p>
            <strong>رقم الجوال:</strong> {order.phone}
          </p>
          <p>
            <strong>المدينة:</strong> {order.city}
          </p>
          <p>
            <strong>العنوان:</strong> {order.address}
          </p>
        </div>

        {/* معلومات الطلب */}
        <div className="space-y-2 mb-4">
          <p>
            <strong>تاريخ الطلب:</strong> {order.date}
          </p>
          <p>
            <strong>طريقة الدفع:</strong>{" "}
            {order.payment_method === "cod"
              ? "عند الاستلام"
              : order.payment_method}
          </p>
          <p>
            <strong>الإجمالي الكلي:</strong>
            <span className="text-lg font-bold text-green-700">
              {order.total_price}CAD
            </span>
          </p>
        </div>

        {/* حالة الطلب */}
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

        {/* العناصر */}
        <h3 className="mt-6 font-semibold">العناصر:</h3>
        <ul className="list-disc list-inside max-h-40 overflow-y-auto pr-1 text-sm text-gray-700">
          {items.length > 0 ? (
            items.map((item, i) => (
              <li key={i} className="flex items-center gap-2 border-b py-1">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <span>{item.name}</span>
                <span className="ml-auto text-sm">
                  الكمية: {item.quantity} - السعر: {item.price} CAD
                </span>
              </li>
            ))
          ) : (
            <li>لا توجد عناصر مرتبطة بهذا الطلب.</li>
          )}
        </ul>

        {/* الأزرار */}
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
