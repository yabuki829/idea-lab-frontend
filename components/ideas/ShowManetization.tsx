"use client"
import { useState } from "react"
import { UserType } from "@/lib/nextauth"
import { MonetizeIdeaType ,IdeaType} from "@/actions/idea"
interface MonetizeProps {
    monetize: MonetizeIdeaType | null
    idea:IdeaType
    user: UserType |null
}
import toast from "react-hot-toast"
import { getMonetizeIdea } from "@/actions/idea"
import Loading from "@/app/loading"

const ShowManetizeIdea =  ({ user,monetize: initialMonetize,idea }: MonetizeProps) =>  {
   
  const [isLoading, setIsLoading] = useState(false)
  const [monetize, setMonetize] = useState(initialMonetize)
 
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log("マネタイズを生成する")


      setIsLoading(true)
      try {
        const { successMonetize, post } = await getMonetizeIdea({
            accessToken: user?.accessToken,
            id: idea.id,
            isGet: false
        })

        if (!successMonetize || !post) {
            toast.error("マネタイズ生成に失敗しました")
            return
        }

        toast.success("アイデアの生成を完了しました")
        setMonetize(post)
    } catch (error) {
        console.log("失敗しました。２", error)
        toast.error("エラーが発生しマネタイズ生成に失敗しました")
    } finally {
        setIsLoading(false)
    }
}

  
  if (!monetize) {
    return (
        <div className="flex justify-center md:p-10 my-1 md:my-2">
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <Loading/>
                        <p className="text-center">生成中ですしばらくお待ちください</p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <button disabled={isLoading} type="submit" className="bg-blue-300 text-white hover:bg-blue-200 border-2 rounded-full p-3">
                            マネタイズを自動生成
                        </button>
                    </form>
                )}
            </div>
      )
  }
  return (
    <div className="w-full mx-auto bg-white  rounded-md p-5  md:p-10 my-5 md:my-10">
        <div>
          <h1 className="text-2xl font-bold">AIが生成したマネタイズ方法</h1>
            <h1>{monetize.description}</h1>
        </div>
       
        
       
    </div>
  )
}

export default ShowManetizeIdea
