import React from "react";
import PageHeader from "../_components/PageHeader";
import db from "@/db/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return {
    activeCount,
    inactiveCount,
  };
}

export default async function AdminPage() {
  const [getSales, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <div className="space-y-8">
      <PageHeader>Overview</PageHeader>
      <div className="grid grid-cols-3 gap-3">
        <DashboardCard
          title="sales"
          subtitle={`${formatNumber(getSales.numberOfSales)} Orders`}
          body={`${formatCurrency(getSales.amount)}`}
        />
        <DashboardCard
          title="Customer"
          subtitle={`${formatCurrency(
            userData.averageValuePerUser
          )} Average Value`}
          body={`${formatNumber(userData.userCount)}`}
        />
        <DashboardCard
          title="Customer"
          subtitle={`${formatNumber(productData.inactiveCount)} inactive`}
          body={`${formatNumber(productData.activeCount)}`}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
