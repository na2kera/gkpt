import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const SaveUser = () => {
  useEffect(() => {
    const saveUserInformation = async () => {
      const session = await getSession();
      console.log(session);
      try {
        const response = await fetch("/api/saveUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
          }),
        });
        const data = await response.json();
        console.log("Response:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    saveUserInformation();
  }, []);

  return <div>トップページへリダイレクト中</div>;
};

export default SaveUser;
