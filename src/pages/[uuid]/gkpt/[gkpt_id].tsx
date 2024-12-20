import React from "react";
import { getGkpt } from "../../../../utils/queries/gkptQueries";
import PostCard from "@/pages/components/PostCard";
import { Box } from "@mui/material";

type Props = {
  data: { data: Post; error: any };
};

export default function Gkpt({ data }: Props) {
  if (data.error) {
    return <div>Error: {data.error.message}</div>;
  }

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <PostCard post={data.data} />
    </Box>
  );
}

export async function getServerSideProps(context: {
  query: { gkpt_id: string };
}) {
  const data = await getGkpt(context.query.gkpt_id);
  return { props: { data } };
}
