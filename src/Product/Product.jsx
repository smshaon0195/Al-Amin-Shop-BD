import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext } from "react";
import { SearchContext } from "../assets/SearchContext/SearchContext";

const Product = () => {
  const axiosSecure = useAxiosSecure();
  const { search } = useContext(SearchContext);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosSecure.get("/products");
      return result.data;
    },
  });

  // এখানে শুধু 'honey' ক্যাটাগরি এবং সার্চ কি-ওয়ার্ড ফিল্টার করা হয়েছে
  const filteredProducts = products.filter((p) => {
    const isHoney = p.category === "honey"; // ডাটাবেজ থেকে শুধু মধু ফিল্টার করবে
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return isHoney && matchesSearch;
  });

  const navigate = useNavigate();

  const orderHandle = (product) => {
    navigate(`/Order-Details/${product._id}`);
  };

  return (
    <div className="30 py-5 min-h-screen">
      {/* Title */}
      <h3 className="text-3xl noto-serif font-bold text-center text-gray-800">
        জনপ্রিয় পণ্য
        <span className="block w-32 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></span>
      </h3>

      <div className="mb-6 border-b border-amber-100 py-3">
        <h1 className="w-[95%] mx-auto text-2xl font-bold text-amber-700 CustomFont flex items-center gap-2">
          🍯 সকল প্রকার মধু
        </h1>
      </div>

      {/* Product Grid */}
      <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id || product.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-amber-100"
            >
              {/* Badge (কালার চেঞ্জ করে ফ্রেশ অ্যাম্বার লুক দেওয়া হয়েছে) */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-xs px-4 py-1 rounded-full shadow font-semibold">
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <figure className="overflow-hidden bg-amber-50/20 relative">
                <img
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-700"
                  src={product.image}
                  alt={product.title}
                />
                {/* মধুর ওজন বা পরিমাপ (যেমন: ৫০০ গ্রাম, ১ কেজি) থাকলে তা ছবির ওপরে দেখাবে */}
                {product.honeyWeight && (
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] px-2.5 py-0.5 rounded-md backdrop-blur-sm font-medium">
                    ⚖️ {product.honeyWeight}
                  </span>
                )}
              </figure>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition line-clamp-1">
                  {product.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm mt-1 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-extrabold text-amber-600">৳{product.price}</span>
                  {product.oldPrice && (
                    <span className="line-through text-gray-400 text-sm">৳{product.oldPrice}</span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => orderHandle(product)}
                    type="button"
                    className="flex-1 cursor-pointer py-2 rounded-xl bg-gray-900 text-white font-semibold text-xs hover:bg-amber-500 transition"
                  >
                    অর্ডার করুন
                  </button>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400 rounded-3xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            এই মুহূর্তে কোনো মধুর প্রোডাক্ট পাওয়া যায়নি!
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
