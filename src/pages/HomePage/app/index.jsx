import CircleCategorise from "../ui/Componants/CircleCategorise";
import HeroSec from "../ui/Componants/HeroSec";
import ProductOffers from "../ui/Componants/ProductOffers";
import SudanProduct from "../ui/Componants/SudanProduct";

export default function HomePage() {
  return (
    <div className='w-full'>
      <HeroSec />
      <CircleCategorise />
      <SudanProduct />
      <ProductOffers />
    </div>
  )
}
