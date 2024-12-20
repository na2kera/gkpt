import { Box } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";

type Props = {
  posts: Post[];
};

const PostCard = dynamic(() => import("./PostCard"), { ssr: false });

const PostCards: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Box>
        {posts &&
          posts.map((post, index) => <PostCard post={post} key={index} />)}
      </Box>
    </>
  );
};

export default PostCards;
