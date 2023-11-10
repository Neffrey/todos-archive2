"use server";

// LIBS
import "server-only";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";

// TYPES
import { type UserRole } from "~/server/auth";

type ProtectedContentProps = {
  children: ReactNode;
  fallback?: ReactNode;
  authedRoles: UserRole[];
};

const ProtectedContent = async ({
  children,
  fallback,
  authedRoles,
}: ProtectedContentProps) => {
  const session = await getServerAuthSession();
  const hasRole = session?.user?.role
    ? authedRoles.includes(session.user.role)
    : false;

  return (
    <>
      {() => {
        if (fallback) {
          return hasRole ? children : fallback;
        }
        return hasRole ? children : null;
      }}
    </>
  );
};

export default ProtectedContent;
