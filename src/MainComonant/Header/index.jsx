import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../zustand-store/Cart";
import { useFavorite } from "../../zustand-store/favorites";
import UserMenu from "./Componants/UserMenu";
export default function Header() {
  const { productInCart } = useCart();
  const { favorites } = useFavorite();
  const [productQty, setProductQty] = useState();

  useEffect(() => {
    let productQty = productInCart.reduce((acc, el) => acc + el.qty, 0);
    setProductQty(productQty);
  }, [productInCart]);

  return (
    <div className="w-full  py-6 bg-gray-300">
      <div className="container m-auto">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold text-black">الأسواق العربية</h1>
          </Link>
          <Link to="/trackorder">تتبع الطلب</Link>
          <input
            type="text"
            className="input w-1/2 hidden md:block"
            placeholder="بحث..."
          />
          <div className="flex items-center gap-3 text-3xl">
            <div className="relative">
              <span className="absolute right-[-6px] bg-black text-white rounded-full text-[13px] px-1">
                {productQty}
              </span>
              <Link to={"/cart"}>
                <LiaShoppingBagSolid className="text-black cursor-pointer" />
              </Link>
            </div>
            <div className="relative">
              <span className="absolute right-[-6px] bg-black text-white rounded-full text-[13px] px-1">
                {favorites.length}
              </span>
              <Link to={"/wishlist"}>
                <CiHeart className="text-black " />
              </Link>
            </div>

           <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
