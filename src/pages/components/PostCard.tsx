import { Avatar, Card, CardHeader } from "@mui/material";
import OptionButton from "./OptionButton";
import { formatDate } from "../../../utils/timeData";
import GkptContents from "./GkptContents";
import { FC } from "react";

type Props = {
  post: Post;
};

const PostCard: FC<Props> = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={<Avatar src={post?.Members?.avatar || ""}></Avatar>}
        action={
          <>
            <OptionButton post={post} />
          </>
        }
        title={post?.Members?.name || "unknown"}
        subheader={post?.created_at ? formatDate(post.created_at) : ""}
      />
      <GkptContents post={post} />
      {/* <Buttons /> */}
    </Card>
  );
};

export default PostCard;
