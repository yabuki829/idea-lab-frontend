import { getNews } from "@/actions/idea"

// サイドナビゲーション お知らせを表示する
const RightSidebar = async () => {
//   お知らせはadminから投稿する
  const {success,news} = await getNews()
  return (
   <div>
    <h1 className="bg-blue-100  text-center font-bold">最近のお知らせ</h1>
     <nav className="bg-white rounded-md p-4">
     {news?.map((data) => (
      <div key={data.id}>
      <a className="px-2 py-1  text-gray-500 m-2" href="">
        {data.title}
        </a>
        <hr />
      </div>
        
     ))}
    
    </nav>
   </div>
  )
}

export default RightSidebar