"use client"
import { useState } from "react"
import { UserType } from "@/lib/nextauth"
import { IdeaType } from "@/actions/idea"
interface IdeaProps {
    idea: IdeaType | null
    user: UserType
}
import Image from "next/image"

const DetailsIdeas =  ({ user,idea }: IdeaProps) =>  {
   
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div className="md:w-2/3 mx-auto bg-white  rounded-md p-5  md:p-10">
        <div>
          <h1 className="font-bold text-2xl md:text-4xl ">{idea?.title}</h1>  
          <p className="text-gray-500">投稿日 {idea?.created_at}</p>
          <hr />
          <br />
          <p>{idea?.description}</p>
          <br />
          <button><p className="px-2  bg-gray-200 text-gray-600 rounded-md">{idea?.tag}</p></button>
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
