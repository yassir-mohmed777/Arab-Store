import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import ProductCard from "../../../MainComonant/ProductCard";

export default function StorePage() {
  const { storeId } = useParams();
  const location = useLocation();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const categoryId = location.state?.categoryId;
  useEffect(() => {
    if (!storeId) return;

    const fetchData = async () => {
      // جلب بيانات المتجر
      const { data: storeData, error: storeError } = await supabase
        .from("users")
        .select("*")
        .eq("id", storeId)
        .single();

      if (storeError) console.error("خطأ في جلب المتجر:", storeError.message);
      else setStore(storeData);

      // جلب المنتجات
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", storeId);

      if (productsError)
        console.error("خطأ في جلب المنتجات:", productsError.message);
      else setProducts(productsData);
      console.log(productsData);
    };

    fetchData();
  }, [storeId]);

  const handleBack = () => {
    if (categoryId) {
      navigate(`/category/${categoryId}`);
    } else {
      navigate(-1);
    }
  };

  if (!store)
    return <div className="text-center py-20">جاري تحميل بيانات المتجر...</div>;

  return (
    <div className="container m-auto py-5">
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
      >
        الرجوع إلى المتاجر
      </button>
      {/* معلومات المتجر */}
      <div className="mb-8 flex justify-start">
        <img
          src={store.store_logo_url || "/default-store.png"}
          alt="شعار المتجر"
          className="w-28 h-28 rounded-full object-cover mb-4"
        />
        <div className="flex flex-col mr-3">
          <h1 className="text-3xl font-bold">{store.store_name}</h1>
          <p className="text-gray-500 mt-1">العنوان: {store.address}</p>
        </div>
      </div>

      {/* المنتجات */}
      <h2 className="text-xl font-semibold mb-4 text-center">منتجات المتجر</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد منتجات حاليًا.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
