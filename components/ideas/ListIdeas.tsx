"use client"
import { UserType } from "@/lib/nextauth"
import { IdeaType } from "@/actions/idea"
import { UserDetailType } from "@/actions/user"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
interface IdeaProps {
    ideas: [IdeaType] | null
    user: UserType | null | UserDetailType
}
import Image from "next/image"
import Link from "next/link"

const ListIdeas =  ({ user,ideas }: IdeaProps) =>  {
  const router = useRouter()
  // TODO 詳細画面に行く際にuserがnullであればログインのアラートを表示する
  const handleDetailClick = (id: string) => {
    if (!user) {
        toast.error("ログインすることで詳細を見ることができます。")
      return
    }
    router.push(`/idea/${id}`)
  }

  if (ideas?.length == 0) {
    return (
      <div className="p-10">
        <p className="text-center ">表示できるアイデアがありません</p>
      
      </div>
    )
  }


  return (
    <div className="w-full mx-auto">
        <div className=" list-disc  divide-y divide-gray-400">
            {ideas?.map((idea) => (
            <div 
                key={idea.id} 
                className=" cursor-pointer  bg-white p-5 "
                onClick={() => handleDetailClick(idea.id)}
            >
            
                <div className="flex items-center">
               
                    <Image
                        src={idea.user.image || "/default.png"}
                        alt={idea.user.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                        />
                        <h3 className="text-xl font-bold">{idea.user.name}</h3>
                <div>
                   
                </div>
                
                </div>
                <h3 className="text-xl font-bold">{idea.title}</h3>
                
                {/* <p className="mt-2">{idea.description}</p> */}
                <Link
                  href={"/tags/"+idea?.tag}
                  className="bg-green-300 text-gray-500 border border-gray-500 rounded-full px-2 py-1 text-xs"
                >
                  {idea?.tag}
                </Link>
            </div>
            
            ))}
        </div>
    </div>
    
  )
}

export default ListIdeas
