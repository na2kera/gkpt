import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Fab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import Post from "./api/post";
import PostCard from "./components/PostCard";

type Post = {
  id: number;
  email: string;
  good: string;
  keep: string;
  problem: string;
  action: string;
  comment: string;
  created_at: string;
  user: { email: string; name: string; image: string };
};

const MyPage = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await fetch("/api/getUserPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      const data = await res.json();
      if (Array.isArray(data.data)) {
        setPosts(data.data);
      } else {
        setPosts([]);
      }
      console.log(data.data);
      console.log(session?.user?.email);
    };
    getUserPosts();
  }, [session]);

  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  if (session) {
    return (
      <>
        <div className="absolute top-10 right-8 flex row">
          {session.user?.image && <Avatar src={session.user.image}></Avatar>}
          <div className="px-4 flex items-center font-bold">
            {session.user?.name}
          </div>
        </div>
        <div
          className={`flex min-h-screen flex-col items-center justify-between p-24`}
        >
          <div>
            {posts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </div>
        </div>
        <Link className="fixed left-4 bottom-4" href="/">
          <Fab color="secondary" aria-label="edit">
            <HomeIcon />
          </Fab>
        </Link>
      </>
    );
  }
};

export default MyPage;
