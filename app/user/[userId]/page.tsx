import { getUserDetail } from "@/actions/user"
import { getUserIdea } from "@/actions/idea"
import UserDetail from "@/components/user/UserDetail"

interface UserDetailPageProps {
  params: {
    userId: string
  }
}

// ユーザー詳細ページ
const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  const { userId } = params
  // ユーザー投稿詳細取得
  console.log("userid:",userId)
  const { success, user } = await getUserDetail({ userId })

  const { successUserIdea,ideas } = await getUserIdea({userId})

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        ユーザーの取得に失敗しました
      </div>
    )
  }
  if (!user) {
    return (
      <div className="text-center text-sm text-gray-500">
        ユーザーは存在しません
      </div>
    )
  }

  
  return <div className="p-5 md:p-10"><UserDetail user={user} ideas={ideas} /></div>
}

export default UserDetailPage