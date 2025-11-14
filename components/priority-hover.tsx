"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PriorityProps {
  priority: string | "";
}

export function PriorityForm({ priority }: PriorityProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2">Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{priority}</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
