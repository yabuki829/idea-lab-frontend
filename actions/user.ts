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

interface ResetPasswordProps {
  uid: string
  token: string
  newPassword: string
  reNewPassword: string
}
interface ForgotPasswordProps {
  email: string
}

// パスワード再設定
export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
  const body = JSON.stringify({
    email,
  })

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }

  // パスワード再設定を送信
  const result = await fetchAPI("/api/auth/users/reset_password/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}


// パスワード再設定確認
export const resetPassword = async ({
  uid,
  token,
  newPassword,
  reNewPassword,
}: ResetPasswordProps) => {
  const body = JSON.stringify({
    uid,
    token,
    new_password: newPassword,
    re_new_password: reNewPassword,
  })

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }

  // パスワード再設定確認を送信
  const result = await fetchAPI(
    "/api/auth/users/reset_password_confirm/",
    options
  )

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}


export interface UserDetailType {
  uid: string
  name: string
  email: string
  image: string | undefined
  introduction: string
  created_at: string
}

interface GetUserDetailProps {
  userId: string
}

// ユーザー詳細取得
export const getUserDetail = async ({ userId }: GetUserDetailProps) => {
  const options: RequestInit = {
    method: "GET",
    // 最新のデータが取得できる
    cache: "no-store",
  }

  // APIからユーザー詳細を取得
  const result = await fetchAPI(`/accounts/users/${userId}/`, options)
  console.log("1")
  if (!result.success) {
    console.log("2")
    console.error(result.error)
    return { success: false, user: null }
  }
  console.log("3")

  const user: UserDetailType = result.data

  return { success: true, user }
}

interface UpdateUserProps {
  accessToken: string
  name: string
  introduction: string | undefined
  avatar: string | undefined
}

// プロフィール編集
export const updateUser = async ({
  accessToken,
  name,
  introduction,
  avatar,
}: UpdateUserProps) => {
  const body = JSON.stringify({
    name,
    introduction,
    avatar,
  })

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  // プロフィール編集を送信
  const result = await fetchAPI("/api/auth/users/me/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, user: null }
  }

  const user: UserDetailType = result.data

  return { success: true, user }
}




interface UpdatePasswordProps {
  accessToken: string
  currentPassword: string
  newPassword: string
  reNewPassword: string
}

// パスワード変更する
export const updatePassword = async ({
  accessToken,
  currentPassword,
  newPassword,
  reNewPassword,
}: UpdatePasswordProps) => {
  const body = JSON.stringify({
    current_password: currentPassword,
    new_password: newPassword,
    re_new_password: reNewPassword,
  })

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  // パスワード変更を送信
  const result = await fetchAPI("/api/auth/users/set_password/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}