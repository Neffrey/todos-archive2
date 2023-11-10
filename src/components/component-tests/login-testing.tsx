"use client";

// LIBRARIES
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

// COMPONENTS
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

const LoginTesting = () => {
  const { toast } = useToast();
  const session = useSession();

  return (
    <div
      // 3RD ROW
      className="flex w-full flex-col items-center gap-20 bg-gradient-to-br from-popover to-card p-20 text-popover-foreground"
    >
      <h2 className="w-full text-center text-3xl">LOGIN TESTING</h2>
      <h2 className="w-full text-center text-xl">
        Logged in as: {session.data ? session.data.user.name : "no session"}
      </h2>
      <h2 className="w-full text-center text-xl">
        Role:
        {session.data ? session.data.user.role : "No Role"}
      </h2>
      <div className="flex gap-10">
        <Button
          onClick={() => {
            console.log("session: ", session);
            toast({
              title: "User Data",
              description: JSON.stringify(session, null, 2),
            });
          }}
        >
          Log User
        </Button>
        {!session.data ? (
          <Button onClick={() => signIn("google")}>Login</Button>
        ) : (
          <Button onClick={() => signOut()}>Logout</Button>
        )}
      </div>
    </div>
  );
};
export default LoginTesting;
