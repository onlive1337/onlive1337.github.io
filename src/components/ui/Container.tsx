import { cn } from "@/utils/cn";

export function Container({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("container mx-auto px-4", className)} {...props} />
  );
}