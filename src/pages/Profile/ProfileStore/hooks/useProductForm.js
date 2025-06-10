import { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";

export function useProductForm(initialData, isOpen) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || "");
  
  const [colors, setColors] = useState(initialData?.colors || []);
  const [newColor, setNewColor] = useState("#000000");

  const [sizes, setSizes] = useState(initialData?.sizes || []);
  const [newSize, setNewSize] = useState("");

  // تحديث الحالة عند فتح المودال أو تغير البيانات الابتدائية
  useEffect(() => {
    if (!isOpen) return;

    setImagePreview(initialData?.image_url || "");
    setImageFile(null);

    setColors(initialData?.colors || []);
    setNewColor("#000000");

    setSizes(initialData?.sizes || []);
    setNewSize("");
  }, [initialData, isOpen]);

  // رفع الصورة إلى Supabase
  const uploadImageToSupabase = async () => {
    if (!imageFile) return imagePreview;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("products-images")
      .upload(filePath, imageFile);

    if (error) {
      console.error("خطأ أثناء رفع الصورة:", error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("products-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // دوال ألوان
  const handleAddColor = () => {
    if (!colors.includes(newColor)) {
      setColors([...colors, newColor]);
    }
  };
  const handleRemoveColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  // دوال مقاسات
  const handleAddSize = () => {
    const entries = newSize
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const uniqueNewSizes = entries.filter((s) => !sizes.includes(s));

    if (uniqueNewSizes.length > 0) {
      setSizes([...sizes, ...uniqueNewSizes]);
      setNewSize("");
    }
  };
  const handleRemoveSize = (sizeToRemove) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  return {
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
  };
}
