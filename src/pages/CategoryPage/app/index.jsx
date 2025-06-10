import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import ProductCard from "../../../MainComonant/ProductCard";
import StoresSwiper from "../ui/Componants/StoresSwiper";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [stores, setStores] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchStoresByCategory = async () => {
      setLoading(true);
      // جلب اسم القسم (اختياري)
      const { data: categoryData, error: catErr } = await supabase
        .from("store_categories")
        .select("name")
        .eq("id", categoryId)
        .single();

      if (catErr) {
        console.error("فشل في جلب اسم القسم:", catErr.message);
      } else {
        setCategoryName(categoryData.name);
      }

      // 2. جلب المتاجر التابعة للقسم
      const { data: storeData, error: storeErr } = await supabase
        .from("users")
        .select("id, store_name, store_logo_url")
        .eq("user_type", "store")
        .eq("store_category_id", categoryId);

      if (storeErr) {
        console.error("خطأ في جلب المتاجر:", storeErr.message);
        setLoading(false);
        return;
      }

      setStores(storeData);

      const storeIds = storeData.map((store) => store.id);

      if (storeIds.length > 0) {
        const { data: productData, error: productErr } = await supabase
          .from("products")
          .select("*")
          .in("store_id", storeIds);

        if (productErr) {
          console.error("خطأ في جلب المنتجات:", productErr.message);
        } else {
          setProducts(productData);
        }
      }

      setLoading(false);
    };

    if (categoryId) fetchStoresByCategory();
  }, [categoryId]);

  return (
    <div className="container m-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        المتاجر في قسم {categoryName || "..."}
      </h1>
      <div className="w-full">
        <StoresSwiper stores={stores} categoryId={categoryId} />
      </div>

      {/* ✅ قائمة المنتجات تحت هذا القسم */}
      <h2 className="text-xl font-bold mb-4 text-center">
        المنتجات المتوفرة في القسم
      </h2>

      {loading ? (
        <p className="text-center">جارٍ تحميل المنتجات...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">لا توجد منتجات حالياً.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 pb-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => navigate(`/product/${product.id}`)}/>
          ))}
        </div>
      )}
    </div>
  );
}
