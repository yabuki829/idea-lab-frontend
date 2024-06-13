"use server"
import { UserType } from "@/lib/nextauth"
// アイデアの投稿や編集、アイデアへのコメントを行うメソッドをまとめたファイル

const fetchAPI = async (url: string, options: RequestInit) => {
  const backendUrl = process.env.API_URL

  try {
    console.log(backendUrl,url)
    const response = await fetch(`${backendUrl}${url}`, options)

    if (!response.ok) {
      return { success: false, error: "APIでエラーが発生しました" }
    }

    // Content-Type ヘッダーが application/json の場合のみ、JSON を解析する
    const contentType = response.headers.get("Content-Type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      return { success: true, data }
    }

    // データなしで成功を返す
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "ネットワークエラーが発生しました" }
  }
}

// ideaの一覧表示
export interface IdeaType {
    id: string
    user: UserType
    title: string
    tag:string
    description: string
    updated_at: string
    created_at: string
  }



// アイデアの投稿
interface CreatePostType {
    accessToken: string
    title: string
    tag:string
    description: string
    
}


export const postIdea = async ({
    accessToken,
    title,
    tag,
    description,
  }: CreatePostType) => {
    const body = JSON.stringify({
      title: title,
      tag: tag,
      description: description,
    })
  
    const options = {
      method: "POST",
      headers: {
        Authorization: `JWT ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    }


    const result = await fetchAPI("/api/posts/", options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, post: null }
    }

    const post: IdeaType = await result.data

    return { success: true, post }
    
}
// アイデアの詳細の取得
// 引数: ideaId

export const getIdeaDetail = async ({ ideaId }: { ideaId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // 投稿詳細取得
  const result = await fetchAPI(`/api/idea-detail/${ideaId}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, idea: null }
  }
  const idea: IdeaType = result.data

  return { success: true, idea }
}


// 一覧を取得する
export const getIdeaList = async ({ ideaId }: { ideaId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

}


// アイデアの自動生成

interface createIdeaWithAIType {
}
