"use client";

// LIBRARIES
import { useSession } from "next-auth/react";
import { useMemo } from "react";

// UTILS
import useThemeStore from "~/components/stores/theme-store";

const DefaultColorTheme = () => {
  const sessionTheme = useSession()?.data?.user?.colorTheme;
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const setCurrentTheme = useThemeStore((state) => state.setCurrentTheme);

  useMemo(() => {
    if (sessionTheme && sessionTheme !== currentTheme) {
      setCurrentTheme(sessionTheme);
    }
  }, [sessionTheme, setCurrentTheme, currentTheme]);

  return null;
};
export default DefaultColorTheme;
