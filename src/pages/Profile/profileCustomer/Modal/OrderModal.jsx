// components/OrderModal.jsx
export default function OrderModal({ isOpen, onClose, order }) {
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
          تفاصيل الطلب: {order.order_code}
        </h2>

        <div className="space-y-2 text-sm leading-relaxed">
          <p><strong>الحالة:</strong> {order.order_status}</p>
          <p><strong>تاريخ الطلب:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>طريقة الدفع:</strong> {order.payment_method === "cod" ? "عند الاستلام" : order.payment_method}</p>
          <p><strong>المبلغ الإجمالي:</strong> {order.total_price}CAD</p>
          <p><strong>رقم الهاتف:</strong> {order.phone}</p>
          <p><strong>المدينة:</strong> {order.city}</p>
          <p><strong>العنوان:</strong> {order.address}</p>
        </div>

        {/* يمكنك إضافة عرض المنتجات هنا لاحقاً إن أردت */}
      </div>
    </div>
  );
}
