import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const MyPage = () => {
  const { data: session, status } = useSession();

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
