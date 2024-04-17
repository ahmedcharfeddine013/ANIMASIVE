import AdminNavbar, { NavLink } from "./_components/AdminNavbar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-row  w-screen">
      <AdminNavbar>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/customers">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </AdminNavbar>
      <div className="container my-6 p-6">{children}</div>
    </section>
  );
}
