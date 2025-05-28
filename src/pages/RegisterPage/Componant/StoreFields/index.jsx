import { useFormikContext, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { supabase } from "../../../../supabaseClient";

export default function StoreFields() {
  const { values, setFieldValue } = useFormikContext();
  const [fileName, setFileName] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("store_categories")
        .select("id, name");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (values.storeLogo) {
      if (typeof values.storeLogo === "string") {
        setFileName(values.storeLogo.split("/").pop());
      } else if (values.storeLogo.name) {
        setFileName(values.storeLogo.name);
      }
    } else {
      setFileName(null);
    }
  }, [values.storeLogo]);

  if (values.userType !== "store") return null;

  return (
    <>
      <div>
        <label>اسم المتجر</label>
        <Field
          type="text"
          name="storeName"
          className="input w-full text-black border p-2 rounded"
        />
        <ErrorMessage
          name="storeName"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* غيرت الاسم إلى storeCategory لأنه تم استخدامه في الفورم */}
      <div className="flex flex-col">
        <label>القسم</label>
        <Field
          as="select"
          name="storeCategory"
          className="input w-full border p-2 rounded"
        >
          <option value="">اختر القسم</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="storeCategory"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label>شعار المتجر</label>
        <input
          type="file"
          name="storeLogo"
          accept="image/png, image/jpeg, image/jpg"
          className="input w-full border p-2 rounded"
          onChange={(e) => {
            setFieldValue("storeLogo", e.currentTarget.files[0]);
          }}
        />
        {fileName && (
          <div className="flex items-center mt-1 gap-2">
            <span className="text-gray-700 text-sm truncate max-w-xs">
              {fileName}
            </span>
            <button
              type="button"
              onClick={() => setFieldValue("storeLogo", null)}
              className="text-red-600 hover:text-red-800 text-sm font-semibold"
              title="مسح الملف"
            >
              ×
            </button>
          </div>
        )}
        <ErrorMessage
          name="storeLogo"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </>
  );
}
