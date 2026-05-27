import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext } from "react";
import { SearchContext } from "../assets/SearchContext/SearchContext";

const Product = () => {
  const axiosSecure = useAxiosSecure();
const { search } = useContext(SearchContext);
  const { data: products = [] } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const result = await axiosSecure.get("/Products");
      return result.data;
    },
  });
const filteredProducts = products.filter((p) =>
  p.title.toLowerCase().includes(search.toLowerCase())
);
  const navigate = useNavigate();

  const orderHandle = (product) => {
    navigate(`/Order-Details/${product._id}`);
  };


  
  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-green-50 py-10">
   
      {/* Title */}
      <h3 className="text-3xl noto-serif font-bold text-center mb-10 text-gray-800">
        জনপ্রিয় পণ্য
        <span className="block w-32 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></span>
      </h3>

      {/* Product Grid */}
      <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-amber-100"
          >
            {/* Badge */}
            <div className="absolute top-4 left-4 z-10 bg-green-600 text-white text-sm px-4 py-1 rounded-full shadow">
              {product.badge}
            </div>

            {/* Image */}
            <figure className="overflow-hidden">
              <img
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                src={product.image}
                alt={product.title}
              />
            </figure>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition">
                {product.title}
              </h2>

              {/* DESCRIPTION (2 LINE + ELLIPSIS + JUSTIFY) */}
              <p className="text-gray-500 text-sm mt-1  line-clamp-2">{product.description}</p>

              {/* Price */}
              <div className="flex justify-between gap-2 mt-2">
                <span className="text-xl font-extrabold text-green-600">৳ {product.price}</span>

                <span className="line-through text-gray-400 text-sm">৳ {product.oldPrice}</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2 text-sm rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                  কার্টে যোগ করুন
                </button>

                <button
                  onClick={() => orderHandle(product)}
                  type="button"
                  className="flex-1 py-2 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-black transition"
                >
                  অর্ডার করুন
                </button>
              </div>
            </div>

            {/* Hover Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-3xl transition-all duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
