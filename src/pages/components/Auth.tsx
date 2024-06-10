import { Avatar, Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const Auth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        <div className="absolute top-10 right-8 flex row">
          <Button
            className="px-4"
            onClick={() => signOut()}
            endIcon={<LogoutIcon />}
          >
            Sign out
          </Button>
          <Link href="/mypage">
            <div className=" flex row">
              {session.user?.image && (
                <>
                  <Avatar alt="Remy Sharp" src={session.user.image} />
                  <div className="px-4 flex items-center font-bold">
                    {session.user?.name}
                  </div>
                </>
              )}
            </div>
          </Link>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="absolute top-12 right-20 flex row">
        <Button onClick={() => signIn()} endIcon={<LoginIcon />}>
          Sign in
        </Button>
      </div>
    </>
  );
};

export default Auth;
