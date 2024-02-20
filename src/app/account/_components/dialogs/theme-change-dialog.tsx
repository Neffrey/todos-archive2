"use client";

// LIBS
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  FaCheck,
  FaMoon,
  FaPaintBrush,
  FaStar,
  FaSun,
  FaTimes,
} from "react-icons/fa";

// UTILS
import { cn } from "~/lib/utils";
import { type ColorTheme } from "~/server/db/schema";
import { api } from "~/trpc/react";

// COMPONENTS
import UseOnRender from "~/components/hooks/use-on-render";
import useThemeStore from "~/components/stores/theme-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Switch } from "~/components/ui/switch";
import { useToast } from "~/components/ui/use-toast";

// COMP
const ThemeChangeDialog = () => {
  const [mouseOver, setMouseOver] = useState(false);
  const { toast } = useToast();

  // Color Theme States
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const isOpen = useThemeStore((state) => state.isOpen);
  const themeList = useThemeStore((state) => state.themeList);
  const setCurrentTheme = useThemeStore((state) => state.setCurrentTheme);
  const setIsOpen = useThemeStore((state) => state.setIsOpen);

  // Next Themes
  const { theme: ldTheme, setTheme: setLdTheme } = useTheme();

  // Effect to trigger Theme Change in localStorage
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme !== null && themeList.includes(localTheme as ColorTheme)) {
      setCurrentTheme(localTheme as ColorTheme);
    } else window.localStorage.setItem("theme", currentTheme);
  }, [setCurrentTheme, currentTheme, themeList]);

  const { data: session, update: updateSession } = useSession();

  const editUser = api.user.edit.useMutation({
    onSuccess: async () => {
      await updateSession();
      setIsOpen(false);
      toast({
        action: (
          <div className="flex h-full w-full items-center justify-between">
            <FaCheck className="text-2xl" />
            {"Name has been changed!"}
          </div>
        ),
      });
    },
  });

  const handleThemeChange = () => {
    // editUser.mutate({ name: nameInput });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="flex cursor-pointer items-center justify-end"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onClick={() => handleThemeChange()}
        >
          <span
            className={cn(
              "border-b-2 border-transparent text-xl font-semibold capitalize text-primary-foreground",
              mouseOver ? "border-accent" : "",
            )}
          >
            {session?.user.colorTheme}
          </span>
          <FaPaintBrush
            className={cn(
              "ml-4 text-lg text-transparent",
              mouseOver ? "text-accent" : "",
            )}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Change Theme</DialogHeader>
        <div
          // Drawer Content Here
          className="bg-base-300 grid h-full w-full grid-cols-2 gap-2 bg-popover p-4 text-popover-foreground"
        >
          <div
            className="absolute right-5 top-5 cursor-pointer text-4xl text-popover-foreground"
            onClick={void setIsOpen(false)}
          >
            <FaTimes />
          </div>
          <div
            // Light Dark Theme Buttons
            className="col-span-2 flex justify-center gap-6 text-3xl font-bold"
          >
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => setLdTheme("light")}
            >
              <FaSun />
            </div>
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => setLdTheme(ldTheme === "light" ? "dark" : "light")}
            >
              <UseOnRender>
                <Switch
                  checked={ldTheme === "dark"}
                  className="data-[state=checked]:bg-neutral-foreground data-[state=unchecked]:bg-neutral-foreground"
                />
              </UseOnRender>
            </div>
            <div
              className="flex cursor-pointer place-items-center gap-2"
              onClick={() => setLdTheme("dark")}
            >
              <FaMoon />
            </div>
          </div>
          <UseOnRender>
            {
              // Color Theme Buttons
              themeList.map((theme) => {
                return (
                  <button
                    key={theme}
                    data-theme={theme}
                    data-set-theme={theme}
                    data-act-class="ACTIVECLASS"
                    suppressHydrationWarning
                    className={`overflow-hidden rounded-lg border-4 text-sm lg:text-base ${ldTheme} ${
                      theme === currentTheme
                        ? "border-primary"
                        : "border-transparent hover:border-primary/70"
                    }`}
                    onClick={() => {
                      // toggleDrawer();
                      setCurrentTheme(theme);
                    }}
                  >
                    <div className="relative h-full w-full cursor-pointer bg-background font-sans text-foreground">
                      {
                        // Star in top left corner on current theme
                        theme === currentTheme && (
                          <div className="absolute left-1 top-1 text-2xl text-primary">
                            <FaStar />
                          </div>
                        )
                      }
                      <div className="grid h-full w-full grid-cols-5 grid-rows-3">
                        {/* Left side bg color blocks */}
                        <div className="col-start-1 row-span-2 row-start-1 bg-card" />
                        <div className="col-start-1 row-start-3 bg-popover" />
                        {/* Right side theme name & bg color blocks */}
                        <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col justify-center gap-1 px-2">
                          <div className="text-right text-lg font-bold capitalize lg:text-xl">
                            {theme}
                          </div>
                          {/* Theme "A" blocks */}
                          <div className="flex flex-wrap justify-end gap-1">
                            <div className="flex aspect-square w-4 items-center justify-center rounded bg-primary sm:w-5 md:w-6 lg:w-7">
                              <span className="text-sm font-bold text-primary-foreground">
                                A
                              </span>
                            </div>
                            <div className="flex aspect-square w-4 items-center justify-center rounded bg-muted sm:w-5 md:w-6 lg:w-7">
                              <span className="text-sm font-bold text-muted-foreground">
                                A
                              </span>
                            </div>
                            <div className="flex aspect-square w-4 items-center justify-center rounded bg-secondary sm:w-5 md:w-6 lg:w-7">
                              <span className="text-sm font-bold text-secondary-foreground">
                                A
                              </span>
                            </div>
                            <div className="flex aspect-square w-4 items-center justify-center rounded bg-accent sm:w-5 md:w-6 lg:w-7">
                              <span className="text-sm font-bold text-accent-foreground">
                                A
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            }
          </UseOnRender>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ThemeChangeDialog;
