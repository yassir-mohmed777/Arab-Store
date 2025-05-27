import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

export default function UserInfoModal({ onClose }) {
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef();
  const phoneRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const full_name = fullNameRef.current.value;
    const phone = phoneRef.current.value;

    if (!full_name || !phone) {
      toast.error("يرجى تعبئة جميع الحقول");
      setLoading(false);
      return;
    }
    
    const { error } = await supabase
      .from("users")
      .update({
        full_name,
        phone,
      })
      .eq("id", user.id);

    if (error) {
      toast.error("حدث خطأ أثناء تحديث البيانات");
    } else {
      toast.success("تم تحديث بيانات الحساب بنجاح");
      onClose();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full relative">
        <h2 className="text-xl font-bold mb-4">تعديل البيانات الشخصية</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">الاسم الكامل</label>
            <input
              ref={fullNameRef}
              defaultValue={user.full_name}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block">رقم الهاتف</label>
            <input
              ref={phoneRef}
              defaultValue={user.phone}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "جارٍ الحفظ..." : "حفظ"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              إلغاء
            </button>
          </div>
        </form>

        {/* زر إغلاق في الزاوية */}
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
