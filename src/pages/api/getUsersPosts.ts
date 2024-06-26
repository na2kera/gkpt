import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

// type User = {
//   name: string;
//   email: string;
//   image: string;
// };

type Post = {
  id: number;
  email: string;
  good: string;
  keep: string;
  problem: string;
  action: string;
  comment: string;
  created_at: string;
};

type ResponseData = {
  data: Post[] | null;
  error: any;
};

export default async function getUsersPosts(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }

  const { data: posts, error: postError } = await supabase
    .from("Posts")
    .select("id, email, good, keep, problem, action, comment, created_at");

  if (postError) {
    res.status(500).json({ data: null, error: postError });
    return;
  }

  const { data: users, error: userError } = await supabase
    .from("Users")
    .select("name, email, image")
    .in(
      "email",
      posts.map((post: any) => post.email)
    );

  if (userError) {
    res.status(500).json({ data: null, error: userError });
    return;
  }
  //ユーザーとemailの対応を作成
  const userMap = users.reduce((acc: any, user: any) => {
    acc[user.email] = user;
    return acc;
  }, {});

  const reversedPosts = posts.reverse();

  const result = reversedPosts.map((post: any) => ({
    ...post,
    user: userMap[post.email],
  }));

  res.status(200).json({ data: result, error: null });
}
