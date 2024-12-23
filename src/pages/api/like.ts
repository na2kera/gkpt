import { NextApiRequest, NextApiResponse } from "next";
import { postLike } from "../../../utils/queries/likeQueries";

type LikePost = {
  gkpt_id: string;
  liked_by_user_id: string;
};

type ResponseData = {
  data: LikePost | null;
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "POST":
      return await POST(req, res);
    default:
      res.status(405).json({ data: null, error: "Method Not Allowed" });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }

  const gkpt_id = req.body.gkpt_id;
  const liked_by_user_id = req.body.liked_by_user_id;

  if (!gkpt_id || !liked_by_user_id) {
    res.status(400).json({ data: null, error: "Missing required fields" });
    return;
  }

  const { data, error } = await postLike(gkpt_id, liked_by_user_id);

  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
