import React, { use, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

type Post = {
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
              <Card sx={{ maxWidth: 600 }}>
                {post.user?.image ? (
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={post.user.image}
                      ></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post.user.name}
                    subheader={post.created_at}
                  />
                ) : (
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                )}

                <CardContent>
                  <Typography variant="h6">good</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.good}
                  </Typography>
                  <Typography variant="h6">keep</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.keep}
                  </Typography>
                  <Typography variant="h6">problem</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.problem}
                  </Typography>
                  <Typography variant="h6">try</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.action}
                  </Typography>
                  <Typography variant="h6">ひとこと</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.comment}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
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
