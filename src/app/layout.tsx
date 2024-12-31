import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NavBar />
        <main className="flex-grow flex items-center justify-center ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
