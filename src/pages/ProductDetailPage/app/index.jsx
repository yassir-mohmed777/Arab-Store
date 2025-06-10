import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import ProductDetail from "../ui/Componants/ProductDetail";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);  // حالة لودينج
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("فشل في جلب المنتج:", error.message);
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg font-semibold">
        جاري تحميل المنتج...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        لم يتم العثور على المنتج.
      </div>
    );
  }

  const handleBack = () => {
    // if (categoryId) {
    //   navigate(`/category/${categoryId}`);
    // } else {
      navigate(-1);
    // }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
      >
        الرجوع 
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* صورة المنتج */}
        <div className="rounded-xl overflow-hidden shadow-lg h-[450px]">
          <img
            src={product.image_url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* تفاصيل المنتج */}
        <ProductDetail product={product} />
      </div>

      {/* تبويبات إضافية */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
          تقييمات العملاء
        </h2>
        <p className="text-gray-500 text-center py-10">لا توجد تقييمات بعد.</p>
      </div>
    </div>
  );
}
