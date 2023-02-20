import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-neutral-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-mono">
          <Link to="/slider">
            <span className="text-neutral-400">&lt;</span>BoxSlider<span className="text-neutral-400">&gt;</span>
          </Link>
        </h1>
      </div>
    </header>
  )
}
