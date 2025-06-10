import { toast } from "react-toastify";
import { useCart } from "../../../zustand-store/Cart";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { productInCart, incrementQty, decrementQty, deleteItem } = useCart();
  const navigate = useNavigate()
  const getTotal = () => {
    return productInCart.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const handleIncrease = (id, stock, qty) => {
    if (qty < stock) {
      incrementQty(id, stock);
    } else {
      toast.warn(`المتاح ${stock} فقط`);
    }
  };

  const hundlePay = () => {
    productInCart.length === 0 ? 
     toast.warning('السلة فارغة') : navigate('/checkout') 
  }

  return (
    <div>
      <div className="bg-black text-white text-center py-10 text-xl font-bold">
        سلة التسوق
      </div>

      <div className="container mx-auto pt-12 px-4">
        {/* العناوين */}
        <div className="hidden md:grid grid-cols-4 gap-4 font-semibold border-b border-gray-300 pb-2">
          <div className="text-start">المنتج</div>
          <div className="text-end">السعر</div>
          <div className="text-end">الكمية</div>
          <div className="text-end">المجموع</div>
        </div>

        {/* المنتجات */}
        {productInCart.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-8 border-b border-gray-300"
          >
            {/* المنتج */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-28 object-cover rounded"
              />
              <div className="text-end md:text-start">
                <div className="font-bold text-sm">{item.name}</div>
                <div className="text-xs text-gray-600">اللون: {item.color}</div>
                <div className="text-xs text-gray-600">المقاس: {item.size}</div>
                <div className="flex gap-2 mt-2 justify-end md:justify-start">
                  <button onClick={() => deleteItem(item.id)}>
                    <FaTrash className="text-red-600" />
                  </button>
                  <button>
                    <FaEdit className="text-blue-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* السعر */}
            <div className="text-end md:text-center">{item.price.toFixed(2)} CAD</div>

            {/* الكمية */}
            <div className="flex justify-end md:justify-center">
              <div className="flex items-center gap-4 border px-4 py-1 rounded">
                <button
                  className="text-3xl text-black font-bold hover:text-gray-700"
                  onClick={() => decrementQty(item.id)}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="text-2xl text-black font-bold hover:text-gray-700"
                  onClick={() => handleIncrease(item.id, item.stock, item.qty)}
                >
                  +
                </button>
              </div>
            </div>

            {/* المجموع */}
            <div className="text-end md:text-center font-bold">
              {(item.price * item.qty).toFixed(2)} CAD
            </div>
          </div>
        ))}

        {/* الملاحظات والإجمالي */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 py-8">
          <div className="flex flex-col gap-3 w-full md:w-2/3">
            <label>أضف ملاحظة للطلب</label>
            <textarea
              className="textarea textarea-neutral w-full min-h-[100px] rounded border p-2"
              placeholder="كيف يمكننا مساعدتك؟"
            ></textarea>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-1/3">
            <p className="text-lg font-semibold text-right">
              المجموع الكلي: {getTotal().toFixed(2)} CAD
            </p>
            <button onClick={hundlePay} className="btn bg-gradient-to-r from-gray-900 to-gray-600 text-white py-3 rounded">
              إتمام الشراء
            </button >
          </div>
        </div>
      </div>
    </div>
  );
}
