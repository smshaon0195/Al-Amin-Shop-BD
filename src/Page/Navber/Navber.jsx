import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { SearchContext } from "../../assets/SearchContext/SearchContext";
import { FiLogIn } from "react-icons/fi";

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
