"use client";

// COMPONENTS
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

const Buttons = () => {
  const { toast } = useToast();
  return (
    <>
      <h3 className="text-xl">Buttons</h3>
      <div className="p-4" />
      <div className="flex w-full max-w-md flex-wrap justify-center gap-10">
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
          variant={"secondary"}
          className="bg-muted text-muted-foreground"
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Muted btn clicked",
            });
          }}
        >
          muted
        </Button>
        <Button
          variant={"accent"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Accent btn clicked",
            });
          }}
        >
          Accent
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
    </>
  );
};
export default Buttons;
