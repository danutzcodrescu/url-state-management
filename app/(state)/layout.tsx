import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { TopNav } from "@/src/components/top-nav";
import cx from "clsx";
import { PageDetailsContainer } from "@/src/components/page-details/PageDetailsContainer";
import Providers from "@/src/toolbox/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "State management Demo",
  description:
    "Demo application to show case in-memory state management, url based state management and server side state management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(inter.className, "dark", "[&>*]:px-40")}>
        <TopNav />
        <PageDetailsContainer
          title="Smartphone Shop"
          subtitle="Check out the latest smartphones that you can buy for the lowest price"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
