import { Box, Button, CardContent } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const CreatePost = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const email = session?.user?.email;
  const imageUrl = session?.user?.image;

  const [good, setGood] = useState("");
  const [keep, setKeep] = useState("");
  const [problem, setProblem] = useState("");
  const [action, setAction] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // フォーム送信時の処理をここに追加
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        good,
        keep,
        problem,
        action,
        comment,
        imageUrl,
      }),
    });
  };
  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">今日の振り返りを入力</h1>
      <div className="border border-gray-300 p-5 rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2">good</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGood(e.target.value)
              }
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">keep</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeep(e.target.value)
              }
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">problem</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProblem(e.target.value)
              }
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">try</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAction(e.target.value)
              }
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">ひとこと</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
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
  );
};

export default CreatePost;
