import { useEffect, useState } from "react";
import axios from "axios";
import Stripe from "stripe";

interface Invoice {
  id: string;
  number: string;
  amountDue: number;
  amountPaid: number;
  currency: string;
  status: string;
  email: string;
  billingName: string | null;
  paymentMethod: string | null;
  hostedInvoiceUrl: string;
  invoicePdf: string;
  createdAt: string;
}

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/plans/invoice-history"
        );
        setInvoices(res.data);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
        setError("Could not fetch invoices.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Invoice History</h2>

      {loading ? (
        <p>Loading invoices...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-black text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Amount Paid</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">PDF</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-black">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{invoice.number || "N/A"}</td>
                  <td className="px-4 py-3">{invoice.billingName || "N/A"}</td>
                  <td className="px-4 py-3">{invoice.email || "N/A"}</td>
                  <td className="px-4 py-3">
                    {invoice.paymentMethod || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    ${(invoice.amountPaid / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 capitalize">{invoice.status}</td>
                  <td className="px-4 py-3">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(invoice.createdAt))}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={invoice.invoicePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View PDF
                    </a>
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

export default InvoiceHistory;
