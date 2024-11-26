import { NextApiRequest, NextApiResponse } from "next";
import { getGkpts, postGkpt } from "../../../utils/queries/gkptQueries";

type GkptPost = {
  uuid: string;
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

  const gkpt = req.body;

  if (!gkpt.uuid) {
    res.status(400).json({ data: null, error: "Missing required fields" });
    return;
  }

  const { data, error } = await postGkpt(gkpt);

  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "GET") {
    res.status(405).json({ data: null, error: "Method Not Allowed" });
    return;
  }
  const { data, error } = await getGkpts();
  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
