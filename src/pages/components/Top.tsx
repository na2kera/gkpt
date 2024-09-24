import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Auth from "./Auth";
import PostIcon from "./PostIcon";
import PostCards from "./PostCards";

type Props = {
  posts: Post[];
};

const Top = ({ posts }: Props) => {
  const { data: session, status } = useSession();

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
};

export default Top;
