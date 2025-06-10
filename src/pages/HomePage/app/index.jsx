import { useEffect, useState } from "react";
import CircleCategorise from "../ui/Componants/CircleCategorise";
import HeroSec from "../ui/Componants/HeroSec";
import ProductOffers from "../ui/Componants/ProductOffers";
import SudanProduct from "../ui/Componants/SudanProduct";
import { CatsRepo } from "../../../data/repos/CatsRepo";

export default function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CatsRepo.index_categorice().then((res) => setCategories(res));
  }, []);

  return (
    <div className="w-full">
      <HeroSec />
      <CircleCategorise categories={categories} />
      <SudanProduct />
      <ProductOffers />
    </div>
  );
}
