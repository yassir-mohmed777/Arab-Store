import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {

  return (
    <div className="w-full  py-6 bg-amber-50">
      <div className="container m-auto">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
          <h1 className="text-2xl font-bold text-black">الأسواق العربية</h1>
          </Link>
          <input
            type="text"
            className="input w-1/2 hidden md:block"
            placeholder="بحث..."
          />
          <div className="flex items-center gap-3 text-3xl">
            <div className="relative">
              <span className="absolute right-[-6px] bg-black text-white rounded-full text-[13px] px-1">0</span>
              <Link to={'/cart'}>
              <LiaShoppingBagSolid className="text-black cursor-pointer" />
              </Link>
            </div>
            <div className="relative">
              <span className="absolute right-[-6px] bg-black text-white rounded-full text-[13px] px-1">0</span>
              <Link to={'/wishlist'}>
              <CiHeart className="text-black " />
              </Link>
            </div>
            <Link to='/profile'>
            <AiOutlineUser className="text-black cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
