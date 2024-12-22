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
  const { data, error } = await supabase
    .from("Gkpts")
    .select(
      `
    id,
    created_at,
    uuid,
    Members (
      id,
      name,
      avatar
    ),
    good,
    keep,
    problem,
    action,
    comment
    `
    )
    .order("created_at", { ascending: false });
  return { data, error };
};

export const getGkpt = async (id: string) => {
  const { data, error } = await supabase
    .from("Gkpts")
    .select(
      `
      id,
      created_at,
      uuid,
      Members (
        id,
        name,
        avatar
      ),
      good,
      keep,
      problem,
      action,
      comment
    `
    )
    .eq("id", id)
    .single();
  return { data, error };
};

export const deleteGkpt = async (id: string) => {
  const { data, error } = await supabase
    .from("Gkpts")
    .delete()
    .eq("id", id)
    .single();
  return { data, error };
};

export const getIndividualGkpts = async (uuid: string) => {
  const { data, error } = await supabase
    .from("Gkpts")
    .select(
      `
    id,
    created_at,
    uuid,
    Members (
      id,
      name,
      avatar
    ),
    good,
    keep,
    problem,
    action,
    comment
    `
    )
    .eq("uuid", uuid)
    .order("created_at", { ascending: false });
  return { data, error };
};

export const postGkpt = async (gkpt: GkptPost) => {
  const { data, error } = await supabase.from("Gkpts").insert(gkpt).select();
  return { data, error };
};
