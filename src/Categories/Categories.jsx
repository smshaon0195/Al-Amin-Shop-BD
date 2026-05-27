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
    <div className="noto-serif text-black bg-gradient-to-b from-orange-50 to-white min-h-screen  ">
      <div className="w-[95%] mx-auto">
        <div className="mb-5 border-b py-3">
          <h1 className="">Categories</h1>
        </div>

        <div className="cards  grid grid-cols-3 sm:grid-cols-5  md:grid-cols-8  gap-5 ">
          {categoriesOption.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer w-30 relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Image */}
              <div className="overflow-hidden ">
                <img
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={category.image}
                  alt={category.title}
                />
              </div>

              {/* Content */}
              <div className="p-3 text-center">
                <h2 className=" font-bold text-gray-800 group-hover:text-amber-600 transition duration-300">
                  {category.title}
                </h2>
              </div>

              {/* Top Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
