import React from "react";
import IndividualPage from "./components/IndividualPage";

type Props = {
  data: { data: Post[]; error: any };
};

export default function Uuid({ data }: Props) {
  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  return <IndividualPage data={data.data} />;
}

export async function getServerSideProps({
  params,
}: {
  params: { uuid: string };
}) {
  const uuid = params.uuid;
  const res = await fetch(`${process.env.URL}/api/gkpt/${uuid}`);
  const data = await res.json();

  return { props: { uuid, data } };
}
