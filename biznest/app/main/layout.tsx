import Header from "@/components/main-layout/Header";
import Sidebar from "@/components/main-layout/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar></Sidebar>
        <main className="pl-64 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </main>
  );
}
