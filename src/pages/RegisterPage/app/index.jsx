import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import StoreFields from "../Componant/StoreFields";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { toast } from "react-toastify";
import { useState } from "react";

const passwordRegex = /^.{6,}$/;
const validationSchema = Yup.object({
  fullName: Yup.string().required("الاسم مطلوب"),
  phone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(
      /^\+1\d{10}$/,
      "رقم الهاتف يجب أن يبدأ بـ +1 ويحتوي على 10 أرقام بعده"
    ),
  email: Yup.string().email("بريد إلكتروني غير صالح").required("الايميل مطلوب"),
  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .matches(
      passwordRegex,
      "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل،."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
  userType: Yup.string().required("نوع المستخدم مطلوب"),
storeCategory: Yup.string().when("userType", {
  is: "store",
  then: (schema) => schema.required("القسم مطلوب"),
  otherwise: (schema) => schema.notRequired(),
}),
  storeName: Yup.string().when("userType", {
    is: "store",
    then: (schema) => schema.required("اسم المتجر مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  storeLogo: Yup.mixed().when("userType", {
  is: "store",
  then: (schema) =>
    schema
      .required("شعار المتجر مطلوب")
      .test(
        "fileType",
        "يجب أن يكون الملف صورة (png, jpg, jpeg)",
        (value) => {
          if (!value) return false; // مطلوب
          const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
          return allowedTypes.includes(value.type);
        }
      ),
  otherwise: (schema) => schema.notRequired(),
}),

});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const hundleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    toast.info("جاري إنشاء الحساب، الرجاء الانتظار...");
    try {
      // 1. تسجيل المستخدم بالبريد وكلمة المرور
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      const userId = authData.user.id;

      // 2. إذا كان نوع المستخدم "store"، نرفع الشعار
      let store_logo_url = null;
      if (values.userType === "store" && values.storeLogo) {
        const fileExt = values.storeLogo.name.split(".").pop();
        const filePath = `store-logos/${userId}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("store-logos")
          .upload(filePath, values.storeLogo);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("store-logos")
          .getPublicUrl(filePath);

        store_logo_url = publicUrlData.publicUrl;
      }

      // 3. تخزين البيانات في جدول users
      const { error: insertError } = await supabase.from("users").insert({
        id: userId,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        user_type: values.userType,
        store_name: values.storeName,
        store_category_id: values.storeCategory,
        store_logo_url,
      });

      if (insertError) throw insertError;

      toast.success("تم التسجيل بنجاح! الرجاء التحقق من بريدك الإلكتروني.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error.message);
      toast.warning("فشل في التسجيل: " + error.message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 text-black flex items-center justify-center py-10 px-4">
      <div
        className="w-full max-w-4xl bg-white shadow rounded-2xl p-6"
        data-theme="light"
      >
        <h1 className="text-center text-2xl font-bold mb-6">تسجيل حساب جديد</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            userType: "customer",
            address: "",
            storeCategory: "",
            storeName: "",
            storeLogo: null,
          }}
          onSubmit={hundleSubmit}
        >
          <Form
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
              loading ? "pointer-events-none opacity-60" : ""
            }`}
          >
            {/* باقي الحقول كما هي */}
            <div>
              <label>الاسم بالكامل</label>
              <Field
                type="text"
                name="fullName"
                className="input w-full text-black border p-2 rounded"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label>الايميل</label>
              <Field
                type="text"
                name="email"
                className="input w-full text-black border p-2 rounded"
                placeholder="Ahmed123@icloud.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label>رقم الهاتف</label>
              <Field
                type="text"
                name="phone"
                className="input w-full text-black border p-2 rounded"
                placeholder="1xxxxxxxxxx+"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label>العنوان</label>
              <Field
                type="text"
                name="address"
                className="input w-full text-black border p-2 rounded"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label>كلمة المرور</label>
              <Field
                type="password"
                name="password"
                className="input w-full text-black border p-2 rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label>تأكيد كلمة المرور</label>
              <Field
                type="password"
                name="confirmPassword"
                className="input w-full text-black border p-2 rounded"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label>نوع المستخدم</label>
              <Field
                as="select"
                name="userType"
                className="input w-1/3 border p-2 rounded"
              >
                <option value="customer">عميل</option>
                <option value="store">متجر</option>
              </Field>
              <ErrorMessage
                name="userType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* الحقول الخاصة بالمتجر تظهر فقط إذا اختار المستخدم متجر */}
            <StoreFields />

            {/* زر التسجيل */}
            <div className="md:col-span-2 flex justify-center pt-4">
              <button
                type="submit"
                className="btn btn-primary w-1/3"
                disabled={loading}
              >
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                تسجيل
              </button>
            </div>
          </Form>
        </Formik>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-gray-500 hover:underline">
            لديك حساب؟ اذهب الى تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
