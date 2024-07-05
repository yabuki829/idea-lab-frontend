"use server"
import { UserType } from "@/lib/nextauth"
// アイデアの投稿や編集、アイデアへのコメントを行うメソッドをまとめたファイル

const fetchAPI = async (url: string, options: RequestInit) => {
  const backendUrl = process.env.BACKEND_URL

  try {
    console.log(backendUrl,)
    console.log(url)
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

export const getIdeaDetail = async ({ ideaId,token }: { ideaId: string, token:string|undefined }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
    
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json",
    }
    
  }


  // 投稿詳細取得
  const result = await fetchAPI(`/api/idea/${ideaId}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, idea: null }
  }
  const idea: IdeaType = result.data

  return { success: true, idea }
}


// 一覧を取得する
export const getIdeaList = async (page: number) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  };
  const result = await fetchAPI(`/api/idea/list/?page=${page}`, options);
  
  if (!result.success) {
    console.error(result.error);
    return { success: false, ideas: [] };
  }

  const ideas: IdeaType[] = result.data.results;
  return { success: true, ideas };
};


// アイデアの自動生成

interface CreateIdeaWithAIType {

  title: string
  description:string
}

interface PostCreateIdeaWithAIType {
  accessToken: string
  word:string
}

export const getGenerateIdea = async ({accessToken,word}:PostCreateIdeaWithAIType) => {

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  }

  
  const result = await fetchAPI(`/api/generate/idea/`, options)

  if (!result.success) {
    console.error(result.error)
    
    return { success: false, idea: null }
  }


  const idea: CreateIdeaWithAIType = result.data

  return { success: true, idea }
}


export interface NewsType {
  id:string
  title: string
  content:string
  created_at: string

}
// お知らせの一覧を取得する
export const getNews = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
    
  }
  const result = await fetchAPI(`/api/news/`, options)
  
  if (!result.success) {
    console.error(result.error)
    
    return { success: false, news: null }
  }

  const news: [NewsType] = result.data
  return { success: true, news }
}



export interface TagType {
  id:string
  title: string


}
//tagの一覧を取得する
export const getTags = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
    
  }
  const result = await fetchAPI(`/api/tags/`, options)
  
  if (!result.success) {
    console.error(result.error)
    
    return { success: false, tags: null }
  }

  const tags: [TagType] = result.data
  return { success: true, tags }
}


export const getINewsDetail = async ({ newsId }: { newsId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
    
  }

  // 投稿詳細取得
  console.log(newsId)
  const result = await fetchAPI(`/api/news/${newsId}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, data: null }
  }
  const data: NewsType = result.data

  return { success: true, data }
}




export const getIdeaWithTag = async ({ tagTitle }: { tagTitle: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
    
  }

  // 投稿詳細取得
  const result = await fetchAPI(`/api/tags/${tagTitle}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, ideas: null }
  }
  const ideas: [IdeaType] = result.data

  return { success: true, ideas}
}

// 自分のアイデアを取得する
export const getUserIdea = async ({ userId }: { userId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
    
  }

  // 投稿詳細取得
  const result = await fetchAPI(`/api/user/${userId}/idea/`, options)

  if (!result.success) {
    console.error(result.error)
    return { successUserIdea: false, ideas: null }
  }
  const ideas: [IdeaType] = result.data

  return { successUserIdea: true, ideas}
}

export const getRecommendedIdeas= async ({ accessToken }: { accessToken:string|undefined}) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
  }

  // 投稿詳細取得
  const result = await fetchAPI(`/api/idea/recommend/`, options)

  if (!result.success) {
    console.error(result.error)
    return { successRecommendIdea: false, recommendedIdeas: null }
  }
  const recommendedIdeas: [IdeaType] = result.data

  return { successRecommendIdea: true, recommendedIdeas}
}