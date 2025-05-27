import { useEffect, useState } from "react";
import { domain } from "../../../../../zustand-store";
import styles from "./index.module.css";

export default function ProductImg({ product, productImg, setImg }) {
  const [multImg, setMultImg] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!product) return;
    setMultImg(product.product_full_img);
  }, [product]);

  return (
    <div className="col-12 col-md-6 ps-2">
      <div className={styles.wrapper}>
        <div className={styles.thumbnails}>
          {multImg &&
            multImg.map((el) => (
              <img
                key={el.documentId}
                src={domain + el.url}
                onClick={() => setImg(domain + el.url)}
                className={`${styles.thumb} ${
                  productImg === domain + el.url ? styles.active : ""
                }`}
                alt="preview"
              />
            ))}
        </div>

        <div className={styles.mainImage}>
          {!loaded && (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-light">
              <div className="spinner-border text-secondary" />
            </div>
          )}
          <img
            src={productImg}
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? "block" : "none" }}
            alt="main"
          />
        </div>
      </div>
    </div>
  );
}
