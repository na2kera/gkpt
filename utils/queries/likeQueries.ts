import { supabase } from "../../lib/supabaseClient";

export const postLike = async (gkpt_id: string, liked_by_user_id: string) => {
  const { data, error } = await supabase
    .from("Likes")
    .upsert(
      { gkpt_id: gkpt_id, liked_by_user_id: liked_by_user_id },
      { onConflict: "gkpt_id,liked_by_user_id" }
    )
    .select()
    .single();
  return { data, error };
};
