import React, { use, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box } from "@mui/material";

type Post = {
  email: string;
  good: string;
  keep: string;
  problem: string;
  action: string;
  comment: string;
  user: { email: string; name: string; image: string };
};

const MyPage = () => {
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
        signed in as {session.user?.name} <br />
        {session.user?.email}
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            width={50}
            height={50}
          />
        )}
        <button onClick={() => signOut()}>Sign out</button>
        <div>
          {posts.map((post, index) => (
            <div key={index}>
              <h3>{post.good}</h3>
              <p>{post.action}</p>
              <p>{post.user.name}</p>
              <img
                src={post.user.image}
                alt="User Avatar"
                width={50}
                height={50}
              />
              <br />
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default MyPage;
