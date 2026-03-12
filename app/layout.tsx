import type { Metadata } from "next";
import { Yusei_Magic } from "next/font/google";
import IconImage from "@/public/me.png";
import "./globals.css";

const yuseiMagic = Yusei_Magic({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "りゆうの実験場",
  description: "なんかブログとか",
  icons: {
    icon: IconImage.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={yuseiMagic.className}>{children}</body>
    </html>
  );
}
