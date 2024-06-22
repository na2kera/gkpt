import { Box, Fab } from "@mui/material";
import Link from "next/link";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const PostIcon = () => {
  return (
    <Box sx={{ position: "fixed", bottom: 12, right: 12 }}>
      <Link href="/createPost">
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
      </Link>
    </Box>
  );
};

export default PostIcon;
