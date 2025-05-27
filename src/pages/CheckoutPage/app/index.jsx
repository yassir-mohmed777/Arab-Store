// import { useRef, useEffect, useState } from "react";
// import { domain, useCart } from "../../../zustand-store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { OrderRepo } from "../../../data/repos/OrderRepo";
// import { AuthRepo } from "../../../data/repos/AuthRepo";
// import SimulatePaymentButton from "../ui/Componants/SimulatePaymentButton";

// export default function CheckoutPage() {
//   const { productInCart, resetCart } = useCart();
//   const navigate = useNavigate();
//   const fullNameRef = useRef();
//   const phoneRef = useRef();
//   const counntryRef = useRef();
//   const cityRef = useRef();
//   const addressRef = useRef();
//   const cardNumberRef = useRef();
//   const cardExpiryRef = useRef();
//   const cardCVVRef = useRef();

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [agree, setAgree] = useState(false);
//   let randomCode = "ORD-" + Math.floor(100000 + Math.random() * 900000);

//   useEffect(() => {
//     sessionStorage.removeItem('redirect')
//     let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
//     let location = localStorage.getItem("location");
//     if (userInfo) {
//       fullNameRef.current.value = userInfo.user_name;
//       phoneRef.current.value = userInfo.user_phone;
//     }
//     if (location) {
//       counntryRef.current.value = location;
//     }
//   }, []);

//   const total = productInCart.reduce(
//     (acc, el) => acc + el.qty * el.product_new_price,
//     0
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!agree) return toast.warning("وافق على الشرط");

//     if (
//       !fullNameRef.current.value ||
//       !phoneRef.current.value ||
//       !cityRef.current.value ||
//       !addressRef.current.value
//     ) {
//       return toast.warning("Please fill in all shipping details.");
//     }

//     if (paymentMethod === "card") {
//       if (
//         !cardNumberRef.current.value ||
//         !cardExpiryRef.current.value ||
//         !cardCVVRef.current.value
//       ) {
//         return toast.warning("Please fill in all card details.");
//       }
//     }

//     let user_Id = sessionStorage.getItem("userId");

//     let data = {
//       phone: phoneRef.current.value,
//       counntry: counntryRef.current.value,
//       city: cityRef.current.value,
//       address: addressRef.current.value,
//       payment_method: paymentMethod,
//       total_price: total,
//       order_code: randomCode,
//       order_status: paymentMethod === "cod" ? "pending" : "confirmed",
//       users_permissions_user: { connect: [user_Id] },
//     };

//     OrderRepo.store_order(data).then((orderId) => {
//       createOrderItem(orderId);
//       resetCart();
//       navigate("/thank-you");
//     });
//   };

//   const createOrderItem = (orderId) => {
//     productInCart.forEach((el) => {
//       let data = {
//         quantity: el.qty,
//         order: {
//           connect: [orderId],
//         },
//         product: {
//           connect: [el.documentId],
//         },
//       };
//       axios.post(domain + "/api/orders-items", { data: data }).then((res) => {
//         console.log("Recored Seaved To DB");
//       });
//     });
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="mb-4">الدفع</h2>
//       <div className="row">
//         <div className="col-md-7">
//           <form onSubmit={handleSubmit}>
//             <h5 className="mb-3">معلومات الشحن</h5>

//             <div className="mb-3">
//               <label className="form-label">أسمك بالكامل</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 required
//                 ref={fullNameRef}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">رقم الجوال</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 required
//                 ref={phoneRef}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">الدولة</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 required
//                 ref={counntryRef}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">المدينة</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 required
//                 ref={cityRef}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">العنوان</label>
//               <textarea
//                 className="form-control"
//                 rows="3"
//                 required
//                 ref={addressRef}
//               ></textarea>
//             </div>

//             <h5 className="mt-4">طريقة الدفع</h5>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="paymentMethod"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//               />
//               <label className="form-check-label">الدفع عند الاستلام</label>
//             </div>
//             <div className="form-check mb-3">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="paymentMethod"
//                 checked={paymentMethod === "card"}
//                 onChange={() => setPaymentMethod("card")}
//               />
//               <label className="form-check-label">بطاقة ائتمان</label>
//             </div>

//             {paymentMethod === "card" && (
//               <div className="border p-3 rounded mb-3">
//                 <h6>تفاصيل البطاقة</h6>
//                 <div className="mb-3">
//                   <label className="form-label">Card Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     maxLength={16}
//                     placeholder="1234 5678 9012 3456"
//                     ref={cardNumberRef}
//                   />
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Expiry Date</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="MM/YY"
//                       ref={cardExpiryRef}
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">CVV</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       maxLength={3}
//                       placeholder="123"
//                       ref={cardCVVRef}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="form-check mb-3">
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={agree}
//                 onChange={() => setAgree(!agree)}
//               />
//               <label className="form-check-label">
//                 أوافق على الشروط والأحكام
//               </label>
//             </div>
//             <div>
//               <button type="submit" className="btn btn-dark w-100">
//                 اطلب الأن
//               </button>
//               <SimulatePaymentButton
//                 paymentMethod={paymentMethod}
//                 cardNumberRef={cardNumberRef}
//                 cardExpiryRef={cardExpiryRef}
//                 cardCVVRef={cardCVVRef}
//               />
//             </div>
//           </form>
//         </div>

