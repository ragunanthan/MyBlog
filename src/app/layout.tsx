import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/Header/Header";
import { menuItems } from "@/utils/utils";
import { Footer } from "@/components/UI/Footer/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "My Blog site",
};


export default async function RootLayout({
  children,

}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body className={`max-w-[1366px] flex flex-col px-4 m-auto h-[100vh] ${inter.className}`}>
        <header className=" py-6">
          <Header name={"Ragunanthan Thangavel"} menu={menuItems} />
        </header>
        <div className="flex-1">
        {children}
        </div>
        <footer>
          <Footer />
        </footer>
      </body>
      </SessionProvider>
    </html>
  );
}
