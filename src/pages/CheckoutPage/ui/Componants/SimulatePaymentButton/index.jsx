import React from "react";
import { toast } from "react-toastify";

export default function SimulatePaymentButton({paymentMethod , cardNumberRef ,cardExpiryRef , cardCVVRef}) {

    const simulatePaymentFailure = () => {
        if (paymentMethod !== "card") {
          toast.error("Payment simulation is only for card method.");
          return;
        }
      
        const cardNumber = cardNumberRef.current?.value || "";
        const expiry = cardExpiryRef.current?.value || "";
        const cvv = cardCVVRef.current?.value || "";
      
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
          return toast.error("Payment failed: Invalid card number.");
        }
      
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
          return toast.error("Payment failed: Invalid expiry date format. Use MM/YY.");
        }
      
        if (cvv.length !== 3 || isNaN(cvv)) {
          return toast.error("Payment failed: Invalid CVV.");
        }
      
      
        toast.error("Payment failed: Card was declined by the bank.");
      };
      
  return (
    <button
      type="button"
      className="btn btn-danger w-100 mt-2"
      onClick={simulatePaymentFailure}
    >
      Simulate Payment Failure
    </button>
  );
}
