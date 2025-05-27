import { useFormikContext, Field, ErrorMessage } from "formik";

export default function StoreFields() {
  const { values, setFieldValue } = useFormikContext();

  return values.userType === "store" ? (
    <>
      <div>
        <label> اسم المتجر</label>
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

      <div>
        <label>نوع النشاط</label>
        <Field
          type="text"
          name="businessType"
          className="input w-full text-black border p-2 rounded"
        />
        <ErrorMessage
          name="businessType"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label>شعار المتجر</label>
        <input
          type="file"
          name="storeLogo"
          accept="image/*"
          className="input w-full border p-2 rounded"
          onChange={(e) => {
            setFieldValue("storeLogo", e.currentTarget.files[0]);
          }}
        />
        <ErrorMessage
          name="storeLogo"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </>
  ) : null;
}
