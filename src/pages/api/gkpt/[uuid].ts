import { NextApiRequest, NextApiResponse } from "next";
import { getIndividualGkpts } from "../../../../utils/queries/gkptQueries";

type Members = {
  id: string;
  name: string;
  avatar: string;
};

type GkptPost = {
  uuid: string;
  id: string;
  Members: Members[];
  good: string;
  keep: string;
  problem: string;
  action: string;
  comment: string;
};

type ResponseData = {
  data: GkptPost[] | null;
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    default:
      res.status(405).json({ data: null, error: "Method Not Allowed" });
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "GET") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }
  const { data, error } = await getIndividualGkpts(req.query.uuid as string);
  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
