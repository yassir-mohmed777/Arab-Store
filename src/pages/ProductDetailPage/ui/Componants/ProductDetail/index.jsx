import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../../../../zustand-store/Cart";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleAdd = () => {
    if ((product.colors?.length && !selectedColor) || (product.sizes?.length && !selectedSize)) {
      toast.error("يرجى اختيار اللون والمقاس");
      return;
    }

    const item = {
      id: product.id,
      store_id: product.store_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      qty,
      stock: product.stock,
      color: selectedColor,
      size: selectedSize,
    };

    if (addToCart(item)) {
      toast.success("تمت إضافة المنتج إلى السلة");
    }
  };

  const increaseQty = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
    } else {
      toast.warn(`الكمية المتوفرة ${product.stock}`, { position: "top-center" });
    }
  };

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

      <p className="text-gray-700 text-lg leading-relaxed">
        {product.description || "وصف قصير للمنتج"}
      </p>

      <p className="text-3xl font-bold text-green-600">{product.price}CAD</p>

      {/* ألوان المنتج */}
      {product.colors?.length > 0 && (
        <section>
          <h3 className="mb-3 font-semibold text-gray-800">اختر اللون:</h3>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`اختر اللون ${color}`}
                className={`w-10 h-10 rounded-full border-2 transition 
                  ${selectedColor === color ? "ring-4 ring-offset-2 ring-indigo-500" : "border-gray-300"}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </section>
      )}

      {/* مقاسات المنتج */}
      {product.sizes?.length > 0 && (
        <section>
          <h3 className="mb-3 font-semibold text-gray-800">اختر المقاس:</h3>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition 
                  ${selectedSize === size
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* اختيار الكمية وزر الإضافة */}
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">الكمية:</span>
          <button
            onClick={decreaseQty}
            className="w-9 h-9 flex justify-center items-center rounded-md border border-gray-300 hover:bg-gray-100 transition"
            aria-label="تقليل الكمية"
          >
            −
          </button>
          <span className="min-w-[30px] text-center text-lg font-semibold">{qty}</span>
          <button
            onClick={increaseQty}
            className="w-9 h-9 flex justify-center items-center rounded-md border border-gray-300 hover:bg-gray-100 transition"
            aria-label="زيادة الكمية"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:brightness-110 transition"
          aria-label="أضف إلى السلة"
        >
          أضف إلى السلة
        </button>
      </section>
    </div>
  );
}
