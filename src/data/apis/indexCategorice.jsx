import { supabase } from "../../supabaseClient";

export const indexCategorice = async () => {
  let final = [];

  try {
    const { data, error } = await supabase
      .from("store_categories")
      .select("*");

    if (error) throw error;

    final = data;
    console.log(data);
  } catch (error) {
    console.error("فشل في جلب الأقسام:", error);
  }

  return final;
};