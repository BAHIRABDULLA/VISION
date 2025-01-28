import React from "react";

const Invoice = ({ invoiceData }) => {
  return (
    <div className="max-w-3xl mx-auto p-8 border border-gray-300 rounded-lg shadow-md">
      {/* Invoice Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-gray-500">#{invoiceData.invoiceNumber}</p>
        </div>
        <img src="/logo.png" alt="Company Logo" className="h-12" />
      </div>

      {/* Billing Information */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="font-semibold">Billed To:</h2>
          <p>{invoiceData.billedTo.name}</p>
          <p>{invoiceData.billedTo.email}</p>
          <p>{invoiceData.billedTo.address}</p>
        </div>
        <div>
          <h2 className="font-semibold">Provided By:</h2>
          <p>{invoiceData.providedBy.name}</p>
          <p>{invoiceData.providedBy.email}</p>
          <p>{invoiceData.providedBy.address}</p>
        </div>
      </div>

      {/* Itemized Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2">{item.description}</td>
              <td className="border border-gray-300 p-2">{item.quantity}</td>
              <td className="border border-gray-300 p-2">${item.price.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount */}
      <div className="flex justify-end mt-6">
        <h3 className="text-xl font-bold">Total: ${invoiceData.total.toFixed(2)}</h3>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Thank you for your purchase!</p>
        <p>If you have any questions, contact support@example.com.</p>
      </div>
    </div>
  );
};

export default Invoice;

// Example Usage
{/* <Invoice 
  invoiceData={{
    invoiceNumber: "INV-12345",
    billedTo: { name: "John Doe", email: "john@example.com", address: "123 Main St" },
    providedBy: { name: "Mentor Co.", email: "mentor@example.com", address: "456 Market St" },
    items: [
      { date: "2025-01-01", description: "React Course", quantity: 1, price: 100 },
      { date: "2025-01-02", description: "Mentorship Session", quantity: 2, price: 50 },
    ],
    total: 200,
  }}
/> */}
