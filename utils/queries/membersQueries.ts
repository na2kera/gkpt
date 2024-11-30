import { supabase } from "../../lib/supabaseClient";

type MemberInfo = {
  uuid: string;
  name: string;
  avatar: string;
};

export const postMember = async (memberInfo: MemberInfo) => {
  const { data, error } = await supabase
    .from("Members")
    .upsert(
      { id: memberInfo.uuid, name: memberInfo.name, avatar: memberInfo.avatar },
      { onConflict: "id" }
    )
    .select();
  return { data, error };
};
