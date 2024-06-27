import { getAuthSession } from "@/lib/nextauth"
import ListIdeas from "@/components/ideas/ListIdeas"
import { getIdeaWithTag } from "@/actions/idea"
import LeftSidebar from "@/components/ideas/LeftSidebar"
import RightSidebar from "@/components/ideas/RightSidebar"


interface TagIdeaListPageProps {
    params: {
      tagTitle: string
    }
  }

// 特定のタグの投稿のリストを表示する
const TagIdeaListPage = async ({ params }: TagIdeaListPageProps) => {
    
    const user = await getAuthSession()
    const { tagTitle } = params
    console.log(tagTitle); // デバッグ用ログ
    
    const {success,ideas} = await getIdeaWithTag({tagTitle}) 
  
    if (!success) {
      return (
      <div className="p-10">
        <p className="text-center ">取得に失敗しました</p>
      
      </div>)
    }



    return (
      <div className=" flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0  md:p-10">
         <div className="hidden md:block  md:w-1/6">
          <LeftSidebar/>
         
        </div>
        <div className="flex-1 ">
          <ListIdeas ideas={ideas} user={user}/>
        </div>
        <div className="w-full md:w-1/4">
          <RightSidebar/>
        </div>
    </div>
    )
  }
  
  export default TagIdeaListPage


 