import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { SearchContext } from "../../assets/SearchContext/SearchContext";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";

const Navber = () => {
  const { search, setSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const AdminLogin = () => {
    navigate("/user-admin-login");
  };

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
        <div className="flex text-black items-center gap-3">
          {/* MOBILE MENU BUTTON */}
          <div className="dropdown text-black sm:hidden relative">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle text-xl hover:bg-slate-100 transition-all duration-300"
            >
              {open ? (
                <FiX className="text-gray-700 transition-transform duration-300 rotate-90" />
              ) : (
                <FiMenu className="text-gray-700" />
              )}
            </button>

            {open && (
              <div className="absolute top-12 left-0 w-56 bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl rounded-xl py-4 px-3 flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                {/* এখানে text-left এবং items-start যোগ করা হয়েছে যেন সবকিছু বামপাশ থেকে শুরু হয় */}
                <div className="flex flex-col gap-1 font-medium text-gray-700 text-sm text-left items-start w-full">
                  {menu}
                </div>
              </div>
            )}
          </div>

          {/* LOGO */}
          <a href="/" className="sm:text-2xl font-bold tracking-wide CustomFont">
            <span className="text-black">Al-Amin</span>{" "}
            {/* <span className=" sm:hidden"> <br /></span> */}
            <span className="text-yellow-400">Shop</span>
            <span className="text-green-600 ml-2">
              B<span className="text-red-500">D</span>
            </span>
          </a>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-8">{menu}</div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-0 md:gap-4">
          {/* SEARCH */}
          <div ref={searchRef} className="relative flex items-center">
            {/* SEARCH INPUT */}
            <div
              className={`absolute right-8 sm:right-10 transition-all duration-300 ease-in-out ${
                showSearch
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10 pointer-events-none"
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search product..."
                // এখানে input-sm এবং h-9 যোগ করে ইনপুটটি চিকন করা হয়েছে
                className="input input-bordered input-sm h-9 bg-white text-green-500 border-green-600 shadow-md sm:w-44 md:w-72 w-30 rounded-xl"
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

          {/* Admin Login */}

          <div
            onClick={AdminLogin}
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-orange-100"
          >
            <div className="indicator">
              <span className="text-xl">
                <FiLogIn className="text-2xl text-green-500" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
