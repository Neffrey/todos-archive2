"use client";

// LIBRARIES
import { create } from "zustand";

import { COLOR_THEMES, type ColorTheme } from "~/server/db/schema";

export interface ThemeStoreType {
  drawerIsOpen: boolean;
  currentTheme: ColorTheme;
  themeList: ColorTheme[];
  setCurrentTheme: (current: ColorTheme) => void;
  toggleDrawer: () => void;
}

const useThemeStore = create<ThemeStoreType>((set, get) => ({
  drawerIsOpen: false,
  currentTheme: "galaxy",
  themeList: [...COLOR_THEMES],
  setCurrentTheme: (current) => {
    set(() => ({
      currentTheme: current,
    }));
    window.localStorage.setItem("theme", current);
  },
  toggleDrawer: () => {
    set(() => ({
      drawerIsOpen: !get().drawerIsOpen,
    }));
  },
}));

export default useThemeStore;
