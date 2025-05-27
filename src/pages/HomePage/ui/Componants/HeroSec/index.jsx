import styles from "./index.module.css";
import hero from "./array.jpg";
export default function HeroSec() {
  return (
    <div className="w-full">
      <div className="w-full relative flex items-center justify-center">
        <img src={hero} className="h-[400px] w-full" />
        <div className="absolute">
          <p className="text-2xl font-bold text-black pb-2">نورتا المتجر</p>
          <button className=" bg-black text-white cursor-pointer py-3 px-5 rounded-2xl">
            تسوق الأن
          </button>
        </div>
      </div>
    </div>
  );
}
