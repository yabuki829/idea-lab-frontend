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
import { Loader2 } from "lucide-react"

import toast from "react-hot-toast"
import Link from "next/link"
import { temporarrySingup } from "@/actions/user"

// form のルールを定義
const schema = z.object({
    name: z.string().min(2,{message:"2文字以上入力する必要があります。"}),
    email: z.string().email({message:"メールアドレスではありません。"}),
    password: z.string().min(8,{message:"8文字以上入力する必要があります。"})
})

// formの型を定義する
type InputType = z.infer<typeof schema>

export const Signup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    // フォーム
    const form = useForm<InputType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name:"No Name",
            email:"",
            password:""
        }
    })

    // ボタンを押した時の処理を行う
    const onSubmit: SubmitHandler<InputType> = async (data) => {
      console.log("仮登録を行います１")
        setIsLoading(true)
        try {
            // アカウント仮登録
          
            const res = await temporarrySingup({
              name: data.name,
              email: data.email,
              password: data.password,
              rePassword: data.password,
            })
      
            if (!res.success) {
              console.log("失敗しました1。")
              toast.error("サインアップに失敗しました")
              if (res.error) {
                console.error("Signup error:", res.error); 
              }
              return
            }
      
            setIsSignUp(true)
          } catch (error) {
            console.log("失敗しました。２")
            toast.error("サインアップに失敗しました")
          } finally {
            setIsLoading(false)
          }
    }
    return (
        <div className="max-w-[400px] m-auto">
        {isSignUp ? (
          // 成功した場合仮登録完了と表示する
          <>
            <div className="text-2xl font-bold text-center mb-10">仮登録完了</div>
            <div className="">
              アカウント本登録に必要なメールを送信しました。
              <br />
              メールのURLより本登録画面へ進んでいただき、本登録を完了させてください。
              <br />
              ※メールが届かない場合、入力したメールアドレスが間違っている、もしくは迷惑メールの中にはいってい可能性があります。
              <br />
              お手数ですが、再度、新規登録からやり直してください。
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-center mb-10">新規登録</div>
  
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名前</FormLabel>
                      <FormControl>
                        <Input placeholder="名前" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input placeholder="xxxx@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>パスワード</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <div className="text-sm text-gray-500">
                  サインアップすることで、利用規約、プライバシーポリシーに同意したことになります。
                </div>
  
                <Button disabled={isLoading} type="submit" className="w-full bg-blue-400 hover:bg-blue-300">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  アカウント作成
                </Button>
              </form>
            </Form>
  
            <div className="text-center mt-5">
              <Link href="/login" className="text-sm text-blue-500">
                すでにアカウントをお持ちの方
              </Link>
            </div>
          </>
        )}
      </div>
    )
}
