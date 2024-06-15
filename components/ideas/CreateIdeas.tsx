"use client"
import { useState } from "react"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getGenerateIdea, postIdea } from "@/actions/idea"
import { UserType } from "@/lib/nextauth"
import Loading from "@/app/loading"

// form のルールを定義
const schema = z.object({
    title: z.string().min(2,{message:"タイトルは2文字以上以内で入力してください"}).max(255,{message:"タイトルは255文字以内で入力してください"}),
    tag:z.string().min(1,{message:"タグは1文字以上以内で入力してください"}).max(30,{message:"タイトルは30文字以内で入力してください"}),
    description: z.string().min(2,{message:"アイデアは2文字以上で入力してください"}),
})


const schema_2 = z.object({
  idea: z.string().min(1,{message:"単語は1文字以上で入力してください"}).max(30,{message:"単語は30文字以内で入力してください"}),
  
})

// formの型を定義する
type InputType = z.infer<typeof schema>
type IdeaCreateInputType = z.infer<typeof schema_2>

interface PostIdeaProps {
    user: UserType
}

  
const CreateIdeas =  ({ user }: PostIdeaProps) =>  {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<InputType>({
        resolver: zodResolver(schema),
        defaultValues: {
            title:"",
            tag:"アイデア",
            description:""
        }
    })

  const ideaCreateForm = useForm<IdeaCreateInputType>({
      resolver: zodResolver(schema_2),
      defaultValues: {
       idea: ""
      }
  })

    const onSubmit: SubmitHandler<InputType> = async (data) => {
        console.log("投稿する")
          setIsLoading(true)
          try {
                // 投稿する 
                const res = await postIdea({
                    accessToken: user.accessToken,
                    title: data.title,
                    tag:data.tag,
                    description: data.description
                })
                
                if (!res.success || !res.post) {
                  
                    toast.error("投稿に失敗しました")
                    return
                }
                console.log(res.post)
                toast.success("投稿しました")
                router.push(`/idea/${res.post.id}`)
                router.refresh()
                        
            } catch (error) {
              console.log("失敗しました。２",error)
              toast.error("エラーが発生し投稿に失敗しました")
            } finally {
              setIsLoading(false)
            }
      }

      // 自動生成
      const handleAutoGenerateClick: SubmitHandler<IdeaCreateInputType> = async (data) => {
        setIsLoading(true)
        // 自動生成して取得できたものを登録する

        const  {success, idea} = await getGenerateIdea({
          accessToken: user.accessToken,
          word:data.idea
        })
        if (success) {
          form.setValue("title", idea?.title ?? "" )
          form.setValue("tag", "アイデア" ?? "テスト")
          form.setValue("description", idea?.description ?? "取得できてない")
        }
      
        setIsLoading(false)
        
      }
  return (
    <>
      {isLoading ? (
          <>
            
            <Loading/>
            <p className="text-center">生成中ですしばらくお待ちください</p>
          </>) : (
            <div className="md:w-1/2 mx-auto bg-white rounded-md p-5">
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>タイトル</FormLabel>
                      <FormControl>
                        <Input placeholder="タイトル" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="タグ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea className="h-32" placeholder="255文字以内で入力してください" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                    <Button disabled={isLoading} type="submit" className=" bg-blue-400 hover:bg-blue-300">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    投稿する
                    </Button>
                </div>
              </form>
        </Form>

        
         </div>)}
         <div className="w-1/2 mx-auto">
          <div className="pt-3">
            <p className="text-center " >※自動生成できるのは現在１日一回のみです</p>
            

            <Form {...ideaCreateForm}>
            <form onSubmit={ideaCreateForm.handleSubmit(handleAutoGenerateClick)} className="space-y-5">
              <FormField
                name="idea"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="単語を入力してください" {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center py-5">
                <button disabled={isLoading} type="submit" className="px-2 py-1 bg-green-300">
                  自動生成
                </button>
              </div>
            </form>
          </Form>
            
          </div>
         </div>
         
       
    </>
   

        
       
  )
}

export default CreateIdeas
