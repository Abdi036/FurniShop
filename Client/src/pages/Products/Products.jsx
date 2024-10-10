import { useState } from "react";
import ViewProducts from "../Products/ViewProducts";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow-2xl">
      <div className="flex items-center justify-center w-full rounded-md">
        <div className="flex items-center justify-start gap-2 p-5 w-full max-w-2xl">
          <span className="font-semibold">Search:</span>
          <input
            type="text"
            placeholder="Search for products"
            className="w-full p-3 bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 transition duration-200 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ViewProducts searchTerm={searchTerm} />
    </div>
  );
}
