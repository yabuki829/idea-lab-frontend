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
  
    return <Signup/>
  }
  
  export default SignupPage
