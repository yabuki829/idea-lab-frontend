

import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import DetailsIdeas from "@/components/ideas/DetailIdeas"
import { getIdeaDetail } from "@/actions/idea"


interface PostDetailPageProps {
  params: {
    ideaId: string
  }
}

const DetailsIdeaPage = async ({ params }: PostDetailPageProps) => {
  const { ideaId } = params

    const user = await getAuthSession()
  
    if (!user) {
      redirect("/login")
    }
  
    const {success,idea} = await getIdeaDetail({ideaId})


    // 失敗した場合
    if (!success) {
      return (
        <div className="text-center text-sm text-gray-500">
          投稿の取得に失敗しました
        </div>
      )
    }
    // アイデアがない場合
    if (!idea) {
      return (
        <div className="text-center text-sm text-gray-500">投稿はありません</div>
      )
    }
    
    
    return (
      <div className="p-5 md:p-10">
        
          <DetailsIdeas idea={idea} user={user}/>
        
        
        
      </div>
    )
  }
  
  export default DetailsIdeaPage