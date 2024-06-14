"use client"
import { UserType } from "@/lib/nextauth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import UserNavigation from "@/components/auth/UserNavigation"

interface NavigationProps {
  user: UserType | null
}

// ナビゲーション
const Navigation = ({user}: NavigationProps) => {
  return (
    <header className="shadow-lg shadow-gray-100 bg-blue-100">
      <div className="container mx-auto flex max-w-screen-md items-center justify-between px-2 py-3">
        <div className="flex items-center">
        <Link href="/" className="cursor-pointer text-xl font-bold">
          Idea-laB
        </Link>
        <Link href="/about" className="cursor-pointer mx-4 text-xs md:text-sm ">
          アイデア研究所とは
        </Link>
        </div>
        
        { user ? (
          // ログインしていれば表示される
          
          <UserNavigation user={user}/>
        ) :(
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild className="font-bold bg-orange-400 hover:bg-orange-200">
              <Link href="/signup">新規登録</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation
