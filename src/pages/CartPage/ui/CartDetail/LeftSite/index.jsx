import { useCart } from "../../../../../zustand-store";
import styles from "./index.module.css";
import NotFound from "../../../../../assets/no-product-found.png";
import { toast, ToastContainer } from "react-toastify";
import real from "../../real.jpg";
import { useEffect } from "react";
export default function LeftSite() {
  const { productInCart, decrementQty, incrementQty, deleteItem } = useCart();

  const handleIncrease = (id, stock, qty) => {
    if (qty < stock) {
      incrementQty(id, stock);
    } else {
      toast.warn(`المتاح ${stock} فقط`, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    console.log(productInCart);
  }, []);

  const isEmpty = productInCart.length === 0;

  return (
    <div className="col-12 col-md-7 border rounded-5 p-2 me-md-3 me-lg-5">
      {isEmpty ? (
        <div className="text-center py-5">
          <img src={NotFound} alt="Empty cart" className={styles.notFoundImg} />
          <p className="text-muted m-0">
            Looks like you haven’t added anything yet.
          </p>
        </div>
      ) : (
        productInCart.map((el) => (
          <>
            <div key={el.documentId}>
              <div className="col-12 d-flex  p-3 justify-content-between">
                <div className="d-flex" id={styles.rhigtContant}>
                  <img className={styles.avtar} src={el.product_img} />
                  <div className="ms-2">
                    <h4>{el.product_name}</h4>
                    <p className="m-0">
                      المقاس : <span className="text-secondary">{el.size}</span>
                    </p>
                    <p>
                      اللون : <span className="text-secondary">{el.color}</span>
                    </p>
                    <div className="d-flex align-items-center position-relative">
                      <h3 className="m-0">{el.product_new_price}</h3>
                      <img src={real} style={{ width: "50px" }} />
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-between">
                  <span
                    className="text-end"
                    id={styles.delete}
                    onClick={() => deleteItem(el.documentId)}
                  >
                    X
                  </span>
                  <div
                    className="d-flex gap-3 align-items-center"
                    id={styles.leftContent}
                  >
                    <button onClick={() => decrementQty(el.documentId)}>
                      -
                    </button>
                    <span>{el.qty}</span>
                    <button
                      onClick={() =>
                        handleIncrease(el.documentId, el.product_stock, el.qty)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </>
        ))
      )}
    </div>
  );
}
