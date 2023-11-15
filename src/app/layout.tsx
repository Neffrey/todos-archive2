// CSS
import "~/app/globals.css";

// LIBRARIES
import type { Metadata } from "next";
import { headers } from "next/headers";
import { type ReactNode } from "react";

// UTILS
import { TRPCReactProvider } from "~/trpc/react";

// COMPONENTS
import Footer from "~/components/footer";
import Header from "~/components/header";
import UseOnRender from "~/components/hooks/use-on-render";
import HtmlWrapper from "~/components/html-wrapper";
import LightDarkProvider from "~/components/providers/light-dark-provider";
import SessionProvider from "~/components/providers/session-provider";
import ThemeDrawer from "~/components/theme-drawer";
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
        <body>
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
                <Header />
                <ThemeDrawer />
                {children}
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
