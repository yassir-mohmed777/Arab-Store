import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

export default function StoreInfoModal({ onClose }) {
  const { user } = useOutletContext();

  const [logoPreview, setLogoPreview] = useState(user.store_logo_url || null);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const storeCatRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const logoRef = useRef();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("store_categories").select();
      if (!error) setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const store_name = nameRef.current.value;
    const Store_Cat = storeCatRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const logoFile = logoRef.current.files[0];

    if (!store_name || !Store_Cat || !phone || !address) {
      toast.error("يرجى تعبئة جميع الحقول");
      setLoading(false);
      return;
    }

    let store_logo_url = user.store_logo_url;

    if (logoFile) {
      const { data, error } = await supabase.storage
        .from("store-logos")
        .upload(`logo-${user.id}-${Date.now()}`, logoFile);

      if (error) {
        toast.error("فشل في رفع الشعار");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("store-logos")
        .getPublicUrl(data.path);

      store_logo_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("users")
      .update({
        store_name,
        phone,
        address,
        store_logo_url,
        store_category_id: Store_Cat,
      })
      .eq("id", user.id);

    if (error) {
      toast.error("حدث خطأ أثناء تحديث البيانات");
    } else {
      toast.success("تم تحديث بيانات المتجر بنجاح");
      onClose(); // إغلاق المودال
    }

    setLoading(false);
  };

const handleLogoPreview = (e) => {
  const file = e.target.files[0];

  const validTypes = ["image/jpeg", "image/png", "image/webp"];

  if (file && validTypes.includes(file.type)) {
    setLogoPreview(URL.createObjectURL(file));
  } else {
    toast.error("الرجاء اختيار صورة بصيغة jpg أو png أو webp");
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          تعديل بيانات المتجر
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">اسم المتجر</label>
            <input
              ref={nameRef}
              defaultValue={user.store_name}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">القسم</label>
            <select
              ref={storeCatRef}
              defaultValue={user.store_category_id}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">اختر قسماً</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">رقم الهاتف</label>
            <input
              ref={phoneRef}
              defaultValue={user.phone}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">العنوان</label>
            <input
              ref={addressRef}
              defaultValue={user.address}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">شعار المتجر</label>
            <input
              type="file"
              ref={logoRef}
              accept="image/png, image/jpeg, image/webp"
              onChange={handleLogoPreview}
              className="w-full border border-gray-300 rounded-lg p-2 file:mr-2 file:py-1 file:px-3 file:border-0 file:bg-blue-600 file:text-white file:rounded"
            />
            {logoPreview && (
              <img
                src={logoPreview}
                className="w-32 h-32 object-contain mt-2 ml-auto"
              />
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              {loading ? "جارٍ الحفظ..." : "حفظ"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
