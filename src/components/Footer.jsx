import { CONTACT } from '../data/resume'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 text-sm text-navy-500">
        <span className="font-display text-navy-300">
          &copy; {new Date().getFullYear()} {CONTACT.name}
        </span>
      </div>
    </footer>
  )
}
