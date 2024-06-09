import React, { use, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const MyPage = () => {
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
    saveUser();
  }, [session]);

  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  if (session) {
    return (
      <>
        signed in as {session.user?.name} <br />
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            width={50}
            height={50}
          />
        )}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
};

export default MyPage;
