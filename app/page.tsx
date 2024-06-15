

import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import ListIdeas from "@/components/ideas/ListIdeas"
import { getIdeaList } from "@/actions/idea"




const HomePage = async () => {
  
    const user = await getAuthSession()

    
    const {success,ideas} = await getIdeaList() 
  
    if (!success) {
      return (
      <div className="p-10">
        <p className="text-center ">取得に失敗しました</p>
      
      </div>)
    }
    if (ideas?.length == 0) {
      return (
        <div className="p-10">
          <p className="text-center ">表示できるアイデアがありません</p>
        
        </div>
      )
    }


    return (
      <div className=" md:p-10">
        <ListIdeas ideas={ideas} user={user}/>
      </div>
    )
  }
  
  export default HomePage