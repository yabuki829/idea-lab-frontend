import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getAuthSession } from "@/lib/nextauth"
import "./globals.css";
import Navigation from "@/components/auth/Navigation";
import AuthProvider from "@/components/providers/AuthProvider";
import ToastProvider from "@/components/providers/ToastProvider"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "アイデア研究所",
  description: "サービスやゲームなどのアイデアを自動で考えます。",
};

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const user = await getAuthSession()
  return (
    <html lang="ja">
    <body className={inter.className}>
  
      <AuthProvider>
        <div className="flex min-h-full flex-col">
          <Navigation user={user} />
          <ToastProvider/>
          {/* サイドにスペースがいる場合それぞれのpage.tsxでやる */}
          {/* <main className=" px-10"> */}
          <main className="bg-gray-100 min-h-screen">
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
      </AuthProvider>
    </body>
  </html>
  );
}
export default RootLayout