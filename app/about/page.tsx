
import AnimationText from "@/components/ui/animationText";
import Image from "next/image";
import Link from "next/link"
const Home = () => {
  return (
    <div className=" bg-gradient-to-t from-indigo-100 px-5 md:px-10 ">
      <div>
        <div className="flex items-center  mx-auto ">
        <h1 className="text-4xl md:text-8xl font-bold vertical-text">
        <AnimationText text={"アイデア研究所"} />
          </h1>
          <img src="/lab.png" alt="top-1" className="w-3/4 mx-auto" />
          
        </div>
        <h1 className="font-bold text-4xl"></h1>
        <div className="">
           <div className="flex justify-center ">
           <div className="mx-2">
            <Image src="/post.png" alt="top-1" width={500} height={300} />
            <div className="block md:hidden text-center">
              <p className="text-2xl  font-bold ">AIがアイデアの生成をお手伝い</p>
              <p>話題のChatGPTがあなたのアイデアの生成をお手伝いします。</p>
              <p>好きな単語を入力し、自動生成を押すだけで簡単アイデア生成</p>
             </div>
            
            </div>
            <div className="flex-col  justify-center items-center w-1/2 items-center bg-yellow-300 rounded-full m-10 hidden md:flex">
              <h1 className="font-bold text-sm md:text-3xl text-center ">AIがアイデアの生成をお手伝い</h1>
              <div className="mx-auto w-2/3">
                <p>話題のChatGPTがあなたのアイデアの生成をお手伝いします。</p>

                <p>好きな単語を入力し、自動生成を押すだけで簡単アイデア生成</p>
              </div>
              <br />
              <Link className="bg-blue-300 px-10 py-2 rounded-md text-white" href="/login">ログイン</Link>
            </div>
           </div>
    

           <div className="flex justify-center my-20 ">
           
            <div className="flex-col  justify-center items-center w-1/2 items-center bg-blue-200 rounded-full mx-20 my-10 hidden md:flex">
              <h1 className="font-bold text-sm md:text-3xl text-center ">みんなのアイデアを見よう</h1>
              <div className="mx-auto w-2/3 text-center">
                <p>みんなのアイデアを見て刺激を受けよう</p>

                <p>他の人のアイデアを見ることで新しいアイデアが浮かぶかも</p>
              </div>
              <br />
              <Link className="bg-orange-400 text-white px-10 py-2 rounded-md" href="/login">ログイン</Link>
            </div>
            
            <div className="mx-2">
            <Image src="/idea.png" alt="top-1" width={500} height={300} />
            <div className="block md:hidden text-center">
              <p className="text-2xl  font-bold ">みんなのアイデアを見よう</p>
              <p>みんなのアイデアを見て刺激を受けよう</p>
              <p>他の人のアイデアを見ることで新しいアイデアが浮かぶかも</p>
             </div>
            
            </div>
           </div>
          <br />


          <div className="flex justify-center ">
           <div className="mx-2">
              <Image src="/monetize.png" alt="top-1" width={500} height={300} />
             <div className="block md:hidden text-center">
              <p className="text-2xl  font-bold ">AIがマネタイズの生成をお手伝い</p>
              <p>ChatGPTがマネタイズを考えるのをお手伝い</p>
              <p>ボタンを押すだけ簡単生成</p>
             </div>
            </div>
            <div className="flex-col  justify-center items-center w-1/2 items-center bg-red-300 rounded-full mx-20 my-10 hidden md:flex">
              <h1 className="font-bold text-sm md:text-3xl text-center ">AIがマネタイズの生成をお手伝い</h1>
              <div className="mx-auto w-2/3 text-center">
                <p>ChatGPTがマネタイズを考えるのをお手伝い</p>

                <p>ボタンを押すだけ簡単生成</p>
                
              </div>
              <br />
              <Link className="bg-green-200 px-10 py-2 rounded-md" href="/login">ログイン</Link>
            </div>
           </div>
        </div>
      </div>

      
      <br />
      <div>
        <div>
          
        </div>
        <div>
          
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Home;
