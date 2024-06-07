import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

type User = {
  did: string;
  name: string;
  email: string;
  image: string;
};

type ResponseData = {
  data: User[] | null;
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }

  const { id, name, email, image } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .insert([req.body])
    .select();

  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
