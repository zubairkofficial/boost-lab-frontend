import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled ❌</h1>
        <p className="text-lg text-gray-700 mb-6">
          It looks like your payment was not completed.
        </p>
        <Link to="/plans" className="text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded">
          Try Again
        </Link>
      </div>
    </div>
  );
}
