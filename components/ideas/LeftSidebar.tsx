import {  getTags } from "@/actions/idea"
import Link from "next/link"
const LeftSidebar = async () => {
   // 
   const {success,tags} = await getTags()
  return (
   <div>
    <h1 className="bg-blue-100  text-center font-bold">タグ一覧</h1>
     <nav className="bg-white rounded-md p-2">
      <div className="flex flex-wrap gap-1">
        {tags?.map((tag) => (
          <Link
            key={tag.id}
            href={""}
            className="bg-green-300 text-gray-500 border border-gray-500 rounded-full px-2 py-1 text-xs"
          >
            {tag.title}
          </Link>
        ))}
      </div>
    </nav>
   </div>
  )
}

export default LeftSidebar