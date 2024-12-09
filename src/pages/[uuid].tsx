import React from "react";
import IndividualPage from "./components/IndividualPage";
import { fetchIndividualGkpts } from "../../utils/fetcher/fetchGkpts";

type Props = {
  data: { data: Post[]; error: any };
};

export default function Uuid({ data }: Props) {
  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  return <IndividualPage posts={data.data} />;
}

export async function getServerSideProps({
  params,
}: {
  params: { uuid: string };
}) {
  const uuid = params.uuid;
  const data = await fetchIndividualGkpts(uuid);

  return { props: { data } };
}
