import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// cn に使う条件
const state = true

export default function TestCn() {
  return (
    <div className="flex flex-col">
      <div className="">
        <h1>hello world</h1>
        {/* cnを使うことで条件分岐やコンフリクトを解決できる */}
        <Button variant="destructive" className={cn(
          "bg-indigo-500",
          state && "bg-red-500"
        )} >Click me</Button>
      </div>
    </div>
  )
}
