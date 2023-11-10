"use client";

// COMPONENTS
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";

const Cards = () => {
  const { toast } = useToast();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <h3 className="text-center text-xl">Card</h3>
      <Card className="flex max-w-md flex-col justify-center gap-4 justify-self-center p-8">
        <h2 className="text-center text-xl">Tester Card</h2>
        <p>
          Some Random text goes here. Ima try and make it looooong so heres an
          excess amount of bs to go in this lil card xD
        </p>
        <Button
          variant={"default"}
          onClick={() => {
            toast({
              title: "Toast Test",
              description: "Card btn clicked",
            });
          }}
        >
          Card Button
        </Button>
      </Card>
    </div>
  );
};
export default Cards;
