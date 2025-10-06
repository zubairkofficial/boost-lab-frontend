import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <div className="bg-[#063241]">
        <footer className="w-full p-4 sm:p-10 bg-[#063241] sticky bottom-0">
          <div className="flex justify-center flex-col sm:flex-row gap-5 sm:gap-10 text-sm font-normal text-white cursor-pointer">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
