"use client"
import { UserType } from "@/lib/nextauth"
import { IdeaType } from "@/actions/idea"
import { useRouter } from "next/navigation"
interface IdeaProps {
    ideas: [IdeaType] | null
    user: UserType | null
}
import Image from "next/image"
import toast from "react-hot-toast"
const ListIdeas =  ({ user,ideas }: IdeaProps) =>  {
   
  const router = useRouter()


  // TODO 詳細画面に行く際にuserがnullであればログインのアラートを表示する
  const handleDetailClick = (id: string) => {
    // if (!user) {
    //     toast.error("ログインすることで詳細を見ることができます。")
    //   return
    // }
    router.push(`/idea/${id}`)
  }
  return (
    <div className="md:w-1/2 mx-auto">
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
                
                <p className="mt-2">{idea.description}</p>
                <button><p className="px-2  bg-gray-200 text-gray-600 rounded-md">{idea.tag}</p></button>
            </div>
            
            ))}
        </div>
    </div>
    
  )
}

export default ListIdeas