import { supabase } from "../../lib/supabaseClient";

export const postFollow = async (
  follow_user_id: string,
  follower_user_id: string
) => {
  const { data, error } = await supabase
    .from("Follows_Followers")
    .insert({ follow_user_id, follower_user_id })
    .select()
    .single();
  return { data, error };
};
