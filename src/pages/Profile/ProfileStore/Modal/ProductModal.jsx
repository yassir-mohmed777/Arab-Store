import { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useProductForm } from "../hooks/useProductForm";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageInputRef = useRef(null);
  const discountRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const {
    imageFile,
    setImageFile,
    imagePreview,
    setImagePreview,
    colors,
    newColor,
    setNewColor,
    sizes,
    newSize,
    setNewSize,
    uploadImageToSupabase,
    handleAddColor,
    handleRemoveColor,
    handleAddSize,
    handleRemoveSize,
  } = useProductForm(initialData, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      if (discountRef.current)
        discountRef.current.value = initialData.discounted_price || "";
      if (nameRef.current) nameRef.current.value = initialData.name || "";
      if (priceRef.current) priceRef.current.value = initialData.price || "";
      if (stockRef.current) stockRef.current.value = initialData.stock || "";
      if (descriptionRef.current)
        descriptionRef.current.value = initialData.description || "";
      if (imageInputRef.current) imageInputRef.current.value = null;
    } else {
      if (discountRef.current) discountRef.current.value = "";
      if (nameRef.current) nameRef.current.value = "";
      if (priceRef.current) priceRef.current.value = "";
      if (stockRef.current) stockRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = null;
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const image_url = await uploadImageToSupabase();
    if (!image_url) {
      alert("حدث خطأ أثناء رفع الصورة");
      setUploading(false);
      return;
    }

    const raw = discountRef.current?.value ?? "";
    const discounted_price = raw !== "" ? parseFloat(raw) : null;

    const productData = {
    name: nameRef.current.value,
    price: parseFloat(priceRef.current.value) || 0,
    stock: parseInt(stockRef.current.value, 10) || 0,
    description: descriptionRef.current.value,
    image_url,
    colors,
    sizes,
    discounted_price,
  };

    await onSubmit(productData);
    setUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-3 w-full sm:w-3/4 md:w-1/2 max-h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-2">
          {initialData ? "تعديل المنتج" : "إضافة منتج جديد"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-1">
          {/* الاسم والسعر والعروض والمخزون */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 font-medium">اسم المنتج</label>
              <input
                ref={nameRef}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">السعر</label>
              <input
                type="number"
                ref={priceRef}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            {/* عرض السعر */}
            <div>
              <label className="block mb-1 text-sm">
                عرض على السعر (اختياري)
              </label>
              <input
                type="number"
                ref={discountRef}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">المخزون</label>
              <input
                type="number"
                ref={stockRef}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>

          {/* الوصف */}
          <div>
            <label className="block mb-1 font-medium">الوصف</label>
            <textarea
              ref={descriptionRef}
              className="border border-gray-300 rounded-lg p-2 w-full resize-none h-24"
            />
          </div>

          {/* المقاسات */}
          <div>
            <label className="block mb-1 font-medium">المقاسات المتوفرة</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="مثال: S أو M,L,XL"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, idx) => (
                <span
                  key={idx}
                  onClick={() => handleRemoveSize(size)}
                  className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-red-200"
                  title="اضغط لإزالة"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* الصورة + الألوان */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* الصورة */}
            <div>
              <label className="block mb-1 font-medium">صورة المنتج</label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="معاينة"
                  className="w-28 h-24 object-cover mt-3 rounded-lg shadow border"
                />
              )}
            </div>

            {/* الألوان */}
            <div>
              <label className="block mb-1 font-medium">الألوان المتوفرة</label>
              <ChromePicker
                color={newColor}
                onChange={(color) => setNewColor(color.hex)}
                disableAlpha
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="mt-2 bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
              >
                إضافة اللون
              </button>
              <div className="flex flex-wrap gap-2 mt-3">
                {colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full border relative cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => handleRemoveColor(color)}
                    title="اضغط لإزالة اللون"
                  >
                    <span className="absolute -top-2 -right-2 text-red-600 font-bold">
                      ×
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {uploading
              ? "جارٍ الحفظ..."
              : initialData
              ? "تحديث المنتج"
              : "إضافة المنتج"}
          </button>
        </form>
      </div>
    </div>
  );
}
