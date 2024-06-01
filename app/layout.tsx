import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/auth/Navigation"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "アイデアlab",
  description: "サービスやゲームなどのアイデアを自動で考えます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
    <body className={inter.className}>
      <div className="flex min-h-screen flex-col">
        <Navigation />

        <main className="container mx-auto max-w-screen-md flex-1 px-2">
          {children}
        </main>

        {/* フッター */}
        <footer className="py-5">
          <div className="text-center text-sm">
            Copyright © All rights reserved |{" "}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              idealab
            </a>
          </div>
        </footer>
      </div>
    </body>
  </html>
  );
}
