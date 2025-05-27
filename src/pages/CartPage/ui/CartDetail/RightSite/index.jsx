import { useEffect, useState } from "react";
import { useCart } from "../../../../../zustand-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthRepo } from "../../../../../data/repos/AuthRepo";
import real from '../../real.jpg'
export default function RightSite() {
  const { productInCart } = useCart();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AuthRepo.getCountry().then((res) => localStorage.setItem('location' , res));
  }, []);

  useEffect(() => {
    let NewTotal = productInCart.reduce(
      (acc, el) => acc + el.qty * el.product_new_price,
      0
    );
    setTotal(NewTotal);
  }, [productInCart]);

  const Checkout = () => {
    if (!productInCart.length) {
      return toast.warning("ليس لديك منتج في السلة");
    }

    navigate("/checkout")
  };

  return (
    <div className="col-12 col-md-4 p-2 ">
      <div className="col-12 d-flex flex-column border rounded-5 p-3">
        <h3>ملخص الطلب</h3>
        <hr />
        <div className="d-flex justify-content-between">
          <p>المجموع</p>
          <b>{total}<img src={real} style={{width :  "30px"}} /></b>
        </div>
        <button
          onClick={Checkout}
          className="btn btn-dark rounded-5"
          disabled={loading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
          ) : null}
          انتقل إلى الدفع
        </button>
      </div>
    </div>
  );
}
