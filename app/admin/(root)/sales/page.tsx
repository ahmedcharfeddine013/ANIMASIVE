import React from "react";
import PageHeader from "../../_components/PageHeader";
import db from "@/db/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import CancelDropdownOrder from "./_components/OrderActions";

export default function AdminSalesPage() {
  return (
    <div className="space-y-8">
      <PageHeader>Orders</PageHeader>
      <SalesTable />
    </div>
  );
}

async function SalesTable() {
  const orders = await db.order.findMany({
    select: {
      id: true,
      product: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  if (orders.length === 0) return <p>No Orders found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Price</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{formatCurrency(order.product.priceInCents)}</TableCell>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <CancelDropdownOrder id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
