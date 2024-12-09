import { Avatar, Box, Fab, Link } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import PostCard from "./PostCard";
import HomeIcon from "@mui/icons-material/Home";
import { useParams } from "next/navigation";

type Props = {
  posts: Post[];
};

const IndividualPage = ({ posts }: Props) => {
  const { data: session, status } = useSession();
  const params = useParams();
  const uuid = params ? params.uuid : null;

  if (!uuid) {
    console.error("UUID is null or undefined");
    // TODO: 404ページにリダイレクト
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        position={"absolute"}
        display={"flex"}
        flexDirection={"row"}
        top={20}
        right={12}
      >
        {session && session.user?.image && session.user?.id === uuid && (
          <>
            <Avatar src={session.user.image}></Avatar>
            <Box
              px={2}
              display={"flex"}
              alignItems={"center"}
              fontWeight={"bold"}
            >
              {session?.user?.name}
            </Box>
          </>
        )}
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
};

export default IndividualPage;
