import { FaLeaf, FaBoxOpen, FaChair } from "react-icons/fa";

function About() {
  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Interior Design and Inspiration
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Image 1: Full-width on small, spans two columns on large */}
          <div className="lg:col-span-2">
            <img
              src="/living7.jpg"
              alt="interior inspiration"
              className="w-full h-64 lg:h-96 object-cover rounded-lg hover:translate-y-[-3px] duration-100"
            />
          </div>

          {/* Image 2: Tall image */}
          <div className="lg:row-span-2">
            <img
              src="/kitchen3.jpg"
              alt="interior inspiration"
              className="w-full h-full object-cover rounded-lg rounded- hover:translate-y-[-3px] duration-100lg"
            />
          </div>

          {/* Image 3: Standard square image */}
          <div>
            <img
              src="/kitchen8.jpg"
              alt="interior inspiration"
              className="w-full h-64 object-cover rounded-lg hover:translate-y-[-3px] duration-100"
            />
          </div>

          {/* Image 4: Another standard image */}
          <div>
            <img
              src="/living11.jpg"
              alt="interior inspiration"
              className="w-full h-64 object-cover rounded-lg hover:translate-y-[-3px] duration-100"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Eco-friendly Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <span className="text-slate-700 text-5xl mb-4">
              <FaLeaf />
            </span>
            <h3 className="text-xl font-semibold mb-4 text-black">
              Eco-friendly
            </h3>
            <p className="text-gray-700">
              Decorate your space with eco-friendly furniture with low VOCs,
              environmentally friendly materials, and safe coatings.
            </p>
          </div>

          {/* Unbeatable Quality Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <span className="text-slate-700 text-5xl mb-4">
              <FaBoxOpen />
            </span>
            <h3 className="text-xl font-semibold mb-4 text-black">
              Unbeatable Quality
            </h3>
            <p className="text-gray-700">
              We choose raw materials from the best manufacturers, so our
              furniture and decor are of the highest quality at the best prices.
            </p>
          </div>

          {/* Delivery to Your Door Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <span className="text-slate-700 text-5xl mb-4">
              <FaChair />
            </span>
            <h3 className="text-xl font-semibold mb-4 text-black">
              Delivery to Your Door
            </h3>
            <p className="text-gray-700">
              We will deliver to your door anywhere in the world. If you&apos;re
              not 100% satisfied, let us know within 30 days and we&apos;ll
              solve the problem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
