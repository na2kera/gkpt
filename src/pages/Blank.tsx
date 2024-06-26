import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useEffect } from "react";

const Blank = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const saveUser = async () => {
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
    };

    const handleSaveUserAndRedirect = async () => {
      await saveUser();
      Router.push("/mypage");
    };

    if (status === "authenticated" && session) {
      handleSaveUserAndRedirect();
    }
  }, [session, status]);
  return <></>;
};

export default Blank;
