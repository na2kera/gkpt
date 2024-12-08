import { fetchGkpts } from "../../utils/fetcher/fetchGkpts";
import Top from "./components/Top";

type Props = {
  data: { data: Post[]; error: any };
};

export default function Home({ data }: Props) {
  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  return <Top posts={data.data} />;
}

export async function getServerSideProps() {
  const data = await fetchGkpts();
  return { props: { data } };
}
