import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

type User = {
  name: string;
  email: string;
  image: string;
};

type ResponseData = {
  data: User[] | null;
  error: any;
};

export default async function savaUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }

  const { name, email, image } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .upsert({ name, email, image }, { onConflict: "email" })
    .select();

  if (error) {
    console.error("error:", error);
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
