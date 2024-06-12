import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import { Signup } from "@/components/auth/Signup"


const SignupPage = async () => {
    // 認証情報取得
    const user = await getAuthSession()

    // ログインしていればホームに戻る
    if (user) {
      redirect("/")
    }
  
    return <div className="p-5 md:p-10"><Signup/></div>
  }
  
  export default SignupPage
