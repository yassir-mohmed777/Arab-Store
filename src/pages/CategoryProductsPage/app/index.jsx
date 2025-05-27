import BlackSec from "../../HomePage/ui/Componants/BlackSec";
import CategoryDetails from "../ui/Componants/CategoryDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CatsRepo } from "../../../data/repos/Cat_Repo";
import Paginate from "../ui/Componants/Pagenation";
import { ProductsRepo } from "../../../data/repos/Products_Repo";
import Filters from "../../../mainComponants/Filter";
import FilterModal from "../../../mainComponants/FilterModal";
import { useFilterModal } from "../../../zustand-store";
import NavHeader from "../ui/Componants/NavHeader";
import fakeProducts from '../../../All-Data/shopProduct'

export default function CategoryProductsPage() {
  const [catName, setCatName] = useState();
  const params = useParams();
  const [productsTotal, setProductsTotal] = useState(0);
  const [productperPage, setProductPerPage] = useState(9);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const { filterModalIndex } = useFilterModal();
const [products, setProducts] = useState(fakeProducts); 
  return (
    <div className="col-12">
      {filterModalIndex && (
        <FilterModal setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
      )}
      <div className="container">
        <NavHeader catName={catName} />
        <div className="d-flex flex-column">
          <div className="d-flex">
            <Filters setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
            <CategoryDetails
            setSortBy={setSortBy}
            sortBy={sortBy}
              productPerPage={productperPage}
              products={products}
              catName={catName}
              setProductPerPage={setProductPerPage}
            />
          </div>
          <Paginate
            activePage={activePage}
            setActivePage={setActivePage}
            productsTotal={productsTotal}
            productperPage={productperPage}
          />
        </div>
        <BlackSec />
      </div>
    </div>
  );
}
