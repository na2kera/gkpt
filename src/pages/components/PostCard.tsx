import { Avatar, Card, CardHeader } from "@mui/material";
import OptionButton from "./OptionButton";
import { formatDate } from "../../../utils/timeData";
import GkptContents from "./GkptContents";
import { FC } from "react";
import Link from "next/link";

type Props = {
  post: Post;
};

const PostCard: FC<Props> = ({ post }) => {
  if (!post || !post.Members) return null;

  return (
    //TODO: レスポンシブ対応
    <Card sx={{ width: 600 }}>
      <CardHeader
        avatar={
          <Link href={`/${post?.Members?.id}`}>
            <Avatar src={post?.Members?.avatar || ""}></Avatar>
          </Link>
        }
        action={
          <>
            <OptionButton post={post} />
          </>
        }
        title={post?.Members?.name || "unknown"}
        subheader={post?.created_at ? formatDate(post.created_at) : ""}
      />
      <Link href={`${post.Members?.id}/gkpt/${post.id}`}>
        <GkptContents post={post} />
        {/* <Buttons /> */}
      </Link>
    </Card>
  );
};

export default PostCard;
