import dayjs from "dayjs";
import { supabase } from "../../../../supabaseClient";
import { useEffect, useState } from "react";

export default function OrderModal({ isOpen, onClose, order }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (order?.id) {
        const { data, error } = await supabase
          .from("order_items")
          .select("*, products(image_url)")
          .eq("order_id", order.id);

        if (!error) {
          const formatted = data.map((item) => ({
            name: item.product_name,
            quantity: item.quantity,
            price: item.price,
            image_url: item.products?.image_url || null,
          }));
          setItems(formatted);
        }
      }
    };

    if (isOpen && order) {
      fetchItems();
    }
  }, [order, isOpen]);

  return (
    <>
      {isOpen && order && (
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
              تفاصيل الطلب: {order.order_code}
            </h2>

            <div className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>الحالة:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-xs text-white ${
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
              </p>
              <p>
                <strong>تاريخ الطلب:</strong>{" "}
                {dayjs(order.created_at)
                  .add(2, "hour")
                  .format("YYYY/MM/DD - hh:mm A")}
              </p>
              <p>
                <strong>طريقة الدفع:</strong>{" "}
                {order.payment_method === "cod"
                  ? "عند الاستلام"
                  : order.payment_method}
              </p>
              <p>
                <strong>المبلغ الإجمالي:</strong>{" "}
                {order.total_price || "غير متوفر"} CAD
              </p>
              <p>
                <strong>رقم الهاتف:</strong> {order.phone || "غير متوفر"}
              </p>
              <p>
                <strong>المدينة:</strong> {order.city || "غير متوفر"}
              </p>
              <p>
                <strong>العنوان:</strong> {order.address || "غير متوفر"}
              </p>
            </div>

            {items && items.length > 0 && (
              <>
                <hr className="my-4" />
                <h3 className="text-lg font-semibold mb-2">العناصر:</h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 border-b pb-2"
                    >
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          الكمية: {item.quantity} - السعر: {item.price} CAD
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
