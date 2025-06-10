import { useEffect, useState } from "react";
import CategoryCart from "../../../../../MainComonant/CategoryCard"; // مكون عرض المتجر
import { supabase } from "../../../../../supabaseClient";

export default function TopStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopStores();
  }, []);

  async function fetchTopStores() {
    setLoading(true);

    const { data, error } = await supabase.rpc("get_top_stores", {
      limit_count: 4,
    });

    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Top stores:", data);
      setStores(data)
    }

    setLoading(false);
  }

  return (
    <div className="w-full bg-gray-200 py-6">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4 justify-center mb-6">
          <span className="flex-grow h-[2px] bg-black opacity-20" />
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-black whitespace-nowrap">
            المتاجر الأعلى مبيعًا
          </h2>
          <span className="flex-grow h-[2px] bg-black opacity-20" />
        </div>

        {loading ? (
          <p className="text-center">جاري التحميل...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 px-4">
            {stores.map((store) => (
              <CategoryCart
                key={store.store_id}
                ounarName={store.store_name}
                storeImage={store.store_logo_url}
                sales={store.total_sales}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center mt-6">
          <button className="py-2 px-5 rounded-xl bg-black text-white hover:bg-gray-800 transition">
            عرض الكل
          </button>
        </div>
      </div>
    </div>
  );
}
