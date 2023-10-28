import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
      <ModeToggle />
    </div>
  );
}
