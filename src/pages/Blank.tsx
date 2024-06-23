import { useSession } from "next-auth/react";
import Router from "next/router";

import React, { useEffect, useState } from "react";

const Blank = () => {
  const { data: session, status } = useSession();
  const [sessionValue, setSessionValue] = useState(false);

  useEffect(() => {
    const sessionActivate = async () => {
      if (status === "authenticated" && session) {
        setSessionValue(true);
      }
    };
    sessionActivate();
    console.log("sessionValue: ", sessionValue);
  }, [session, status]);

  useEffect(() => {
    const saveUser = async () => {
      console.log("session", session);
      if (session?.user) {
        await fetch("/api/saveUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }),
        });
      }
      console.log("saveUser");
    };

    const handleSaveUserAndRedirect = async () => {
      await saveUser();
      console.log("session", session);
      console.log("redirect");
      Router.push("/mypage");
    };

    handleSaveUserAndRedirect();
  }, [sessionValue]);
  return <></>;
};

export default Blank;
