


import { getAuthSession } from "@/lib/nextauth"
import ListIdeas from "@/components/ideas/ListIdeas"
import { getIdeaList } from "@/actions/idea"
import LeftSidebar from "@/components/ideas/LeftSidebar"
import RightSidebar from "@/components/ideas/RightSidebar"


import { getNews } from "@/actions/idea"
import ListNews from "@/components/news/ListNews"

const NewsListPage = async () => {
  
    const user = await getAuthSession()

    
    const {success,news} = await getNews()
  
    if (!success) {
      return (
      <div className="p-10">
        <p className="text-center ">取得に失敗しました</p>
      
      </div>)
    }
  

    return (
      <div className=" w-1/2 mx-auto rounded-md md:p-10">
        <ListNews news={news} user={user}/>
        </div>
    )
  }
  
  export default NewsListPage


 