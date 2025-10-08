import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl py-4 px-20">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">NoteBase</h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn bnt-primary">
              <PlusIcon></PlusIcon>
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
