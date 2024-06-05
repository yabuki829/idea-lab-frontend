"use server"
const fetchAPI = async (url: string, options: RequestInit) => {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    return { success: false, error: "API URLが設定されていません" }
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, options)

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


// 必要な型の定義
interface TemporarrySingupProps {
    name: string;
    email: string;
    password: string;
    rePassword: string;
  }
  
export const temporarrySingup = async ({
    name,
    email,
    password,
    rePassword,
  }: TemporarrySingupProps) => {
    // 変換する
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password: rePassword,
    });
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    // アカウント仮登録を送信
    const apiResponse = await fetch(`${process.env.API_URL}/api/auth/users/`, options);
    
    if (!apiResponse.ok) {
      const errorResponse = await apiResponse.json();
      console.error("Error response:", errorResponse); // エラー内容をコンソールに出力
      return { success: false, error: errorResponse };
    }
  
    return {
      success: true,
    };
  };
  
interface CompleteSignupProps {
    uid: string
    token: string
}

  // アカウント本登録
export const completeSignup = async ({ uid, token }: CompleteSignupProps) => {
  const body = JSON.stringify({
    uid,
    token,
  })

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }

  // アカウント本登録を送信
  const result = await fetchAPI("/api/auth/users/activation/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}
