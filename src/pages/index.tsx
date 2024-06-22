import Auth from "./components/Auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PostIcon from "./components/PostIcon";
import PostCard from "./components/PostCard";

// type Post = {
//   id: number;
//   email: string;
//   good: string;
//   keep: string;
//   problem: string;
//   action: string;
//   comment: string;
//   created_at: string;
//   user: { email: string; name: string; image: string };
// };

export default function Home() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const saveUser = async () => {
      if (session?.user) {
        await fetch("/api/saveUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }),
        });
      }
    };
    saveUser();
  }, [session]);

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
    <>
      <div
        className={`flex min-h-screen flex-col items-center justify-between p-24 `}
      >
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Auth />
        </div>
        <PostIcon />
        <div>
          {posts.map((post, index) => (
            <>
              <PostCard post={post} key={index} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
