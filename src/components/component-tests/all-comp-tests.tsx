"use client";

// LIBRARIES

// COMPONENTS
import Buttons from "~/components/component-tests/buttons";
import Cards from "~/components/component-tests/cards";
import Forms from "~/components/component-tests/forms";
import Popovers from "~/components/component-tests/popovers";
import LoadingSpinner from "~/components/ui/loading-spinner";
import TrpcClientTest from "~/components/component-tests/trpc-client-test";

const AllCompTests = () => {
  return (
    <div className="flex flex-col bg-background p-10 text-foreground">
      <div className="flex  w-full justify-around">
        <div className="flex w-full flex-col gap-4 p-10 text-center">
          <h2 className="text-2xl">CompTests</h2>
          <Buttons />
        </div>
        <div className="flex w-full justify-items-center gap-10">
          <Cards />
        </div>
      </div>
      <div className="flex w-full justify-center gap-10 p-10">
        <Forms />
        <Popovers />
      </div>
      <div className="flex w-full justify-center gap-10 p-10">
        <LoadingSpinner className="text-accent" />
      </div>
      <div className="flex w-full justify-center gap-10 p-10">
        <h2 className="text-2xl">TrpcClientTest</h2>
        <TrpcClientTest />
      </div>
    </div>
  );
};
export default AllCompTests;
