"use client";

// LIBRARIES
import { create } from "zustand";

export interface ThemeStoreType {
  drawerIsOpen: boolean;
  currentTheme: string;
  themeList: string[];
  setCurrentTheme: (current: string) => void;
  toggleDrawer: () => void;
}

const useThemeStore = create<ThemeStoreType>((set, get) => ({
  drawerIsOpen: false,
  currentTheme: "galaxy",
  themeList: [
    "bland",
    "bumblebee",
    "coffee",
    "cupcake",
    "forest",
    "galaxy",
    "lavender",
    "valentine",
  ],
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
