import { useState, useEffect } from "react";

export default function ProductModal({ isOpen, onClose, mode, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price || "");
      setDescription(initialData.description || "");
      setImagePreview(initialData.imageUrl || "");
      setImageFile(null); // نفرض إنه ما في صورة مرفوعة جديدة لسه
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      setImagePreview("");
    }
  }, [mode, initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // نحفظ الصورة كـ URL فقط مؤقتًا (يمكن لاحقًا ترفعها لـ Supabase أو سيرفر)
    const productData = {
      name,
      price,
      description,
      imageUrl: imageFile ? imagePreview : imagePreview,
    };
    onSubmit(productData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          {mode === "add" ? "إضافة منتج جديد" : "تعديل المنتج"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">اسم المنتج</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">السعر</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">الوصف</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full resize-none h-24"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">صورة المنتج</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-2 file:mr-2 file:py-1 file:px-3 file:border-0 file:bg-blue-600 file:text-white file:rounded"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="معاينة"
                className="w-24 h-24 object-cover mt-3 rounded-lg shadow border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {mode === "add" ? "إضافة المنتج" : "تحديث المنتج"}
          </button>
        </form>
      </div>
    </div>
  );
}
