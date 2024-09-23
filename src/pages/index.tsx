import Auth from "./components/Auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PostIcon from "./components/PostIcon";
import { Box } from "@mui/material";
import PostCards from "./components/PostCards";

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
    <>
      <Box
        position={"fixed"}
        sx={{
          width: "100%",
          alignItems: "end",
          justifyContent: "center",
          background: "linear-gradient(to top, white, white)",
          backgroundColor: "white",
        }}
      >
        <Auth />
      </Box>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px",
        }}
      >
        <PostIcon />
        <Box>
          <PostCards posts={posts} />
        </Box>
      </Box>
    </>
  );
}
