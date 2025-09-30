import { cn } from "@/utils/cn";
import React from "react";

export function Container({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("container mx-auto px-4", className)} {...props} />
  );
}