"use client"

import { UserDetailType } from "@/actions/user"
import { IdeaType } from "@/actions/idea"
import Image from "next/image"
import ListIdeas from "../ideas/ListIdeas"

interface UserDetailProps {
  user: UserDetailType 
  ideas : [IdeaType]| null
}

const UserDetail = ({ user ,ideas }: UserDetailProps) => {
  return (
    <div className="w-5/6 mx-auto flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0   ">
      <div className="bg-white p-5 rounded-md w-full md:w-1/3">
       
        
          <div className="flex justify-center">
          <Image
                      src={user.image || "/default.png"}
                      alt={user.name}
                      width={100}
                      height={100}
                      className="rounded-full "
                      />
          </div>
                  
       
        <div className=""> 
          <div className="font-bold text-xl text-center">{user.name}</div>
          <br />
          <hr />
          <div className="space-y-5 break-words whitespace-pre-wrap mb-5">
            <div className="leading-relaxed text-sm">{user.introduction}</div>
          </div>
        </div>
        
   
      </div>
     
    <br />

    <ListIdeas ideas={ideas} user={user}/>
    </div>

  )
}


export default UserDetail