
import { useEffect, useId, useState } from "react"
import { LoaderCircleIcon, SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function SearchInput() {
  const id = useId()
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
    setIsLoading(false)
  }, [inputValue])

  return (
      <div className="relative">
        <Input
          id={id}
          className="ps-9 pe-9 h-7 rounded-md"
          placeholder="Search..."
          type="search"
          size={10}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )}
        </div>
        {/* <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Press to speak"
          type="submit"
        >
          <MicIcon size={16} aria-hidden="true" />
        </button> */}
      </div>
  )
}
