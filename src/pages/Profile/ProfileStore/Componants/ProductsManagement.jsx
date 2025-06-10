import { useEffect, useState } from "react";
import ProductModal from "../Modal/ProductModal";
import { supabase } from "../../../../supabaseClient";
import useAuth from "../../../../zustand-store/auth/authStore";

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAuth();

  const storeId = user.id;
  console.log(user)
  const fetchProducts = async () => {
    setLoading(true);

    if (!storeId) {
      console.error("لا يوجد معرف متجر مخزن.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("store_id", storeId);

    if (!error) {
      setProducts(data);
      console.log(data);
    } else {
      console.error("فشل في جلب المنتجات:", error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setSelectedProduct(null); // هذا يعني "وضع الإضافة"
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product); // هذا يعني "وضع التعديل"
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (productData) => {
    if (!selectedProduct) {
      const { error } = await supabase.from("products").insert({
        ...productData,
        store_id: storeId,
      });
      if (error) {
        console.error("خطأ أثناء الإضافة:", error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", selectedProduct.id);
      if (error) {
        console.error("خطأ أثناء التعديل:", error.message);
        return;
      }
    }

    fetchProducts(); // إعادة جلب البيانات من القاعدة
    closeModal();
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا المنتج؟"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
    if (error) {
      console.error("خطأ أثناء الحذف:", error.message);
      return;
    }

    fetchProducts(); // إعادة التحديث
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">إدارة المنتجات</h1>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          + منتج جديد
        </button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 overflow-y-auto h-[500px]">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>الصورة</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th>المخزون</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10 h-full">
                  جاري تحميل المنتجات...
                </td>
              </tr>
            ) : (
              <>
                {products.map((product, idx) => (
                  <tr key={product.id} className="hover:bg-base-200">
                    <td>{idx + 1}</td>
                    <td>
                      <img
                        src={product.image_url || "/no-image.png"}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}CAD</td>
                    <td>{product.stock}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* عرض رسالة في حال لا توجد منتجات */}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-10">
                      لا توجد منتجات بعد.
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* المودال */}
      <ProductModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={selectedProduct}
      />
    </div>
  );
}
