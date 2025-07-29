import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful ✅</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you! Your subscription is now active.
        </p>
        <Link to="/dashboard" className="text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
