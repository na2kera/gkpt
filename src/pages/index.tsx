import Image from "next/image";
import { Inter } from "next/font/google";
import Auth from "./components/Auth";
import EditIcon from "@mui/icons-material/Edit";
import { Fab } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Post = {
  email: string;
  good: string;
  keep: string;
  problem: string;
  action: string;
  comment: string;
  user: { email: string; name: string; image: string };
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await fetch("/api/getUsersPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (Array.isArray(data.data)) {
        setPosts(data.data);
      } else {
        setPosts([]);
      }
    };
    getUserPosts();
  }, [session]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <Auth />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link href="/createPost">
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </div>
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <h3>{post.good}</h3>
            <p>{post.action}</p>

            <br />
          </div>
        ))}
      </div>
    </main>
  );
}
