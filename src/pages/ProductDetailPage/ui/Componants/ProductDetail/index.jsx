import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../../../../zustand-store";
import styles from "./index.module.css";
export default function ProductDetail({ product, productImg }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleAdd = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("أختر مقاس ولون رجاء");
      return;
    }
    

    let obj = {
      documentId: product.documentId,
      product_name: product.product_name,
      product_new_price: product.product_new_price,
      product_img: productImg,
      color: selectedColor,
      size: selectedSize,
      qty,
      product_stock: product.product_stock,
    };

    
    const added = addToCart(obj);
    if (added) {
      toast.success("تمت الأضافة للسلة");
    }
  };

  const increaseQty = () => {
    if (qty < product.product_stock) {
      setQty(qty + 1);
    } else {
      toast.warn(`Parts available ${product.product_stock} only`, {
        position: "top-center",
      });
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <div className="col-12 col-md-6 ps-4">
      <div className="col-12">
        <h1>{product.product_name}</h1>
        <span>
          ${product.product_new_price}{" "}
          <del>
            {product.product_price && "$"}
            {product.product_price}
          </del>
        </span>
        <p>{product.product_desc}</p>
        <hr />

        <p className="text-secondary">أختر اللون</p>
        <div className="d-flex gap-3 mb-3">
          {product.colors?.map((color) => (
            <button
              key={color.id}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border:
                  selectedColor === color.name
                    ? "2px solid black"
                    : "1px solid #ccc",
                backgroundColor: color.hex,
                position: "relative",
              }}
              onClick={() => setSelectedColor(color.name)}
            >
              {selectedColor === color.name && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color:
                      color.hex.toLowerCase() === "#000000" ? "white" : "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
        <hr />
        <p className="text-secondary">أختر المقاس</p>
        <div className="d-flex gap-2 gap-md-3 mb-3">
          {product.sizes?.map((size) => (
            <button
              id={styles.BtnSize}
              key={size}
              className="btn"
              style={{
                backgroundColor: selectedSize === size ? "black" : "#f1f1f1",
                color: selectedSize === size ? "white" : "black",
              }}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <hr />
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex gap-3 align-items-center" id={styles.myBtn}>
            <button onClick={decreaseQty}>-</button>
            <span>{qty}</span>
            <button onClick={increaseQty}>+</button>
          </div>
          <button className="btn rounded-5" id={styles.btn} onClick={handleAdd}>
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}
