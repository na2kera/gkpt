import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SaveUser = () => {
  const router = useRouter();
  useEffect(() => {
    const saveUserInformation = async () => {
      const session = await getSession();
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
        router.push("/");
      } catch (error) {
        console.error("Error:", error);
      }
    };
    saveUserInformation();
  }, []);

  return <div>トップページへリダイレクト中</div>;
};

export default SaveUser;
