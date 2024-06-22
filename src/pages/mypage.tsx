import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Box, Fab } from "@mui/material";
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
        <Box
          position={"absolute"}
          display={"flex"}
          flexDirection={"row"}
          top={20}
          right={12}
        >
          {session.user?.image && <Avatar src={session.user.image}></Avatar>}
          <Box
            px={2}
            display={"flex"}
            alignItems={"center"}
            fontWeight={"bold"}
          >
            {session.user?.name}
          </Box>
        </Box>
        <Box
          display="flex"
          minHeight="100vh"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          p={6}
        >
          <Box>
            {posts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </Box>
        </Box>
        <Link className="fixed left-4 bottom-4" href="/">
          <Fab color="secondary" aria-label="home">
            <HomeIcon />
          </Fab>
        </Link>
      </>
    );
  }
};

export default MyPage;
