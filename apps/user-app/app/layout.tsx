import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "./AppbarClient";
import Layout from "./(dashboard)/layout";
const inter = Inter({ subsets: ["latin"] });
import Image from "next/image"; 
import zenpay from "../public/zenpay.png"
export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" >
      <Providers>
        <body className={inter.className} >
        <AppbarClient />
        {children}
        </body>
      </Providers>
    </html>
  );
}
