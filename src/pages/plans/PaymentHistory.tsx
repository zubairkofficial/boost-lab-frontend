import { useEffect, useState } from "react";
import axios from "axios";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: number;
  description: string;
  email: string | null;
  paymentMethod: string;
}

const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/plans/payment-history`
        );
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto backdrop-blur-md bg-white/10 rounded-xl shadow-lg">
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-300">No payments found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-300/20 rounded-lg">
          <table className="min-w-full text-sm text-left text-white">
            <thead className="bg-white/10 text-xs uppercase text-gray-300">
              <tr>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200/10">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-white/10 transition duration-200"
                >
                  <td className="px-4 py-3">
                    ${(payment.amount / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{payment.email || "N/A"}</td>
                  <td className="px-4 py-3 capitalize">
                    {payment.paymentMethod}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        payment.status === "succeeded"
                          ? "bg-green-600/20 text-green-300"
                          : "bg-yellow-600/20 text-yellow-300"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {payment.createdAt
                      ? new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(payment.createdAt))
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
