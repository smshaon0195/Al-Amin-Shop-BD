import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen py-8 px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Contact <span className="text-orange-500">Us</span>
        </h1>
        <p className="text-gray-500 mt-3">
          We would love to hear from you. Send your message anytime.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-500 text-2xl">
              <IoCallOutline />
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-500">+880 1959-779755</p>
            </div>
          </div>
          {/* WhatsApp */}
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-500 text-2xl">
              <IoLogoWhatsapp />
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">WhatsApp</h3>
              <p className="text-gray-500">+880 1959-779755</p>
            </div>
          </div>

          {/* Facebook Page */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-500 text-2xl">
              <FaFacebookF />
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Facebook Page</h3>
              <p className="text-gray-500">Al-Amin Shop BD</p>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-500 text-2xl">
              <IoMailOutline />
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Email</h3>
              <p className="text-gray-500">support@alaminshopbd.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-500 text-2xl">
              <IoLocationOutline />
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p className="text-gray-500">Morrelganj, Bagerhat, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className=" rounded-2xl shadow-lg p-8">
          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Your Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Your Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Message</label>

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <button className="w-full bg-orange-500 hover:bg-orange-600 duration-300 text-white font-semibold py-3 rounded-xl">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
