import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth, logoutUser } from "../../Features/Auth/AuthSlice";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());



    
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch]);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <header className="fixed top-4 z-50 w-full flex justify-center">
      {/* Floating Glass Container */}
      <div
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-300 shadow-lg hover:shadow-2xl",
          "backdrop-blur-xl border border-white/10",
          "rounded-2xl",
          scrolled
            ? "bg-gray-900/85 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.45)]"
            : " bg-gray-900/60 shadow-[0_10px_30px_-15px_rgba(168,85,247,0.35)]",
          "max-w-7xl w-[95%]"
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-bold tracking-tight transition-all",
              scrolled ? "text-lg" : "text-2xl"
            )}
          >
            <span className="text-gray-100">Campus</span>
            <span className="text-blue-500">Compass</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            ["Contribute", "/opensource"],
            ["Events", "/event-tracker"],
            ["Profile", "/profile"],
            ["Resume", "/resume"],
            ["Guide", "/chat"],
            ["AI Interview", "/ainterview"],
            ["Community", "/community"],
            ["Learn", "/ytcontent"],
            ["Explore", "/activities"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="
                px-3 py-2 text-[14px] font-medium rounded-lg
                text-gray-300
                hover:text-white
                hover:bg-white/10
                transition
              "
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed top-[88px] left-1/2 -translate-x-1/2 w-[95%] z-40">
            <div className="bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_-15px_rgba(59,130,246,0.45)] p-4 space-y-2">
              {[
                ["Contribute", "/opensource"],
                ["Events", "/event-tracker"],
                ["Profile", "/profile"],
                ["Resume", "/resume"],
                ["Guide", "/chat"],
                ["AI Interview", "/ainterview"],
                ["Community", "/community"],
                ["Learn", "/ytcontent"],
                ["Explore", "/activities"],
              ].map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* User Section */}
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <img
                  src={"/dev.png"}
                  alt="Profile"
                  className={cn(
                    "rounded-full border border-white/20 object-cover transition-all",
                    scrolled ? "w-9 h-9" : "w-11 h-11"
                  )}
                />
              </button>
            </PopoverTrigger>

            {/* Dark Popover */}
            <PopoverContent className="w-56 rounded-xl border border-gray-800 bg-gray-900 p-3 shadow-2xl">
              <div className="text-center">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>

              <div className="my-3 h-px bg-gray-800" />

              <div className="flex flex-col gap-1">
                <Link
                  to="/profile"
                  className="px-2 py-2 rounded-md text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  to="/profile/edit"
                  className="px-2 py-2 rounded-md text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  Edit Profile
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="mt-2"
                >
                  Log out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link to="/login">
            <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
