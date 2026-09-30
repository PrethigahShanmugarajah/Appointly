import { Link } from "react-router-dom";

const LegalLinks = () => {
  return (
    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
      <Link to="/privacy" className="hover:text-blue-600 transition-colors">
        Privacy Policy
      </Link>

      <Link to="/terms" className="hover:text-blue-600 transition-colors">
        Terms of Services
      </Link>
    </div>
  );
};

export default LegalLinks;
