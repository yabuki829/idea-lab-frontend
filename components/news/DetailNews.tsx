"use client"
import { useState } from "react"
import { UserType } from "@/lib/nextauth"
import { NewsType } from "@/actions/idea"
interface NewsProps {
    data: NewsType | null
}

const DetailsNews =  ({ data }: NewsProps) =>  {
   
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div className="md:w-2/3 mx-auto bg-white  rounded-md p-5  md:p-10">
        <div>
          <h1 className="font-bold text-2xl md:text-4xl ">{data?.title}</h1>  
          <p className="text-gray-500">投稿日 {data?.created_at}</p>
          <hr />
          <br />
          <p>{data?.content}</p>
          <br />
         
         
        </div>
        
       
    </div>
  )
}

export default DetailsNews
