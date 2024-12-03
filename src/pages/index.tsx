import Top from "./components/Top";

type Props = {
  data: { data: Post[]; error: any };
};

export default function Home({ data }: Props) {
  return !data.error && <Top posts={data.data} />;
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.URL}/api/gkpt`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return { props: { data } };
}
