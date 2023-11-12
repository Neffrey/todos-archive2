"use server";

// LIBS
import Link from "next/link";

// COMPONENTS
import ProtectedContent from "~/components/protectedContent";
import { Button } from "~/components/ui/button";

// TYPES
import { type UserRole } from "~/server/auth";

type NavItems = {
  title: string;
  href: string;
  authedRoles?: UserRole[] | undefined;
}[];

// Nav items
const navItems: NavItems = [
  { title: "Tasks", href: "/tasks" },
  { title: "Users", href: "/users", authedRoles: ["ADMIN"] },
];

const NavMenu = () => {
  return (
    <div
      // Nav Menu
      className="flex items-center justify-start gap-6"
    >
      {navItems.map((item) => {
        return (
          <ProtectedContent
            key={`navbar-${item.title}`}
            authedRoles={item?.authedRoles}
          >
            <Link href={item.href} tabIndex={-1}>
              <Button variant={"ghost"}>{item.title}</Button>
            </Link>
          </ProtectedContent>
        );
      })}
      <Link href="account" tabIndex={-1}>
        <Button variant={"ghost"}>My Account</Button>
      </Link>
      {/* <Button variant={"secondary"} onClick={toggleDrawer}>
          Change Theme
        </Button> */}
    </div>
  );
};
export default NavMenu;
