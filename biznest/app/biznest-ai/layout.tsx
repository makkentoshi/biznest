import Header from "@/components/biznest-ai-page/header";
import Footer from "@/components/biznest-ai-page/footer";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>

    </main>
  );
}
