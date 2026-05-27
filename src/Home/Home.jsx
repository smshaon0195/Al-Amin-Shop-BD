import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Product from "../Product/Product";
import MangoProducts from "../Product/MangoProducts";
import OthersProduct from "../Product/OthersProduct";

const Home = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero / Header Section */}
      <div className="w-[95%] mx-auto pt-6 pb-4 text-center">
        {/* মডার্ন হেডিং */}
        <h2 className="CustomFont text-xl sm:text-3xl font-extrabold text-gray-800 tracking-wide">
          আপনার পছন্দের সকল পণ্য এখানেই
        </h2>
        {/* একটি হালকা সাব-টেক্সট যা পেজটিকে আরও স্ট্যান্ডার্ড লুক দেবে */}
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1.5">
          সহজ ও নিরাপদ কেনাকাটার নির্ভরযোগ্য মাধ্যম
        </p>

        {/* Social Icons - সোশ্যাল আইকনগুলোকে আরও স্মার্ট ও মিনিমালিস্ট করা হয়েছে */}
        <div className="flex gap-4 sm:gap-6 mt-4 mb-2 justify-center items-center">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/al.amin.hossain.198705"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group"
          >
            <div className="text-[#1877F2] bg-slate-50 border border-slate-100 rounded-full p-2.5 sm:p-3.5 shadow-sm hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-lg sm:text-2xl">
              <FaFacebook />
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801959779755"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="group"
          >
            <div className="text-[#25D366] bg-slate-50 border border-slate-100 rounded-full p-2.5 sm:p-3.5 shadow-sm hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-lg sm:text-2xl">
              <FaWhatsapp />
            </div>
          </a>

          {/* Call */}
          <a href="tel:+8801959779755" aria-label="Call" className="group">
            <div className="text-[#00C853] bg-slate-50 border border-slate-100 rounded-full p-2.5 sm:p-3.5 shadow-sm hover:bg-[#00C853] hover:text-white hover:border-[#00C853] hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-lg sm:text-2xl">
              <IoCall />
            </div>
          </a>
        </div>
      </div>

      {/* Product Sections - সেকশনগুলোর মাঝে সুন্দর ও গোছানো স্পেসিং দেওয়া হয়েছে */}
      <div className="space-y-6 sm:space-y-10 pb-12">
        <section>
          <Product />
        </section>
        
        <section>
          <MangoProducts />
        </section>
        
        <section>
          <OthersProduct />
        </section>
      </div>
    </div>
  );
};

export default Home;