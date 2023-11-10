"use client";

// LIBRARIES

// COMPONENTS
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

const Popovers = () => {
  const { toast } = useToast();

  return (
    <div className="z-50 w-72 rounded-md border bg-popover p-4 text-center text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
      Popover Test
      <div className="p-10" />
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <Button
          variant={"default"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Default btn clicked",
            });
          }}
        >
          Default
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Secondary btn clicked",
            });
          }}
        >
          Secondary
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Destructive btn clicked",
            });
          }}
        >
          Destructive
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Outline btn clicked",
            });
          }}
        >
          Outline
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Ghost btn clicked",
            });
          }}
        >
          Ghost
        </Button>
        <Button
          variant={"link"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Link btn clicked",
            });
          }}
        >
          Link
        </Button>
      </div>
    </div>
  );
};
export default Popovers;
