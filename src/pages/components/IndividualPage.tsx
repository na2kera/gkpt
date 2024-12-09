import { Avatar, Box, Fab, Link } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import PostCard from "./PostCard";
import HomeIcon from "@mui/icons-material/Home";

type Props = {
  posts: Post[];
};

const IndividualPage = ({ posts }: Props) => {
  const { data: session, status } = useSession();

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

export default IndividualPage;
