import { getAuthSession } from "@/lib/nextauth"
import ListIdeas from "@/components/ideas/ListIdeas"
import { getIdeaList } from "@/actions/idea"
import LeftSidebar from "@/components/ideas/LeftSidebar"
import RightSidebar from "@/components/ideas/RightSidebar"
import ListIdeasWrapper from "@/components/ideas/ListIdeaWrapper"




const HomePage = async () => {
  
    const user = await getAuthSession()

    
    const {success,ideas} = await getIdeaList(1) 
  
    if (!success) {
      return (
      <div className="p-10">
        <p className="text-center ">取得に失敗しました</p>
      
      </div>)
    }


    return (
      <div className=" flex flex-col  md:flex-row md:space-x-12 space-y-0  md:p-10">
         <div className="hidden md:block  md:w-1/6">
          <LeftSidebar/>
         
        </div>
        <div className="flex-1 ">
        <ListIdeasWrapper initialIdeas={ideas} user={user} />
        </div>
        <div className="w-full md:w-1/4">
          <RightSidebar/>
        </div>
    </div>
    )
  }
  
  export default HomePage


 