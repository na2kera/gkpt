import { Avatar, Box, Button } from "@mui/material";
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
        <Box
          position={"absolute"}
          top={20}
          display={"flex"}
          flexDirection={"row"}
          right={12}
        >
          <Button
            sx={{ paddingX: "16px" }}
            onClick={() => signOut()}
            endIcon={<LogoutIcon />}
          >
            Sign out
          </Button>
          <Link href="/mypage">
            <Box display={"flex"} flexDirection={"row"}>
              {session.user?.image && (
                <>
                  <Avatar alt="user image" src={session.user.image} />
                  <Box
                    display="flex"
                    alignItems="center"
                    fontWeight="bold"
                    px={2}
                  >
                    {session.user?.name}
                  </Box>
                </>
              )}
            </Box>
          </Link>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box
        position={"absolute"}
        top={12}
        right={20}
        display={"flex"}
        flexDirection={"row"}
      >
        <Button onClick={() => signIn()} endIcon={<LoginIcon />}>
          Sign in
        </Button>
      </Box>
    </>
  );
};

export default Auth;
