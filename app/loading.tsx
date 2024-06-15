import { Loader2 } from "lucide-react"

// ローディング
const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  )
}

export default Loading  