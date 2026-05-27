import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Product from "../Product/Product";
import MangoProducts from "../Product/MangoProducts";
import OthersProduct from "../Product/OthersProduct";

const Home = () => {
  return (
    <div className="bg-white text-black">
      <div className="w-[95%] mx-auto">
        {/* Heading */}
        <h2 className="CustomFont text-3xl py-5 text-center ">আপনার পছন্দের সকল পণ্য এখানেই</h2>

        {/* Social Icons */}
        <div className="flex gap-8 text-2xl justify-center items-center">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/al.amin.hossain.198705"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <div className="text-[#1877F2] cursor-pointer bg-yellow-100 rounded-full p-3 hover:scale-110 duration-300">
              <FaFacebook />
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801959779755"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <div className="text-[#25D366] cursor-pointer bg-yellow-50 rounded-full p-3 hover:scale-110 duration-300">
              <FaWhatsapp />
            </div>
          </a>

          {/* Call */}
          <a href="tel:+8801959779755" aria-label="Call">
            <div className="text-[#00C853] cursor-pointer bg-yellow-100 rounded-full p-3 hover:scale-110 duration-300">
              <IoCall />
            </div>
          </a>
        </div>
      </div>

      {/* Product Section */}
      <div>
        <Product />
      </div>
      <div>
        <MangoProducts></MangoProducts>
      </div>
      <div>
        <OthersProduct></OthersProduct>
      </div>
    </div>
  );
};

export default Home;
