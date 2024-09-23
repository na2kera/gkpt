import { Box } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

const PostCards: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Box>
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </Box>
    </>
  );
};

export default PostCards;
