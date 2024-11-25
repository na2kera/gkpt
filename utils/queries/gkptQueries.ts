import { supabase } from "../../lib/supabaseClient";

type GkptPost = {
  uuid: string;
  good: string;
  keep: string;
  problem: string;
  action: string;
  comment: string;
};

export const getGkpts = async () => {
  const { data, error } = await supabase.from("Gkpts").select("*");
  return { data, error };
};

export const postGkpt = async (gkpt: GkptPost) => {
  const { data, error } = await supabase.from("Gkpts").insert(gkpt).select();
  return { data, error };
};
