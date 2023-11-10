"use client";

// LIBRARIES
import { useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// UTILS
import { cn } from "~/lib/utils";

// COMPONENTS
import NeffreyLogo from "~/components/svgs/NeffreyLogo";
import { Button } from "~/components/ui/button";
import useStickyScrollUp from "~/components/hooks/use-sticky-scroll-up";

// Nav items
const navItems = [
  { title: "Tasks", href: "/tasks" },
  { title: "Users", href: "/users", showRole: ["ADMIN"] },
];

// FC
const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  return (
    <div
      // Row Container
      ref={headerRef}
      className={cn(
        "flex h-[75px] w-full items-center justify-between border-b-4 border-primary-foreground bg-primary px-5 py-3",
        useStickyScrollUp({
          enableBelowWidth: 1024,
          elementHeight: headerRef.current?.clientHeight,
        }),
      )}
    >
      <Link
        // Logo & Name Container
        className="flex items-center justify-start gap-6"
        href="/"
      >
        <div
          // Logo Container
          className="h-12 w-12 cursor-pointer fill-secondary-foreground"
        >
          <NeffreyLogo />
        </div>
        <h1 className="text-lg font-semibold text-primary-foreground sm:text-xl md:text-2xl lg:text-4xl">
          nToDos
        </h1>
      </Link>
      <div
        // Nav Menu
        className="flex items-center justify-start gap-6"
      >
        {navItems.map((item) => {
          if (
            item.showRole &&
            session?.user.role &&
            !item.showRole.includes(session.user.role)
          )
            return null;
          return (
            <Link key={`navbar-${item.title}`} href={item.href} tabIndex={-1}>
              <Button variant={"ghost"}>{item.title}</Button>
            </Link>
          );
        })}
        <Link href="account" tabIndex={-1}>
          <Button variant={"ghost"}>My Account</Button>
        </Link>
        {/* <Button variant={"secondary"} onClick={toggleDrawer}>
          Change Theme
        </Button> */}
      </div>
    </div>
  );
};

export default Header;
