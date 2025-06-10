import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient";
import dayjs from "dayjs";

const STATUS_STEPS = [
  { key: "قيد الانتظار", label: "قيد الانتظار" },
  { key: "مؤكد", label: "مؤكد" },
  { key: "تم الشحن", label: "تم الشحن" },
  { key: "تم التوصيل", label: "تم التوصيل" },
];

const ProgressBar = ({ currentStatus }) => {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === currentStatus);
  const progressPercentage = (currentIndex / (STATUS_STEPS.length - 1)) * 100;

  return (
    <div className="relative flex items-center justify-between w-full mt-6 mb-10">
      {/* الخط الرمادي الكامل */}
      <div
        className="absolute top-1/2 w-full h-1 bg-gray-200 z-0"
        style={{ transform: "translateY(-50%)" }}
      />

      {/* الخط الأخضر حسب التقدم */}
      <div
        className="absolute top-1/2 h-1 bg-green-500 z-10 transition-all duration-500"
        style={{
          transform: "translateY(-50%)",
          width: `${progressPercentage}%`,
        }}
      />

      {/* الدوائر والمراحل */}
      {STATUS_STEPS.map(({ key, label }, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div
            key={key}
            className="relative z-20 flex flex-col items-center w-1/4 text-center"
          >
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold transition-all duration-500 
                ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                    ? "bg-white border-blue-500 text-blue-500 animate-pulse"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
            >
              {index + 1}
            </div>
            <div
              className={`mt-2 text-sm transition-colors duration-500 ${
                isCompleted
                  ? "text-green-600 font-medium"
                  : isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderTrackingPage = () => {
  const orderCodeRef = useRef(null);
  const contactRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrder(null);
    setItems([]);

    if (!orderCodeRef.current.value || !contactRef.current.value) {
      toast.error("يرجى إدخال رقم الطلب والبريد أو رقم الهاتف");
      setLoading(false);
      return;
    }

    const { data: foundOrder, error } = await supabase
      .from("orders")
      .select("*")
      .or(`customer_email.eq.${contactRef.current.value},phone.eq.${contactRef.current.value}`)
      .eq("order_code", orderCodeRef.current.value)
      .single();

    if (error || !foundOrder) {
      toast.error("لم يتم العثور على الطلب");
      setLoading(false);
      return;
    }

    const { data: orderItems } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", foundOrder.id);

    setOrder(foundOrder);
    setItems(orderItems || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">تتبع طلبك </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <input
          type="text"
          placeholder="رقم الطلب"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          ref={orderCodeRef}
        />
        <input
          type="text"
          placeholder="البريد الإلكتروني أو رقم الهاتف"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
         ref={contactRef}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded transition"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              جاري التحقق...
            </span>
          ) : (
            "تتبع الطلب"
          )}
        </button>
      </form>

      {order && (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg mt-10 p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">تفاصيل الطلب</h2>

          <ProgressBar currentStatus={order.order_status} />

          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <span className="font-semibold">رقم الطلب:</span>{" "}
              {order.order_code}
            </div>
            <div>
              <span className="font-semibold">الحالة:</span>{" "}
              {order.order_status}
            </div>
            <div>
              <span className="font-semibold">تاريخ الإنشاء:</span>{" "}
              {dayjs(order.created_at)
                .add(2, "hour")
                .format("YYYY/MM/DD - hh:mm A")}
            </div>
            <div>
              <span className="font-semibold">طريقة الدفع:</span>{" "}
              {order.payment_method === "cod"
                ? "عند الاستلام"
                : order.payment_method}
            </div>
            <div>
              <span className="font-semibold">المدينة:</span> {order.city}
            </div>
            <div>
              <span className="font-semibold">رقم الهاتف:</span> {order.phone}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">العنوان:</span> {order.address}
            </div>
            <div>
              <span className="font-semibold">الإجمالي:</span>{" "}
              {order.total_price}CAD
            </div>
          </div>

          {items.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                المنتجات
              </h3>
              <ul className="divide-y border rounded">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 flex justify-between text-sm"
                  >
                    <span>{item.product_name}</span>
                    <span>
                      x{item.quantity} &times; {item.price}CAD
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
