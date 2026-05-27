import { useState } from "react";
import { FaLock, FaUserShield } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useAuth from "./../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      toast.error("Email and Password required");
      return;
    }

    try {
      setLoading(true);

      const result = await signInUser(email, password);

      console.log(result.user);

      toast.success("Login Successful");

      navigate("/user-admin-dashboard");
    } catch (error) {
      console.log(error.message);

      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-orange-100 px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-600 to-orange-400 p-8 text-center text-white">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center">
            <FaUserShield className="text-4xl" />
          </div>

          <h2 className="text-3xl font-bold mt-5">Admin Login</h2>

          <p className="text-sm mt-2 opacity-90">Only authorized admin can access dashboard</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Admin Email</label>

            <div className="flex border-green-500 items-center border rounded-2xl px-4 py-3 mt-2">
              <MdEmail className="text-green-600" />

              <input
                type="email"
                name="email"
                placeholder="Enter admin email"
                className="w-full text-green-600 ml-3 outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold">Password</label>

            <div className="flex border-green-500 items-center border rounded-2xl px-4 py-3 mt-2">
              <FaLock className="text-green-600" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full text-green-600  ml-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-green-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-orange-400 text-white py-3 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