//         <div className="col-md-5 mt-4 mt-md-0">
//           <div className="border p-3 rounded">
//             <h5>تفاصيل الطلب</h5>
//             <ul className="list-group mb-3">
//               {productInCart.map((item) => (
//                 <li
//                   key={item.documentId}
//                   className="list-group-item d-flex justify-content-between align-items-center"
//                 >
//                    x {item.qty} {item.product_name}
//                   <span>{item.product_new_price * item.qty} ريال</span>
//                 </li>
//               ))}
//             </ul>
//             <h6 className="text-end">
//               المجموع: <b>{total} ريال</b>
//             </h6>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useRef, useEffect, useState } from "react";
// import { domain, useCart } from "../../../zustand-store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { OrderRepo } from "../../../data/repos/OrderRepo";
// import { AuthRepo } from "../../../data/repos/AuthRepo";
// import { loadStripe } from "@stripe/stripe-js"; // إضافة مكتبة Stripe
// import { StripeRepo } from "../../../data/repos/StripeRepo"; // (خادم Stripe)

// const stripePromise = loadStripe("pk_test_51ROUv6GP3KxxzVWZHWW9vk2QCbw65NMySuDW34UssCH4D7J7LeL4Nd7VZarn9DpAt9fhJpAeJQJ5bcOzx4SzzZlY00FhCTs26D"); // ضع مفتاح Stripe العلني

// export default function CheckoutPage() {
//   const { productInCart, resetCart } = useCart();
//   const navigate = useNavigate();
//   const fullNameRef = useRef();
//   const phoneRef = useRef();
//   const counntryRef = useRef();
//   const cityRef = useRef();
//   const addressRef = useRef();
//   const cardNumberRef = useRef();
//   const cardExpiryRef = useRef();
//   const cardCVVRef = useRef();

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [agree, setAgree] = useState(false);
//   let randomCode = "ORD-" + Math.floor(100000 + Math.random() * 900000);

//   useEffect(() => {
//     sessionStorage.removeItem('redirect')
//     let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
//     let location = localStorage.getItem("location");
//     if (userInfo) {
//       fullNameRef.current.value = userInfo.user_name;
//       phoneRef.current.value = userInfo.user_phone;
//     }
//     if (location) {
//       counntryRef.current.value = location;
//     }
//   }, []);

//   const total = productInCart.reduce(
//     (acc, el) => acc + el.qty * el.product_new_price,
//     0
//   );

//   // ارسال بيانات الدفع الى Stripe
//   const handleCheckoutStripe = async () => {
//     if (!agree) return toast.warning("وافق على الشرط");

//     if (
//       !fullNameRef.current.value ||
//       !phoneRef.current.value ||
//       !cityRef.current.value ||
//       !addressRef.current.value
//     ) {
//       return toast.warning("رجاء املئ جميح الخانات.");
//     }

//     const items = productInCart.map((item) => ({
//       name: item.product_name,
//       price: item.product_new_price * 100, // Stripe يأخذ السعر بالسنت
//       quantity: item.qty,
//     }));

//     try {
//       const response = await axios.post("http://localhost:4242/create-checkout-session", {
//         items: items,
//       });

//       const stripe = await stripePromise;
//       stripe.redirectToCheckout({ sessionId: response.data.sessionId });
//     } catch (error) {
//       console.error(error);
//       toast.error("حدث خطأ أثناء معالجة الدفع");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (paymentMethod === "cod") {
//       // الدفع عند الاستلام
//       let user_Id = sessionStorage.getItem("userId");

//       let data = {
//         phone: phoneRef.current.value,
//         counntry: counntryRef.current.value,
//         city: cityRef.current.value,
//         address: addressRef.current.value,
//         payment_method: paymentMethod,
//         total_price: total,
//         order_code: randomCode,
//         order_status: "pending",
//         users_permissions_user: { connect: [user_Id] },
//       };

//       OrderRepo.store_order(data).then((orderId) => {
//         createOrderItem(orderId);
//         resetCart();
//         navigate("/thank-you");
//       });
//     } else {
//       // الدفع باستخدام البطاقة
//       handleCheckoutStripe();
//     }
//   };

//   const createOrderItem = (orderId) => {
//     productInCart.forEach((el) => {
//       let data = {
//         quantity: el.qty,
//         order: {
//           connect: [orderId],
//         },
//         product: {
//           connect: [el.documentId],
//         },
//       };
//       axios.post(domain + "/api/orders-items", { data: data }).then((res) => {
//         console.log("Recored Seaved To DB");
//       });
//     });
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="mb-4">الدفع</h2>
//       <div className="row">
//         <div className="col-md-7">
//           <form onSubmit={handleSubmit}>
//             {/* تفاصيل الشحن */}
//             <h5 className="mb-3">معلومات الشحن</h5>
//             <div className="mb-3">
//               <label className="form-label">أسمك بالكامل</label>
//               <input type="text" className="form-control" required ref={fullNameRef} />
//             </div>
//             {/* باقي تفاصيل الشحن */}

