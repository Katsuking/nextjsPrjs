import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const state = true;

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="">
        <h1>hello world</h1>
        <Button
          variant="destructive"
          className={cn("bg-indigo-500", state && "bg-red-500")}
        >
          Click me
        </Button>
      </div>
    </div>
  );
}
