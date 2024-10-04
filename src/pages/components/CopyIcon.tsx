import { Box, IconButton, Snackbar } from "@mui/material";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Props = {
  post: Post;
};

const CopyIcon = ({ post }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    const text = `**Good**\n${post.good}\n**Keep**\n${post.keep}\n**Problem**\n${post.problem}\n**Try**\n${post.action}\n**ひとこと**\n${post.comment}`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setOpen(true);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <IconButton aria-label="copy" onClick={handleClick}>
        <ContentCopyIcon />
      </IconButton>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="コピーしました"
        sx={{ zIndex: 9999 }}
      />
    </Box>
  );
};

export default CopyIcon;
