"use client"
import { UserType } from "@/lib/nextauth"
import { NewsType } from "@/actions/idea"
import { useRouter } from "next/navigation"
interface NewsProps {
    news: [NewsType] | null
    user: UserType | null
}
import toast from "react-hot-toast"
const ListNews =  ({ user,news }: NewsProps) =>  {
   
  const router = useRouter()


  // TODO 詳細画面に行く際にuserがnullであればログインのアラートを表示するべきかか考える
  const handleDetailClick = (id: string) => {
    // if (!user) {
    //     toast.error("ログインすることで詳細を見ることができます。")
    //   return
    // }
    router.push(`/news/${id}`)
  }
  return (
    <div className="w-full mx-auto">
        <div className=" list-disc  divide-y divide-gray-400 ">
            {news?.map((data) => (
            <div 
                key={data.id} 
                className=" cursor-pointer  bg-white p-5 "
                onClick={() => handleDetailClick(data.id)}
            >
            
                <h3 className="text-xl font-bold">{data.title}</h3>
                
                <p className="mt-2 truncate">{data.content}</p>
               
            </div>
            
            ))}
        </div>
    </div>
    
  )
}

export default ListNews
