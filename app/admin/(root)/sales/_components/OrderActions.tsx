"use client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { cancelOrder } from "../_actions/order";

export default function CancelDropdownOrder({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await cancelOrder(id), router.refresh();
        });
      }}
    >
      Cancel Order
    </DropdownMenuItem>
  );
}
