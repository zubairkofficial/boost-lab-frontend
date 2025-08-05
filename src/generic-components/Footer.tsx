import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
         <div className="bg-[#063241]">
        <footer className="w-full p-10 bg-[#063241] sticky bottom-0">
          <div className="flex justify-center gap-10 text-sm font-semibold text-cyan-300">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
