import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort..." />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-[#121212]">
          <SelectGroup className="bg-white dark:bg-[#121212] p-0 m-0">
            <SelectLabel>Sort...</SelectLabel>
            <SelectItem value="apple">Name</SelectItem>
            <SelectItem value="banana">Price</SelectItem>
            <SelectItem value="blueberry">Latest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
