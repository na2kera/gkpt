import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

//TODO: ユーザー名入れる、コンポーネント化
type Post = {
  email: string;
  good: string;
  keep: string;
  problem: string;
  action: string;
  comment: string;
  imageUrl: string;
};

type ResponseData = {
  data: Post[] | null;
  error: any;
};

export default async function Post(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }

  const { email, good, keep, problem, action, comment, imageUrl } = req.body;

  if (!email) {
    res.status(400).json({ data: null, error: "Missing required fields" });
    return;
  }

  const { data, error } = await supabase
    .from("Posts")
    .insert([req.body])
    .select();

  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
