import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock fetching orders
    const fetchOrders = async () => {
      // Replace this with your API call
      const fetchedOrders = [
        {
          id: 1,
          customer: "John Doe",
          total: "$120.00",
          status: "Shipped",
          date: "2024-10-05",
        },
        {
          id: 2,
          customer: "Jane Smith",
          total: "$250.00",
          status: "Pending",
          date: "2024-10-04",
        },
      ];
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6 h-[100vh]">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-3 px-4 border-b">No.</th>
              <th className="py-3 px-4 border-b">Order ID</th>
              <th className="py-3 px-4 border-b">Customer</th>
              <th className="py-3 px-4 border-b">Total</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 text-center"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.total}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
