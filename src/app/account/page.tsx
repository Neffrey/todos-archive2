"use client";

// LIBS
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Suspense, useState } from "react";
import { FaPaintBrush } from "react-icons/fa";

// UTILS
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

// COMPONENTS
import ProtectedContent from "~/components/protectedContent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Switch } from "~/components/ui/switch";
import UnauthedLogin from "./_components/unauthed-login";

// CONSTANTS
const MOUSEOVERS = ["NAME", "IMAGE", "THEME"] as const;

// COMP
const AccountPage = () => {
  const { data: session } = useSession();
  const [mouseOver, setMouseOver] = useState<
    (typeof MOUSEOVERS)[number] | null
  >(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const editUser = api.user.edit.useMutation({
    onSuccess: () => {
      console.log("editUser success");
    },
  });

  const createPP = api.profilePictures.create.useMutation({
    // api.user.edit.useMutation({
    onSuccess: () => {
      console.log("createPP success");
    },
  });

  const handleNameChange = () => {
    editUser.mutate({ name: "new name" });
  };

  const handleImageChange = () => {
    createPP.mutate({ url: "new name" });
  };

  const handleThemeChange = () => {
    editUser.mutate({ name: "new name" });
  };

  const handleShowCompletedChange = () => {
    editUser.mutate({ showCompleted: !showCompleted });
    setShowCompleted(!showCompleted);
  };

  return (
    <Suspense>
      <ProtectedContent
        authedRoles={["ADMIN", "USER", "RESTRICTED"]}
        fallback={<UnauthedLogin />}
      >
        <div
          // HERO ROW
          className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-20 bg-gradient-to-br from-background to-background/50 md:justify-center"
        >
          <div
            // DETAILS
            className="flex items-center justify-around gap-6"
          >
            <div className="flex flex-col items-center justify-center gap-6">
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    // NAME
                    className="flex cursor-pointer items-center gap-8"
                    onMouseEnter={() => setMouseOver(MOUSEOVERS[0])}
                    onMouseLeave={() => setMouseOver(null)}
                  >
                    <h1
                      className={cn(
                        "border-b-4 border-transparent pb-3 text-5xl font-bold text-primary-foreground",
                        mouseOver === MOUSEOVERS[0] ? "border-accent" : "",
                      )}
                    >{`Hello ${session?.user?.name}`}</h1>
                    <FaPaintBrush
                      className={cn(
                        "mb-4 ml-4 text-3xl text-transparent",
                        mouseOver === MOUSEOVERS[0] ? "text-accent" : "",
                      )}
                    />
                  </div>
                </DialogTrigger>
                <DialogHeader>Change Name</DialogHeader>
                <DialogContent>CHANGE NAME FORM</DialogContent>
              </Dialog>
              <h2 className="cursor-not-allowed text-xl font-semibold text-primary-foreground">
                {session?.user?.email}
              </h2>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div
                  // IMAGE
                  className="relative cursor-pointer border-4 border-transparent hover:border-accent"
                  onMouseEnter={() => setMouseOver(MOUSEOVERS[1])}
                  onMouseLeave={() => setMouseOver(null)}
                >
                  <Image
                    className="text-xl font-semibold text-primary-foreground"
                    src={session?.user?.image ? session.user.image : ""}
                    width={150}
                    height={150}
                    alt={`${session?.user?.name}'s Profile Picture`}
                  />
                  <div
                    className={cn(
                      "absolute right-2 top-2 hidden items-center justify-center text-accent",
                      mouseOver === MOUSEOVERS[1] ? "flex" : "",
                    )}
                  >
                    <FaPaintBrush className="ml-4 text-2xl" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Change Image</DialogHeader>
                CHANGE IMAGE FORM
              </DialogContent>
            </Dialog>
          </div>

          <div
            // SETTINGS
            className="flex w-1/2 flex-col items-center justify-center gap-6"
          >
            <div
              // SHOW COMPLETED TODOS
              className="flex w-full items-center justify-between gap-6"
            >
              <h3 className="text-xl font-semibold text-primary-foreground">
                Show Completed Todos by Default
              </h3>
              <Switch
                checked={showCompleted}
                onCheckedChange={handleShowCompletedChange}
              />
            </div>

            <div
              // THEME
              className="flex w-full items-center justify-between gap-6"
            >
              <h3 className="text-xl font-semibold text-primary-foreground">
                Theme
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex items-center justify-end"
                    onMouseEnter={() => setMouseOver(MOUSEOVERS[2])}
                    onMouseLeave={() => setMouseOver(null)}
                    onClick={() => handleThemeChange()}
                  >
                    <span
                      className={cn(
                        "border-b-2 border-transparent text-xl font-semibold capitalize text-primary-foreground",
                        mouseOver === MOUSEOVERS[2] ? "border-accent" : "",
                      )}
                    >
                      {session?.user.colorTheme}
                    </span>
                    <FaPaintBrush
                      className={cn(
                        "ml-4 text-lg text-transparent",
                        mouseOver === MOUSEOVERS[2] ? "text-accent" : "",
                      )}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Change Theme</DialogHeader>
                  CHANGE THEME FORM
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </ProtectedContent>
    </Suspense>
  );
};
export default AccountPage;
