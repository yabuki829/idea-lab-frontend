

import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import DetailsIdeas from "@/components/ideas/DetailIdeas"
import { getIdeaDetail,getRecommendedIdeas,getMonetizeIdea } from "@/actions/idea"
import ListIdeas from "@/components/ideas/ListIdeas"
import LeftSidebar from "@/components/ideas/LeftSidebar"
import ShowManetizeIdea from "@/components/ideas/ShowManetization"


interface PostDetailPageProps {
  params: {
    ideaId: string
  }
}

const DetailsIdeaPage = async ({ params }: PostDetailPageProps) => {
  const { ideaId } = params

    const user = await getAuthSession()
  
    
    
    const {success,idea} = await getIdeaDetail({ideaId,token:user?.accessToken} )
    const {successRecommendIdea,recommendedIdeas} = await getRecommendedIdeas( {accessToken: user?.accessToken} )
    let monetize = null

    if (success && idea) {
      const { successMonetize, post } = await getMonetizeIdea({ accessToken: user?.accessToken, id: idea?.id || "", isGet: true })
      if (successMonetize) {
        
        monetize = post
      }
    }
    // ここで取得する

    // 失敗した場合
    if (!success) {
      return (
        <div className="text-center text-sm text-gray-500 py-10">
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
      <div className=" flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0  md:p-10">
         <div className="hidden md:block md:w-1/6">
          <LeftSidebar/>
        </div>
        
          <div className="flex-1">
          <DetailsIdeas idea={idea} user={user}/>
          <ShowManetizeIdea idea={idea} user={user} monetize={monetize}/>
          </div>
          <div className="w-full md:w-1/4 bg-white">
            <h1 className="text-center  font-bold text-black bg-blue-100">おすすめの投稿</h1>
          <ListIdeas ideas={recommendedIdeas} user={user}/>
          </div>
      </div>
    )
  }
  
  export default DetailsIdeaPage