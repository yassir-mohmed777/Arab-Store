import { useState } from "react";
import hero from "./arap.png";
import { supabase } from "../../../../../supabaseClient";
export default function HeroSec() {
  const [loading, setLoading] = useState(false);
  const dummyProducts = [
  {
    name: "شورت تشينو كلاسيكي بلون الزيتون",
    description:
      "ارتقِ بإطلالتك الكاجوال مع هذا الشورت الكلاسيكي بلون الزيتون. يتميز بحزام ناعم، وجيوب عملية، وقَصّة مصممة بعناية لتناسب المناسبات غير الرسمية والمظهر الأنيق في نفس الوقت. القماش المتين يضمن لك مظهرًا أنيقًا يدوم طوال اليوم.",
    price: 84,
    stock: 30,
    image_url: "https://i.imgur.com/UsFIvYs.jpeg",
    colors: ["#556b2f"], // زيتوني
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "شورت رياضي كلاسيكي بخصر مرتفع",
    description:
      "تمتعي بالراحة والأناقة مع شورت الخصر المرتفع الرياضي الكلاسيكي. مصمم للحركة والمرونة، ويعد خيارًا مثاليًا لتمارينك أو للإطلالة الكاجوال. يتميز بخصر مرتفع يعزز المظهر العام، ونسيج يسمح بالتنفس، وثبات أثناء الحركة.",
    price: 43,
    stock: 35,
    image_url: "https://i.imgur.com/eGOUveI.jpeg",
    colors: ["#2e2e2e"], // رمادي غامق أو أسود تقريبًا
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "تيشيرت كلاسيكي بياقة دائرية - أبيض",
    description:
      "ارتقِ بأساسيات ملابسك مع هذا التيشيرت الأبيض الكلاسيكي. مصنوع من مزيج قطن ناعم يسمح بالتنفس ويوفر راحة ومتانة. تصميمه البسيط والراقي يجعله مناسبًا للتنسيق مع مختلف الإطلالات، سواء للارتداء بمفرده أو تحت السترات.",
    price: 39,
    stock: 50,
    image_url: "https://i.imgur.com/axsyGpD.jpeg",
    colors: ["#ffffff"], // أبيض
    sizes: ["S", "M", "L", "XL"]
  }
];

  const insertDummyProducts = async (storeId) => {
    setLoading(true);
    const productsToInsert = dummyProducts.map((product) => ({
      ...product,
      store_id: storeId,
    }));

    const { data, error } = await supabase
      .from("products")
      .insert(productsToInsert);

    if (error) {
      setLoading(false);
      console.error("❌ خطأ أثناء الإدخال:", error.message);
      alert("فشل الإدخال: " + error.message);
    } else {
      setLoading(false);
      console.log("✅ تم إدخال المنتجات:", data);
      // alert("تم إدخال المنتجات بنجاح ✅");
    }
  };

  const storeId = "a448d923-a92e-47bf-a4a1-625512ba18f8";
  return (
    <div className="w-full">
      <div className="w-full relative flex items-center justify-center">
        <img src={hero} className="w-full object-cover" />
        <div className="absolute">
          {/* {loading ? (
            <span>بيحمل الان</span>
          ) : (
            <button
              onClick={() => insertDummyProducts(storeId)}
              className=" bg-black text-white cursor-pointer py-3 px-5 rounded-2xl"
            >
              إدخال منتجات وهمية
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
