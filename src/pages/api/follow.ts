import { NextApiRequest, NextApiResponse } from "next";
import { postFollow } from "../../../utils/queries/followQueries";

type FollowPost = {
  follow_user_id: string;
  follower_user_id: string;
};

type ResponseData = {
  data: FollowPost | null;
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

  const follow_user_id = req.body.follow_user_id;
  const follower_user_id = req.body.follower_user_id;

  if (!follow_user_id || !follower_user_id) {
    res.status(400).json({ data: null, error: "Missing required fields" });
    return;
  }

  const { data, error } = await postFollow(follow_user_id, follower_user_id);

  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
