import Auth from "./components/Auth";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

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

        <div className="fixed bottom-12 right-12">
          <Link href="/createPost">
            <Fab color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          </Link>
        </div>
        <div>
          {posts.map((post, index) => (
            <Card key={index} sx={{ maxWidth: 600 }}>
              {post.user?.image ? (
                <CardHeader
                  avatar={<Avatar src={post.user.image}></Avatar>}
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
    </>
  );
}
