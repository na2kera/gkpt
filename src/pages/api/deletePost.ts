import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async function deletePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  if (req.method !== "DELETE") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }

  const { data, error } = await supabase.from("Posts").delete().eq("id", id);

  if (error) {
    res.status(500).json({ data: null, error });
    return;
  }

  res.status(200).json({ data, error });
}
