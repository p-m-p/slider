import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-neutral-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-mono">
          <Link to="/slider">
            <img src="/logo-small.webp" alt="Box slider" width="150" height="33" />
          </Link>
        </h1>
      </div>
    </header>
  )
}
