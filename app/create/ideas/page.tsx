import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import Profile from "@/components/settings/Profile"
import CreateIdeas from "@/components/ideas/CreateIdeas"

const ProfilePage = async () => {
    // 認証情報取得
    const user = await getAuthSession()
  
    if (!user) {
      redirect("/login")
    }
  
    
    return <div className="p-5 md:p-10"><CreateIdeas user={user}/></div>
  }
  
  export default ProfilePage