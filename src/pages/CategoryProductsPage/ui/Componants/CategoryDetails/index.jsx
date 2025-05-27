import { FaAngleDown } from "react-icons/fa";
import { useFilterModal } from "../../../../../zustand-store";
import { IoFilter } from "react-icons/io5";
import styles from "./index.module.css";
import ProductCart from "../../../../../mainComponants/ProductCart";
export default function CategoryDetails({ products, catName ,setProductPerPage , productPerPage , sortBy ,setSortBy }) {
  const { openModal } = useFilterModal();

  return (
    <div className="col-12 col-lg-9 px-3">
          <h3 className="m-0">{catName}</h3>
      <div className="d-flex  justify-content-between align-items-center">
        <div className="col-8 col-lg-12 d-flex flex-wrap justify-content-start justify-content-lg-between align-items-center gap-3 gap-lg-0">
          <div className="d-flex justify-content-end mb-2">
            <select
              value={productPerPage}
              onChange={(e) => {
                setActivePage(1);
                setProductPerPage(Number(e.target.value));
              }}
              className="form-select w-auto"
            >
              <option value={6}>6 / صفحة</option>
              <option value={12}>12 / صفحة</option>
              <option value={24}>24 / صفحة</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-2 my-3">
            <label htmlFor="sortSelect" className="form-label mb-0">
              ترتيب حسب:
            </label>
            <select
              id="sortSelect"
              className="form-select w-50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">الاحدث</option>
              <option value="product_name-asc">الأسم (A-Z)</option>
              <option value="product_new_price-asc">
                السعر (من الاقل الى الاعلى)
              </option>
              <option value="product_new_price-desc">
                السعر ( من الأعى الى الأقل)
              </option>
            </select>
          </div>
        </div>
        <div>
          <IoFilter
            className="d-block d-lg-none fs-3"
            id={styles.icon}
            onClick={openModal}
          />
        </div>
      </div>
      <div className="col-12 d-flex flex-wrap">
        <ProductCart productData={products} />
      </div>
    </div>
  );
}
