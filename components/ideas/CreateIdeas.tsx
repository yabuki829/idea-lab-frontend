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
import { postIdea } from "@/actions/idea"
import { UserType } from "@/lib/nextauth"
import Loading from "@/app/loading"
// form のルールを定義
const schema = z.object({
    title: z.string().min(2,{message:"タイトルは2文字以上以内で入力してください"}).max(255,{message:"タイトルは255文字以内で入力してください"}),
    tag:z.string().min(1,{message:"タグは1文字以上以内で入力してください"}).max(30,{message:"タイトルは30文字以内で入力してください"}),
    description: z.string().min(2,{message:"アイデアは2文字以上で入力してください"}).max(255,"255文字以内で入力してください"),
})

// formの型を定義する
type InputType = z.infer<typeof schema>

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
  return (
    <>
             {isLoading ? (
          <>
            <Loading/>
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
    </>
   

        
       
  )
}

export default CreateIdeas
