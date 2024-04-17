import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function cancelOrder(id: string) {
  const order = db.order.delete({ where: { id } });

  if (order == null) return notFound();

  revalidatePath("/");
  revalidatePath("/sales");
}
