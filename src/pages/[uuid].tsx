import React from "react";

export default function Uuid({ uuid }: { uuid: string }) {
  return <div>{uuid}</div>;
}

export async function getServerSideProps({
  params,
}: {
  params: { uuid: string };
}) {
  const uuid = params.uuid;

  return { props: { uuid } };
}
