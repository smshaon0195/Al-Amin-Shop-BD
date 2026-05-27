const Categories = () => {
  const categoriesOption = [
    {
      id: 1,
      title: "সুন্দরবনের মধু",
      image: "https://shorturl.at/wnB38",
    },
    {
      id: 2,
      title: "খাঁটি ঘি",
      image: "https://shorturl.at/wnB38",
    },
    {
      id: 3,
      title: "সরিষার তেল",
      image: "https://shorturl.at/wnB38",
    },
  ];

  return (
    <div className="noto-serif text-black bg-gradient-to-b from-orange-50/40 via-white to-transparent py-4">
      <div className="w-[95%] mx-auto">
        {/* মডার্ন হেডিং */}
        <div className="mb-6 border-b border-orange-100/60 py-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 CustomFont flex items-center gap-2">
            📂 পপুলার ক্যাটাগরি
          </h1>
        </div>

        {/* Categories Grid - মোবাইলে ৩ কলাম এবং স্ক্রিন সাইজ অনুযায়ী পারফেক্ট অটো রেসপন্সিভ */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 justify-items-center">
          {categoriesOption.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer flex flex-col items-center w-full max-w-[100px] sm:max-w-[120px]"
            >
              {/* Image Container - মডার্ন গোল সার্কেল লুক এবং স্মুথ শ্যাডো */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-orange-50 border border-orange-100 shadow-sm group-hover:shadow-md group-hover:border-orange-300 transition-all duration-300 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={category.image}
                  alt={category.title}
                />
                {/* হালকা ওভারলে এফেক্ট হোভার করলে */}
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Title Content - ছোট ও পরিচ্ছন্ন টেক্সট */}
              <div className="mt-2.5 text-center w-full">
                <h2 className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-orange-600 transition duration-300 line-clamp-2 min-h-[32px] leading-tight">
                  {category.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;