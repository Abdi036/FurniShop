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
      <div className="relative w-full min-h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
        {/* Background Image with Smooth Transition */}
        <img
          src={bgImage}
          alt="Bg_img"
          className={`absolute inset-0 w-screen object-cover z-0 h-[100vh] transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-primary/60 z-0" />

        <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-[100vh] px-4">
          <div className="border-4 border-gold p-8 md:p-12 bg-primary/30 backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif font-bold uppercase tracking-widest mb-6 drop-shadow-lg">
              Furni<span className="text-gold">Shop</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-8">
              Crafted Comfort <br /> Timeless Design
            </p>
            <button className="px-8 py-3 bg-gold text-primary font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-primary transition-all duration-300 shadow-lg">
              Shop Collection
            </button>
          </div>
        </div>
      </div>
      {/* Products Section */}
      <div className="w-full flex flex-col items-center bg-gray-50">
        {/* Popular Products */}
        <div className="w-full py-16 max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px w-20 bg-gold"></div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mx-6 uppercase tracking-widest">
              Popular <span className="text-gold">Selections</span>
            </h2>
            <div className="h-px w-20 bg-gold"></div>
          </div>
          <PopularProducts />
        </div>

        {/* Latest Products */}
        <div className="w-full py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="h-px w-20 bg-gold"></div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mx-6 uppercase tracking-widest">
                Latest <span className="text-gold">Arrivals</span>
              </h2>
              <div className="h-px w-20 bg-gold"></div>
            </div>
            <LatestProducts />
          </div>
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
