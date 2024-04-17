import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function deleteCustomer(id: string) {
  const customer = await db.user.delete({ where: { id } });

  if (customer == null) return notFound();

  revalidatePath("/");
  revalidatePath("/customers");
}
