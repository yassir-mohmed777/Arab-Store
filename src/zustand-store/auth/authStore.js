// import { create } from "zustand";
// import { supabase } from "../../supabaseClient";

// const useAuth = create((set) => ({
//   user: null,
//   isLoading: true,

//   setUser: (user) => set({ user }),

//   fetchUser: async () => {
//     set({ isLoading: true });

//     // الحصول على الجلسة
//     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
//     const session = sessionData?.session;

//     if (sessionError || !session?.user?.id) {
//       console.error("Error getting session:", sessionError);
//       set({ user: null, isLoading: false });
//       return;
//     }

//     const userId = session.user.id;
//     const email = session.user.email;
//     const full_name = session.user.user_metadata.full_name;


//     // جلب أو إنشاء المستخدم باستخدام upsert
//     const { data: userData, error: userError } = await supabase
//       .from("users")
//       .upsert(
//         [
//           {
//             id: userId,
//             full_name,
//             email,
//             user_type: "customer", // القيمة الافتراضية، عدل حسب الحاجة
//           },
//         ],
//         { onConflict: "id" }
//       )
//       .select("*, store_categories(name)")
//       .single();

//     if (userError) {
//       console.error("Error fetching or upserting user:", userError);
//       set({ user: null, isLoading: false });
//       return;
//     }

//     set({ user: userData, isLoading: false });
//   },

//  logout: async () => {
//   const { error } = await supabase.auth.signOut();
//   if (error) {
//     console.error("Logout error:", error);
//   }
//   // الحالة سيتم مسحها من خلال onAuthStateChange
// },
// }));

// // ✅ الاستماع لتغير حالة الدخول
// supabase.auth.onAuthStateChange(async (event, session) => {
//   if (event === "SIGNED_IN" && session?.user) {
//     useAuth.getState().fetchUser();
//   } else if (event === "SIGNED_OUT") {
//     // فقط امسح بيانات المستخدم من الواجهة
//     useAuth.setState({ user: null, isLoading: false });
//   }
// });

// export default useAuth;

import { create } from "zustand";
import { supabase } from "../../supabaseClient";

const useAuth = create((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
    set({ user });
  },

fetchUser: async () => {
  set({ isLoading: true });

  // تحقق من الكاش أولاً
  const cached = sessionStorage.getItem("user");
  if (cached) {
    const parsed = JSON.parse(cached);
    set({ user: parsed, isLoading: false });
    return;
  }

  // جلب الجلسة
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (sessionError || !session?.user?.id) {
    console.error("Error getting session:", sessionError);
    set({ user: null, isLoading: false });
    return;
  }

  const userId = session.user.id;
  const email = session.user.email;
  const full_name = session.user.user_metadata.full_name;

  // **اجلب المستخدم من قاعدة البيانات أولاً**
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // مثلا خطأ غير "لم يتم العثور"
    console.error("Error fetching user:", fetchError);
    set({ user: null, isLoading: false });
    return;
  }

  let upsertData;

  if (!existingUser) {
    // المستخدم غير موجود: أنشئ بيانات جديدة مع user_type افتراضي
    upsertData = {
      id: userId,
      email,
      user_type: "customer",
    };
    if (full_name) upsertData.full_name = full_name;
  } else {
    // المستخدم موجود: لا تغير user_type، ولكن حدث بيانات أخرى مثل full_name أو email إذا تريد
    upsertData = {
      id: userId,
      email,
      full_name: full_name || existingUser.full_name,
      user_type: existingUser.user_type,
    };
  }

  // تنفيذ upsert
  const { data: upsertedUser, error: userError } = await supabase
    .from("users")
    .upsert([upsertData], { onConflict: "id" })
    .select("*")
    .single();

  if (userError || !upsertedUser) {
    console.error("Error during upsert:", userError);
    set({ user: null, isLoading: false });
    return;
  }

  let finalUserData = upsertedUser;

  // إذا كان المستخدم من نوع store، اجلب العلاقات الإضافية
  if (upsertedUser.user_type === "store") {
    const { data: storeUser, error: storeError } = await supabase
      .from("users")
      .select("*, store_categories(name)")
      .eq("id", userId)
      .single();

    if (storeError) {
      console.error("Error fetching store relations:", storeError);
    } else {
      finalUserData = storeUser;
    }
  }

  sessionStorage.setItem("user", JSON.stringify(finalUserData));
  set({ user: finalUserData, isLoading: false });
},



  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    }
    // سيتم مسح الحالة من خلال onAuthStateChange
  },
}));

// 🧠 الاستماع لتغير حالة الدخول والخروج
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === "SIGNED_IN" && session?.user) {
    useAuth.getState().fetchUser();
  } else if (event === "SIGNED_OUT") {
    sessionStorage.removeItem("user");
    useAuth.setState({ user: null, isLoading: false });
  }
});

export default useAuth;

