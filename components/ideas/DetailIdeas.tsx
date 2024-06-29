"use client"
import { useState } from "react"
import { UserType } from "@/lib/nextauth"
import { IdeaType } from "@/actions/idea"
interface IdeaProps {
    idea: IdeaType | null
    user: UserType |null
}
import Image from "next/image"
import Link from "next/link"
const DetailsIdeas =  ({ user,idea }: IdeaProps) =>  {
   
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div className="w-full mx-auto bg-white  rounded-md p-5  md:p-10">
        <div>
          <h1 className="font-bold text-2xl md:text-4xl ">{idea?.title}</h1>  
          <p className="text-gray-500">投稿日 {idea?.created_at}</p>
          <hr />
          <br />
          <p>{idea?.description}</p>
          <br />
          <Link
            href={"/tags/"+idea?.tag}
            className="bg-green-300 text-gray-500 border border-gray-500 rounded-full px-2 py-1 text-xs"
          >
            {idea?.tag}
          </Link>
          <div className="flex justify-end items-center ">
            <div className="relative w-10 h-10 flex-shrink-0 ">
              <Image src={idea?.user.image || "/default.png"}
                        className="rounded-full object-cover border"
                        alt={idea?.user.name || "avatar"}
                        fill
                    />
            </div>
        
            <h1 className="mx-4">{idea?.user.name}</h1>
            
          </div>
         
        </div>
        
       
    </div>
  )
}

export default DetailsIdeas
