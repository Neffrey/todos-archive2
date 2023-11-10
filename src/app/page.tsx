// LIBRARIES
import Link from "next/link";

// COMPONENTS
import LoginTesting from "~/components/component-tests/login-testing";
import CreateTaskModal from "~/components/create-task-modal";
import ChevronDown from "~/components/svgs/ChevronDown";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div
        // HERO ROW
        className="flex w-full flex-col items-center justify-center gap-12 bg-gradient-to-br from-secondary to-secondary/50 px-4 py-16"
      >
        <div className="flex flex-col gap-5">
          <h1 className="w-full text-center text-5xl font-extrabold tracking-wider text-secondary-foreground sm:text-[5rem]">
            nToDos
          </h1>
          <h2 className="w-full text-center text-xl tracking-wider text-secondary-foreground">
            Just a lil todo app by Neffrey
          </h2>
        </div>
        <div className="flex items-center justify-center gap-5">
          <CreateTaskModal />
          {/* <Link href="/" passHref tabIndex={-1}>
            <Button
              size={"lg"}
              variant={"default"}
              className="text rounded-xl px-8 py-5 text-xl font-bold"
            >
              View Tasks
            </Button>
          </Link> */}
        </div>
        <Link
          // Scroll down chevron
          href="./#"
          className="mb-2 h-12 w-12 cursor-pointer text-6xl transition ease-linear hover:mb-0 hover:h-14 hover:w-14 hover:-translate-y-1 hover:scale-105"
          passHref
        >
          <ChevronDown className="fill-secondary-foreground" />
        </Link>
      </div>
      {/* <CompTests />
      <div className="flex w-full justify-center gap-10 p-10">
        <h2 className="text-2xl">TrpcTest</h2>
        <TrpcTest />
      </div> */}
      <LoginTesting />
    </main>
  );
};

export default Home;
