import AnimationText from "@/components/ui/animationText";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"
const Home = () => {
  return (
    <div className="bg-gradient-to-t from-indigo-100 px-5 md:px-10 ">
      <div>
        <div className="flex items-center  mx-auto ">
        <h1 className="text-4xl md:text-8xl font-bold vertical-text">
        <AnimationText text={"アイデア研究所"} />
          </h1>
          <img src="/lab.png" alt="top-1" className="w-3/4 mx-auto" />
          
        </div>
        <h1 className="font-bold text-4xl"></h1>
        <div className="md:flex justify-between">
           <div className="mx-2">
           <Image src="/top-1.png" alt="top-1" width={500} height={300} />
            <p className="text-xl text-center  border-l-2 border-b-2 rounded-l-full ">1. アイデアを生成</p>
          </div>
          <div className="mx-2">
            <Image src="/top-2.png" alt="top-2" width={500} height={300} />
            <p className="text-xl text-center  border-l-2 border-b-2 rounded-l-full">2. アイデアを共有</p>
          </div>
          <div className="mx-2">
            <Image src="/top-3.png" alt="top-3" width={500} height={300} />
            <p className="text-xl text-center border-l-2 border-b-2 rounded-l-full">3. アイデアを磨く</p>
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
