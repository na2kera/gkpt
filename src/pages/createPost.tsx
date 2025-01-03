import { Box, Button, Fab, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import router from "next/router";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

const CreatePost = () => {
  const { data: session, status } = useSession();

  const [good, setGood] = useState("");
  const [keep, setKeep] = useState("");
  const [problem, setProblem] = useState("");
  const [action, setAction] = useState("");
  const [comment, setComment] = useState("");

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  const uuid = session?.user?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 切り出し
    const res = await fetch("/api/gkpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        uuid,
        good,
        keep,
        problem,
        action,
        comment,
      }),
    });
    if (!res.ok) {
      alert("投稿に失敗しました");
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <div className="max-w-xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">今日の振り返りを入力</h1>
        <div className="border border-gray-300 p-5 rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <TextField
                required
                label="good"
                variant="outlined"
                fullWidth
                multiline
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGood(e.target.value)
                }
              />
            </div>
            <div className="mb-5">
              <TextField
                required
                label="keep"
                variant="outlined"
                fullWidth
                multiline
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setKeep(e.target.value)
                }
              />
            </div>
            <div className="mb-5">
              <TextField
                required
                label="problem"
                variant="outlined"
                fullWidth
                multiline
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProblem(e.target.value)
                }
              />
            </div>
            <div className="mb-5">
              <TextField
                required
                label="try"
                variant="outlined"
                fullWidth
                multiline
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAction(e.target.value)
                }
              />
            </div>
            <div className="mb-5">
              <TextField
                required
                label="ひとこと"
                variant="outlined"
                fullWidth
                multiline
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
              />
            </div>
            <Box display={"flex"} justifyContent={"center"}>
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </Box>
          </form>
        </div>
      </div>
      <Link className="fixed left-4 bottom-4" href="/">
        <Fab color="secondary" aria-label="home">
          <HomeIcon />
        </Fab>
      </Link>
    </>
  );
};

export default CreatePost;
