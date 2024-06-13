import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import CreateIdeas from "@/components/ideas/CreateIdeas"

const CreateIdeaPage = async () => {
    // 認証情報取得
    const user = await getAuthSession()
  
    if (!user) {
      redirect("/login")
    }
  
    
    return <div className="p-5 md:p-10"><CreateIdeas user={user}/></div>
  }
  
  export default CreateIdeaPage