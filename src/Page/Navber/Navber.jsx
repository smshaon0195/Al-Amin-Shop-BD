import { useState, useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import { CartContext } from "../../OrderPage/CartContext";
import { SearchContext } from "../../assets/SearchContext/SearchContext";

const Navber = () => {
  const { cart } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);

  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Close Search Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto Focus Search Input
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // MENU ITEMS
  const menu = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "tab tab-active [--tab-bg:orange] text-green-600 font-semibold"
            : "tab text-black hover:text-orange-500 duration-300"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/categories"
        className={({ isActive }) =>
          isActive
            ? "tab tab-active [--tab-bg:orange] text-green-600 font-semibold"
            : "tab text-black hover:text-orange-500 duration-300"
        }
      >
        Categories
      </NavLink>

      <NavLink
        to="/contact-us"
        className={({ isActive }) =>
          isActive
            ? "tab tab-active [--tab-bg:orange] text-green-600 font-semibold"
            : "tab text-black hover:text-orange-500 duration-300"
        }
      >
        Contact US
      </NavLink>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b">
      <div className="navbar w-[95%] mx-auto justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          {/* MOBILE MENU BUTTON */}
          <div className="dropdown sm:hidden">
            <button onClick={() => setOpen(!open)} className="btn btn-ghost text-2xl">
              {open ? "✖" : "☰"}
            </button>

            {open && (
              <div className="absolute top-14 left-0 w-52 bg-white shadow-2xl rounded-2xl p-5 flex flex-col gap-3 z-50 border">
                {menu}
              </div>
            )}
          </div>

          {/* LOGO */}
          <a href="/" className="text-2xl font-bold tracking-wide CustomFont">
            <span className="text-black">Al-Amin</span>{" "}
            <span className="text-yellow-400">Shop</span>
            <span className="text-green-600 ml-2">
              B<span className="text-red-500">D</span>
            </span>
          </a>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-8">{menu}</div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* SEARCH */}
          <div ref={searchRef} className="relative flex items-center">
            {/* SEARCH INPUT */}
            <div
              className={`absolute right-12 transition-all duration-300 ease-in-out ${
                showSearch
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10 pointer-events-none"
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search product..."
                className="input input-bordered bg-transparent text-green-500 border-green-600 shadow-md w-44 md:w-72 rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* SEARCH BUTTON */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="btn btn-ghost btn-circle hover:bg-orange-100 transition"
            >
              🔍
            </button>
          </div>

          {/* CART */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-orange-100"
            >
              <div className="indicator">
                <span className="text-xl">🛒</span>

                <span className="badge badge-sm badge-success indicator-item text-white">
                  {cart.length}
                </span>
              </div>
            </div>

            {/* CART DROPDOWN */}
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-white z-50 mt-3 w-72 shadow-2xl rounded-2xl border"
            >
              <div className="card-body">
                <h2 className="text-xl font-bold">Shopping Cart</h2>

                <p className="text-gray-500">Total Items: {cart.length}</p>

                <div className="max-h-60 overflow-y-auto space-y-3">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item._id} className="flex items-center gap-3 border rounded-xl p-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>

                          <p className="text-green-600 font-bold">৳ {item.price}</p>

                          <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5 text-gray-500">Cart is Empty</div>
                  )}
                </div>

                <div className="card-actions mt-4">
                  <button className="btn btn-success w-full text-white rounded-xl">
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
