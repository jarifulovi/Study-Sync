import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // TODO: Restrict access to authenticated users only

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 md:ml-16">
        {children}
      </main>
    </div>
  );
}