import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import db from "@/db/db";
import { formatNumber } from "@/lib/formatters";
import { Delete, MoreVertical } from "lucide-react";
import React from "react";
import DeleteDropdownUser from "./_components/CustomerActions";
import PageHeader from "../../_components/PageHeader";

async function getCustomers() {
  const [countCustomers, Customers] = await Promise.all([
    db.user.count(),
    db.user.findMany({
      select: {
        email: true,
        orders: true,
      },
    }),
  ]);
  return {
    countCustomers,
    Customers,
  };
}

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <PageHeader>CustomersPage</PageHeader>
      <CustomersTable />
    </div>
  );
}

async function CustomersTable() {
  const customers = await db.user.findMany({
    select: {
      id: true,
      email: true,
      _count: { select: { orders: true } },
    },
    orderBy: { email: "desc" },
  });
  if (customers.length === 0) return <p>No Customers found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{formatNumber(customer._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropdownUser
                    id={customer.id}
                    disabled={customer._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
