import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext } from "react";
import { SearchContext } from "../assets/SearchContext/SearchContext";

const MangoProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { search } = useContext(SearchContext);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosSecure.get("/products");
      return result.data;
    },
  });

  // এখানে ক্যাটাগরি 'mango' ফিল্টার করা হয়েছে এবং সাথে সার্চও সচল রাখা হয়েছে
  const filteredProducts = products.filter((p) => {
    const isMango = p.category === "mango"; // ডাটাবেজে আমরা 'mango' সেভ করেছিলাম
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return isMango && matchesSearch; // দুটি শর্তই মিললে প্রোডাক্টটি দেখাবে
  });

  const navigate = useNavigate();

  const orderHandle = (product) => {
    navigate(`/Order-Details/${product._id}`);
  };

  return (
    <div className=" min-h-screen py-6">
      <div className="mb-6 border-b py-3">
        <h1 className="w-[95%] mx-auto text-2xl font-bold text-orange-600 CustomFont flex items-center gap-2">
          🥭 সকল প্রকার আম
        </h1>
      </div>

      {/* Product Grid */}
      <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id || product.id} // MongoDB এর _id থাকলে সেটা আগে প্রায়োরিটি পাবে
              className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-amber-100"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-xs px-4 py-1 rounded-full shadow font-semibold">
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <figure className="overflow-hidden bg-slate-50 relative">
                <img
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  src={product.image}
                  alt={product.title}
                />
                {/* আমের জাত এবং সাইজ থাকলে তা ছবির ওপর সুন্দর ব্যাজ আকারে দেখাবে */}
                {product.mangoType && (
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-sm">
                    {product.mangoType} {product.mangoSize ? `| ${product.mangoSize}` : ""}
                  </span>
                )}
              </figure>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition line-clamp-1">
                  {product.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm mt-1 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-extrabold text-orange-600">৳{product.price}</span>
                  {product.oldPrice && (
                    <span className="line-through text-gray-400 text-sm">৳{product.oldPrice}</span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => orderHandle(product)}
                    type="button"
                    className="flex-1 cursor-pointer py-2 rounded-xl bg-orange-500 text-white font-semibold text-xs hover:bg-black transition"
                  >
                    অর্ডার করুন
                  </button>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-400 rounded-3xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            এই মুহূর্তে কোনো আম পাওয়া যায়নি!
          </div>
        )}
      </div>
    </div>
  );
};

export default MangoProducts;
