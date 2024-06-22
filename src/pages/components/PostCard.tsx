import { Avatar, Card, CardHeader } from "@mui/material";
import OptionButton from "./OptionButton";
import { formatDate } from "../../../utils/timeData";
import Buttons from "./Buttons";
import GkptContents from "./GkptContents";
import { FC } from "react";

type Props = {
  post: Post;
  key: number;
};

const PostCard: FC<Props> = ({ post, key }) => {
  return (
    <Card key={key} sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={<Avatar src={post.user.image}></Avatar>}
        action={
          <>
            <OptionButton post={post} />
          </>
        }
        title={post.user.name}
        subheader={formatDate(post.created_at)}
      />
      <GkptContents post={post} />
      <Buttons />
    </Card>
  );
};

export default PostCard;
