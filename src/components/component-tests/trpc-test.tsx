// UTILS
import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";

// COMPONENTS
import { Button } from "~/components/ui/button";

const TrpcTest = async () => {
  const session = await getServerAuthSession();
  // const getMyUser = api.
  // console.log("server session: ", session);
  // const getData = trpc.getData.useQuery();
  // const setData = trpc.setData.useMutation({
  //   onSettled: () => {
  //     console.log("setData onSettled");
  //   },
  // });

  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <div className="flex items-center justify-center">
      <Button
      // onClick={async () => {
      //   getData.refetch();
      // }}
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
      </Button>
    </div>
  );
};
export default TrpcTest;
