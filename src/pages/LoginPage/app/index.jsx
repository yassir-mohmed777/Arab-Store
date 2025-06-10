import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../zustand-store/auth/authStore";


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    const { email, password } = values;

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("email not confirmed")) {
        toast.warning("يرجى تأكيد بريدك الإلكتروني عبر الرابط المرسل إليك.");
      } else if (msg.includes("invalid login credentials")) {
        toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else {
        toast.error("فشل تسجيل الدخول: " + error.message);
      }
      setLoading(false);
      return;
    }

    // جلب بيانات المستخدم من جدول users حسب id
  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select(`
      *,
      store_categories (
        name
      )
    `)
    .eq("id", data.user.id)
    .single();

    if (profileError) {
      toast.error("حدث خطأ في جلب بيانات المستخدم");
      setLoading(false);
      return;
    }

    // تخزين بيانات المستخدم في Zustand
    setUser(userProfile);

    // التوجيه حسب نوع المستخدم
    if (userProfile.user_type === "store") {
      navigate("/profile/store");
    } else {
      navigate("/profile/customer");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });
    if (error) toast.error("فشل تسجيل الدخول عبر Google: " + error.message);
  };

  return (
    <div
      className="min-h-screen bg-gray-400 flex items-center justify-center p-4"
      data-theme="light"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 text-right">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          تسجيل الدخول
        </h3>

        <Formik
          validationSchema={validationSchema}
          onSubmit={handleLogin}
          initialValues={{ email: "", password: "" }}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <Field
                name="email"
                className="input w-full text-black border p-2 rounded"
                placeholder="أدخل بريدك الإلكتروني"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <Field
                name="password"
                type="password"
                className="input w-full text-black border p-2 rounded"
                placeholder="أدخل كلمة المرور"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              تسجيل الدخول
            </button>
          </Form>
        </Formik>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            تسجيل الدخول باستخدام Google
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to="/register" className="text-sm text-gray-500 hover:underline">
            مستخدم جديد؟ أنشئ حسابك الآن
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
