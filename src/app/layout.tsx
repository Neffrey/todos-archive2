// CSS
import "~/app/globals.css";

// LIBRARIES
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { extractRouterConfig } from "uploadthing/server";

// UTILS
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { TRPCReactProvider } from "~/trpc/react";

// COMPONENTS
import Footer from "~/app/_home-and-layout-components/footer";
import Header from "~/app/_home-and-layout-components/header";
import HtmlWrapper from "~/app/_home-and-layout-components/html-wrapper";
import UseOnRender from "~/components/hooks/use-on-render";
import LightDarkProvider from "~/components/providers/light-dark-provider";
import SessionProvider from "~/components/providers/session-provider";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Neffrey Starter",
  description: "Just a quick lil starter template",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <HtmlWrapper>
        <body className="custom-scrollbar">
          <TRPCReactProvider headers={headers()}>
            <LightDarkProvider>
              <UseOnRender
                fallback={
                  <div className="absolute flex h-full w-full flex-col items-center justify-center gap-10 bg-cyan-800 text-slate-50">
                    <LoadingSpinner className="h-20 w-20" />
                    <h3 className="text-xl">Loading...</h3>
                  </div>
                }
              >
                <NextSSRPlugin
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <Header />
                <main className="flex min-h-screen w-full flex-col">
                  {children}
                </main>
                <Toaster />
                <Footer />
              </UseOnRender>
            </LightDarkProvider>
          </TRPCReactProvider>
        </body>
      </HtmlWrapper>
    </SessionProvider>
  );
};

export default RootLayout;
