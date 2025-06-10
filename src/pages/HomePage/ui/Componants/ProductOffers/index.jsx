import { useEffect, useState } from "react";
import OfferCard from "../../../../../MainComonant/OfferCard";
import { supabase } from "../../../../../supabaseClient";
// import { supabase } from "@/supabase/client";

export default function ProductOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id,
        name,
        price,
        discounted_price,
        image_url,
        users (
          id,
          store_name
        )
      `
      )
      .not("discounted_price", "is", null)
      .order("created_at", { ascending: false }) // ترتيب حسب الأحدث
      .limit(8); // جلب 8 منتجات فقط
    if (error) {
      console.error("خطأ في جلب العروض:", error.message);
    } else {
      console.log(data);
      setOffers(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="bg-gray-100 py-6">
      <div className="container mx-auto text-black">
        <div className="w-full pb-8 flex items-center space-x-4">
          <span className="flex-grow h-[2px] bg-black opacity-30" />
          <h2 className="text-xl lg:text-3xl font-bold text-center whitespace-nowrap">
            العروض
          </h2>
          <span className="flex-grow h-[2px] bg-black opacity-30" />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل العروض...</p>
        ) : offers.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد عروض حالياً</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2">
            {offers.map((offer, index) => (
              <OfferCard
                key={index}
                storeName={offer.users.store_name}
                name={offer.name}
                price={offer.discounted_price}
                originalPrice={offer.price}
                image={offer.image_url}
                discountPercentage={Math.round(
                  ((offer.price - offer.discounted_price) / offer.price) * 100
                )}
                discountValue={offer.price - offer.discounted_price}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center py-6">
          <button className="py-2 px-5 rounded-xl bg-black text-white hover:bg-gray-800 transition">
            عرض الكل
          </button>
        </div>
      </div>
    </div>
  );
}
