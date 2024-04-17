"use client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { deleteCustomer } from "../_actions/customers";

export default function DeleteDropdownUser({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteCustomer(id), router.refresh();
        });
      }}
    >
      Delete Customer
    </DropdownMenuItem>
  );
}
