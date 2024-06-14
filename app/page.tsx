

import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import ListIdeas from "@/components/ideas/ListIdeas"
import { getIdeaList } from "@/actions/idea"




const HomePage = async () => {
  
    const user = await getAuthSession()
  
    // if (!user) {
    //   redirect("/login")
    // }
    
    // ここで一覧を取得する
    // 一覧表示だけはログインしなくても見れるようにする？
    
    const {success,ideas} = await getIdeaList() 
    if (!success) {
      return (
      <div className="p-10">
        <p className="text-center ">取得に失敗しました</p>
      
      </div>)
    }
    if (ideas == null) {
      return (
        <div className="p-10">
          <p className="text-center ">表示できるアイデアがありません</p>
        
        </div>
      )
    }
    return (
      <div className="p-5 md:p-10">
      
        <ListIdeas ideas={ideas} user={user}/>
      </div>
    )
  }
  
  export default HomePage