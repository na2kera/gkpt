import { FC } from "react";
import { CardContent, Typography } from "@mui/material";

type Props = {
  post: Post;
};

const GkptContents: FC<Props> = ({ post }) => {
  return (
    <CardContent>
      <Typography variant="h6">good</Typography>
      <Typography variant="body2" color="text.secondary">
        {post?.good || ""}
      </Typography>
      <Typography variant="h6">keep</Typography>
      <Typography variant="body2" color="text.secondary">
        {post?.keep || ""}
      </Typography>
      <Typography variant="h6">problem</Typography>
      <Typography variant="body2" color="text.secondary">
        {post?.problem || ""}
      </Typography>
      <Typography variant="h6">try</Typography>
      <Typography variant="body2" color="text.secondary">
        {post?.action || ""}
      </Typography>
      <Typography variant="h6">ひとこと</Typography>
      <Typography variant="body2" color="text.secondary">
        {post?.comment || ""}
      </Typography>
    </CardContent>
  );
};

export default GkptContents;