//             {/* طريقة الدفع */}
//             <h5 className="mt-4">طريقة الدفع</h5>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="paymentMethod"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//               />
//               <label className="form-check-label">الدفع عند الاستلام</label>
//             </div>
//             <div className="form-check mb-3">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="paymentMethod"
//                 checked={paymentMethod === "card"}
//                 onChange={() => setPaymentMethod("card")}
//               />
//               <label className="form-check-label">بطاقة ائتمان</label>
//             </div>

//             {paymentMethod === "card" && (
//               <div className="border p-3 rounded mb-3">
//                 <h6>تفاصيل البطاقة</h6>
//                 {/* تفاصيل البطاقة */}
//               </div>
//             )}

//             {/* قبول الشروط */}
//             <div className="form-check mb-3">
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={agree}
//                 onChange={() => setAgree(!agree)}
//               />
//               <label className="form-check-label">أوافق على الشروط والأحكام</label>
//             </div>

//             {/* زر الدفع */}
//             <button type="submit" className="btn btn-dark w-100">اطلب الأن</button>
//           </form>
//         </div>
//         {/* تفاصيل الطلب */}
//       </div>
//     </div>
//   );
// }

import { useRef, useState, useEffect } from "react";
import { useCart } from "../../../zustand-store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js"; // مكتبة Stripe
import { OrderRepo } from "../../../data/repos/OrderRepo"; // مستودع الطلبات

const stripePromise = loadStripe(
  "pk_test_51ROUv6GP3KxxzVWZHWW9vk2QCbw65NMySuDW34UssCH4D7J7LeL4Nd7VZarn9DpAt9fhJpAeJQJ5bcOzx4SzzZlY00FhCTs26D"
);

export default function CheckoutPage() {
  const { productInCart, resetCart } = useCart();
  const navigate = useNavigate();
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [agree, setAgree] = useState(false);
  let randomCode = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  const total = productInCart.reduce(
    (acc, el) => acc + el.qty * el.product_new_price,
    0
  );

  useEffect(() => {
    sessionStorage.removeItem("redirect");
  }, []);

  const handleCheckoutStripe = async () => {
    if (!agree) return toast.warning("وافق على الشرط");

    if (
      !fullNameRef.current.value ||
      !phoneRef.current.value ||
      !cityRef.current.value ||
      !addressRef.current.value
    ) {
      return toast.warning("رجاء املئ جميح الخانات.");
    }

    const items = productInCart.map((item) => ({
      name: item.product_name,
      price: item.product_new_price * 100, // Stripe يأخذ السعر بالسنت
      quantity: item.qty,
    }));

    try {
      const response = await axios.post(
        "http://localhost:4242/create-checkout-session",
        {
          items: items,
        }
      );

      // استخدام sessionId بدلاً من url
      if (response.data.sessionId) {
        const stripe = await stripePromise;
        stripe.redirectToCheckout({ sessionId: response.data.sessionId });
        resetCart();
      } else {
        throw new Error("لم يتم إنشاء الجلسة بنجاح");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء معالجة الدفع");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "cod") {
      let user_Id = sessionStorage.getItem("userId");

      let data = {
        phone: phoneRef.current.value,
        city: cityRef.current.value,
        address: addressRef.current.value,
        payment_method: paymentMethod,
        total_price: total,
        order_code: randomCode,
        order_status: "pending",
        users_permissions_user: { connect: [user_Id] },
      };

      OrderRepo.store_order(data).then((orderId) => {
        resetCart();
        navigate("/thank-you");
      });
    } else {
      handleCheckoutStripe();
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">الدفع</h2>
      <div className="row">
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <h5 className="mb-3">معلومات الشحن</h5>
            <div className="mb-3">
              <label className="form-label">أسمك بالكامل</label>
              <input
                type="text"
                className="form-control"
                required
                ref={fullNameRef}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">رقم الهاتف</label>
              <input
                type="tel"
                className="form-control"
                required
                ref={phoneRef}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">المدينة</label>
              <input
                type="text"
                className="form-control"
                required
                ref={cityRef}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">العنوان</label>
              <input
                type="text"
                className="form-control"
                required
                ref={addressRef}
              />
            </div>

            <h5 className="mt-4">طريقة الدفع</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <label className="form-check-label">الدفع عند الاستلام</label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <label className="form-check-label">بطاقة ائتمان</label>
            </div>

            {paymentMethod === "card" && (
              <div className="border p-3 rounded mb-3">
                <h6>تفاصيل البطاقة</h6>
                {/* تفاصيل البطاقة هنا */}
              </div>
            )}

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label className="form-check-label">
                أوافق على الشروط والأحكام
              </label>
            </div>

            <button type="submit" className="btn btn-dark w-100">
              اطلب الأن
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
