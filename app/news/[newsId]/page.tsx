

import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import DetailsIdeas from "@/components/ideas/DetailIdeas"
import { getINewsDetail } from "@/actions/idea"
import DetailsNews from "@/components/news/DetailNews"


interface NewsDetailPageProps {
  params: {
    newsId: string
  }
}

const DetailNewsPage = async ({ params }: NewsDetailPageProps) => {
  const { newsId } = params

    const user = await getAuthSession()
  
   
    console.log(newsId)
    const {success,data} = await getINewsDetail({newsId})


    // 失敗した場合
    if (!success) {
      return (
        <div className="text-center text-sm text-gray-500">
          投稿の取得に失敗しました
        </div>
      )
    }
    // アイデアがない場合
    if (!data) {
      return (
        <div className="text-center text-sm text-gray-500">投稿はありません</div>
      )
    }
    
    
    return (
      <div className="p-5 md:p-10 ">
        
          <DetailsNews data={data}/>
        
        
      </div>
    )
  }
  
  export default DetailNewsPag