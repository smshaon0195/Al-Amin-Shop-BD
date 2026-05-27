import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-orange-50/60 to-white min-h-screen py-6 sm:py-12 px-3 sm:px-6">
      {/* Heading - মোবাইল ফ্রেন্ডলি সাইজ */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800">
          Contact <span className="text-orange-500">Us</span>
        </h1>
        <p className="text-xs sm:text-base text-gray-500 mt-2 max-w-md mx-auto">
          We would love to hear from you. Send your message anytime.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5 sm:gap-10">
        {/* Left Side (Contact Info) */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-50 shadow-sm p-4 sm:p-8 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 border-b border-orange-100 pb-2">Get In Touch</h2>

          {/* Phone */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-orange-50 p-2.5 sm:p-3 rounded-xl text-orange-500 text-lg sm:text-2xl shrink-0">
              <IoCallOutline />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Phone</h3>
              <p className="text-sm sm:text-base font-medium text-gray-700 mt-0.5">+880 1959-779755</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-green-50 p-2.5 sm:p-3 rounded-xl text-green-500 text-lg sm:text-2xl shrink-0">
              <IoLogoWhatsapp />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">WhatsApp</h3>
              <p className="text-sm sm:text-base font-medium text-gray-700 mt-0.5">+880 1959-779755</p>
            </div>
          </div>

          {/* Facebook Page */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-50 p-2.5 sm:p-3 rounded-xl text-blue-500 text-lg sm:text-2xl shrink-0">
              <FaFacebookF />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Facebook Page</h3>
              <p className="text-sm sm:text-base font-medium text-gray-700 mt-0.5">Al-Amin Shop BD</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-orange-50 p-2.5 sm:p-3 rounded-xl text-orange-500 text-lg sm:text-2xl shrink-0">
              <IoMailOutline />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Email</h3>
              <p className="text-sm sm:text-base font-medium text-gray-700 mt-0.5 break-all">support@alaminshopbd.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-orange-50 p-2.5 sm:p-3 rounded-xl text-orange-500 text-lg sm:text-2xl shrink-0">
              <IoLocationOutline />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Address</h3>
              <p className="text-sm sm:text-base font-medium text-gray-700 mt-0.5">Morrelganj, Bagerhat, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-orange-50 shadow-sm p-5 sm:p-8">
          <form className="space-y-4 sm:space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1.5 text-xs sm:text-sm font-semibold text-gray-700">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full text-sm border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-orange-500 bg-gray-50/50 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1.5 text-xs sm:text-sm font-semibold text-gray-700">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full text-sm border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-orange-500 bg-gray-50/50 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1.5 text-xs sm:text-sm font-semibold text-gray-700">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full text-sm border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-orange-500 bg-gray-50/50 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 duration-300 text-white font-semibold text-sm py-2.5 sm:py-3 rounded-xl shadow-md shadow-orange-500/10 cursor-pointer">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;