import { useRef, useState } from "react";
import { useCart } from "../../../zustand-store/Cart";
import { supabase } from "../../../supabaseClient";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const emailRef = useRef();
  const subscribeRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const addressNoteRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalCodeRef = useRef();
  const phoneRef = useRef();
  const saveInfoRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { productInCart, resetCart } = useCart();

  const total = productInCart.reduce((acc, el) => acc + el.qty * el.price, 0);

  const qty = productInCart.reduce((acc, el) => acc + el.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      subscribe: subscribeRef.current.checked,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      addressNote: addressNoteRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postalCodeRef.current.value,
      phone: phoneRef.current.value,
      saveInfo: saveInfoRef.current.checked,
    };

    const groupedByStore = productInCart.reduce((acc, item) => {
      if (!acc[item.store_id]) acc[item.store_id] = [];
      acc[item.store_id].push(item);
      return acc;
    }, {});

    try {
      for (const [storeId, items] of Object.entries(groupedByStore)) {
        const orderCode = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        const orderTotal = items.reduce(
          (sum, item) => sum + item.qty * item.price,
          0
        );

        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            total_price: orderTotal,
            order_status: "قيد الانتظار",
            customer_email: formData.email,
            address: formData.address,
            phone: formData.phone,
            city: formData.city,
            payment_method: paymentMethod,
            customer_id: sessionStorage.getItem("userId"),
            store_id: storeId,
            order_code: orderCode,
          })
          .select()
          .single();

        if (orderError) throw orderError;

        const orderItems = items.map((item) => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          quantity: item.qty,
          price: item.price,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) throw itemsError;
      }

      resetCart();
      toast.success("✅ تم إرسال الطلب بنجاح");
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الطلب:", error.message);
      toast.error("❌ فشل في إرسال الطلب");
    }
  };

  const groupedByStore = productInCart.reduce((acc, item) => {
    if (!acc[item.store_id]) acc[item.store_id] = [];
    acc[item.store_id].push(item);
    return acc;
  }, {});

  const storeCount = Object.keys(groupedByStore).length;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row w-full container mx-auto gap-8"
    >
      {/* Form Section */}
      <div className="w-full lg:w-1/2 space-y-6 pt-5">
        <h2 className="text-xl font-bold border-b pb-2">معلومات الشحن</h2>

        {storeCount > 1 && (
          <div className="alert alert-warning shadow-lg mb-4">
            ⚠️ تحتوي السلة على منتجات من أكثر من متجر. سيتم إنشاء طلب منفصل لكل
            متجر.
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            ref={emailRef}
            defaultValue=""
            className="input input-bordered w-full"
            placeholder="البريد الإلكتروني"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="subscribe"
              ref={subscribeRef}
              defaultChecked
              className="checkbox"
            />
            أرسل لي أحدث الأخبار والعروض
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              ref={firstNameRef}
              defaultValue=""
              className="input input-bordered"
              placeholder="الاسم"
            />
            <input
              type="text"
              name="lastName"
              ref={lastNameRef}
              defaultValue=""
              className="input input-bordered"
              placeholder="اسم العائلة"
            />
          </div>

          <input
            type="text"
            name="address"
            ref={addressRef}
            defaultValue=""
            className="input input-bordered w-full"
            placeholder="العنوان"
          />

          <input
            type="text"
            name="addressNote"
            ref={addressNoteRef}
            defaultValue=""
            className="input input-bordered w-full"
            placeholder="وصف المنزل (اختياري)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              ref={cityRef}
              defaultValue=""
              className="input input-bordered"
              placeholder="المدينة"
            />
            <input
              type="text"
              name="state"
              ref={stateRef}
              defaultValue=""
              className="input input-bordered"
              placeholder="المحافظة"
            />
            <input
              type="text"
              name="postalCode"
              ref={postalCodeRef}
              defaultValue=""
              className="input input-bordered"
              placeholder="الرمز البريدي (اختياري)"
            />
          </div>

          <input
            type="text"
            name="phone"
            ref={phoneRef}
            defaultValue=""
            className="input input-bordered w-full"
            placeholder="رقم الجوال"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="saveInfo"
              ref={saveInfoRef}
              className="checkbox"
            />
            احفظ هذه المعلومات للمرة القادمة
          </label>

          <h5 className="mt-4">طريقة الدفع</h5>
          <div>
            <input
              className="checkbox"
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <label className="form-check-label">الدفع عند الاستلام</label>
          </div>
          <div className="form-check mb-3">
            <input
              className="checkbox"
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <label className="form-check-label">بطاقة ائتمان</label>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            ادفع الان
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded shadow">
        <div className="space-y-6">
          {productInCart.map((el) => (
            <div key={el.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={el.image_url}
                  alt="product1"
                  className="w-16 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{el.name}</p>
                  <p className="text-gray-500 text-sm">ذهبي على أبيض</p>
                </div>
              </div>

              <span className="text-sm">{el.price}CAD</span>
            </div>
          ))}

          <div className="border-t pt-4 space-y-5 text-end text-sm">
            <div className="flex justify-between items-center">
              <p>المجموع الفرعي ({qty} قطع): </p>
              <span className="font-semibold">{total}CAD</span>
            </div>
            <div className="flex justify-between">
              <p className="text-2xl font-bold">المجموع</p>
              <p className="text-lg font-bold pt-2">{total}CAD</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
