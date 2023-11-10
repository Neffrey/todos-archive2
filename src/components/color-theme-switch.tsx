"use client";

import { Button } from "~/components/ui/button";
import useThemeStore from "~/components/stores/themeStore";

const ColorThemeSwitch = () => {
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const drawerIsOpen = useThemeStore((state) => state.drawerIsOpen);
  const toggleDrawer = useThemeStore((state) => state.toggleDrawer);

  return (
    <div className="flex flex-col gap-10">
      <h3>The current Color theme is: {currentTheme}</h3>
      <h4>drawerIsOpen: {drawerIsOpen.toString()}</h4>
      <div className="flex gap-10">
        <Button variant={"default"} onClick={toggleDrawer}>
          Toggle Drawer
        </Button>
      </div>
      <div className="bg-background text-foreground h-40 w-40">
        COLORIZE ME!?!
      </div>
    </div>
  );
};
export default ColorThemeSwitch;
