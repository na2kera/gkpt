import { NextApiRequest, NextApiResponse } from "next";
import { getGkpts } from "../../../utils/queries/gkptQueries";
import { postMember } from "../../../utils/queries/membersQueries";

type MemberInfo = {
  uuid: string;
  name: string;
  avatar: string;
};

type ResponseData = {
  data: MemberInfo[] | null;
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

  const memberInfo = req.body;

  if (!memberInfo.uuid) {
    res.status(400).json({ data: null, error: "Missing required fields" });
    return;
  }

  const { data, error } = await postMember(memberInfo);

  if (error) {
    res.status(500).json({ data: null, error });
  } else {
    res.status(200).json({ data, error: null });
  }
}
