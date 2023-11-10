"use client";

import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

const TrpcClientTest = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() => {
          console.log("session: ", session);
        }}
      >
        Session: {session ? session.user.name : "no session"}
      </Button>
      <Button
      // onClick={async () => {
      //   console.log("setData clicked");
      //   setData.mutate("setData");
      // }}
      >
        Test setData:
        {/* {setData.data} */}
      </Button>
    </div>
  );
};
export default TrpcClientTest;
