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
        <Link href="/" className="cursor-pointer text-xl font-bold">
          Idea-laB
        </Link>

        { user ? (
          // ログインしていれば表示される
          <UserNavigation user={user}/>
        ) :(
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild variant="default" className="font-bold">
              <Link href="/signup">新規登録</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation
