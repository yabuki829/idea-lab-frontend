"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { UserType } from "@/lib/nextauth"
import Link from "next/link"
import Image from "next/image"
  
interface UserNavigationProps {
    user: UserType
}

const UserNavigation = ( { user }: UserNavigationProps ) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="relative w-10 h-10 flex-shrink-0">
                    <h1>{user.name}</h1>
                </div>
                
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href={`/user/${user.uid}`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <div className="break-words">
                        <div className="mb-2">{user.name || ""}</div>
                        <div className="text-gray-500">{user.email || ""}</div>
                        </div>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <Link href="/post/new">
                    <DropdownMenuItem className="cursor-pointer">
                        新規投稿
                    </DropdownMenuItem>
                </Link>

                <Link href="/settings/profile">
                    <DropdownMenuItem className="cursor-pointer">
                        アカウント設定
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuItem onSelect={async () => { await signOut({ callbackUrl: "/" })}} className="text-red-600 cursor-pointer">
                    ログアウト
                </DropdownMenuItem>




            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNavigation