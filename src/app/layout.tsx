import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/Header/Header";
import { menuItems } from "@/utils/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "My Blog site",
};


export default function RootLayout({
  children,

}: {
  children: React.ReactNode;
}) {
    
  return (
    <html lang="en">
      <body className={`max-w-[1366px] px-4 m-auto ${inter.className}`}>
        <header className=" py-6">
          <Header name={"Ragunanthan Thangavel"} menu={menuItems} />
        </header>
        {children}
      </body>
    </html>
  );
}
