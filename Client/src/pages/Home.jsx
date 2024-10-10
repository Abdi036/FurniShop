import Footer from "../components/Footer";
import PopularProducts from "./Products/PopularProducts";
import LatestProducts from "./Products/LatestProducts";
import { useEffect, useState } from "react";
import About from "./About";

export default function Home() {
  const [bgImage, setBgImage] = useState("/bed1.jfif");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const images = ["/bed1.jfif", "/office4.jpg", "/kitchen8.jpg"];
    let index = 0;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % images.length;
        setBgImage(images[index]);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="relative w-screen min-h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
        {/* Background Image with Smooth Transition */}
        <img
          src={bgImage}
          alt="Bg_img"
          className={`absolute inset-0 w-full object-cover z-0 h-[100vh] transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950 opacity-50 z-0" />

        {/* Centered Text */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-[100vh]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mt-10 py-10 uppercase leading-[2.5rem] md:leading-[3rem] lg:leading-[3.5rem]">
            Everything You Need for <br /> a Modern Interior
          </h1>
        </div>
      </div>
      {/* Products Section */}
      <div className="w-full flex flex-col items-center">
        {/* Popular Products */}
        <div className="w-full py-10">
          <PopularProducts />
        </div>

        {/* Latest Products */}
        <div className="w-full py-10">
          <LatestProducts />
        </div>
      </div>

      {/* About */}
      <div>
        <About />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
