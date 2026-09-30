import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/appContext";
import { getMe } from "../services/fetch";
import { Link, NavLink } from "react-router-dom";
import { Logo, Prethigah } from "../assets/assets";
import { ChevronDown, LogOut, SquareMenu, X } from "lucide-react";
import LegalLinks from "./LegalLinks";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
  { to: "/services", label: "Services" },
  { to: "/availability", label: "Availability" },
  { to: "/bookings", label: "Bookings" },
  { to: "/payments", label: "Payments" },
];

const AppLayout = ({ children }) => {
  const { navigate, PORTFOLIO_NAME, PORTFOLIO_URL } = useAppContext();
  const hasToken = Boolean(localStorage.getItem("token"));

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (hasToken) {
      getMe()
        .then((data) => setUser(data?.user))
        .catch(() => {});
    }
  }, [hasToken]);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const displayName = user?.businessName || user?.name || "My Business";
  const avatarInitial = displayName.slice(0, 1).toUpperCase();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E2E8F0] text-gray-800 flex flex-col">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:py-4 md:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src={Logo} alt="Appointly" className="h-8 md:h-10 w-auto" />

            <span className="text-[22px] md:text-[26px] tracking-tight text-gray-800 custom-brand-font mt-1 md:mt-2">
              Appointly
            </span>
          </Link>

          {/* -------- Navigation Desktop -------- */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-full px-3 py-2 text-sm font-medium transition-all border border-blue-600 bg-[#F0FDFA] text-[#2DD4BF] xl:px-4"
                    : "rounded-full px-3 py-2 text-sm font-medium transition-all text-gray-500 hover:bg-gray-50 hover:text-gray-800 xl:px-4"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* -------- Right Section -------- */}
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            {hasToken ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 outline-none hover:opacity-80 transition-opacity"
                >
                  <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] text-xs md:text-sm font-bold text-white shadow-sm">
                    {avatarInitial}
                  </div>

                  <span className="hidden text-sm font-medium text-gray-700 lg:block">
                    {displayName}
                  </span>

                  <ChevronDown
                    className={
                      dropdownOpen
                        ? "hidden lg:block h-4 w-4 text-gray-400 transition-transform rotate-180"
                        : "hidden lg:block h-4 w-4 text-gray-400 transition-transform"
                    }
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white ring-1 ring-gray-100 z-50 overflow-hidden border border-gray-100 py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        Logout();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-rose-600 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
              >
                Log in
              </Link>
            )}

            {/* -------- Mobile Menu Button -------- */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>

              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <SquareMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* -------- Mobile Navigation Menu -------- */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block rounded-md px-3 py-2.5 text-base font-medium transition-all bg-[#F0FDFA] text-[#2DD4BF]"
                      : "block rounded-md px-3 py-2.5 text-base font-medium transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 w-full overflow-hidden flex-1 min-h-[calc(100vh-80px)]">
        {children}
      </main>

      <footer className="relative mt-auto overflow-hidden bg-[#E2E8F0] px-4 pt-6 md:px-6 md:pt-8 text-center sm:text-left">
        <div className="relative z-10 mx-auto max-w-7xl rounded-3xl sm:rounded-4xl border border-gray-200/40 bg-white px-6 py-6 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.05)] sm:px-8 sm:py-8 md:px-12 md:py-10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                alt="Appointly"
                className="h-9 w-auto object-contain"
              />

              <span className="custom-brand-font text-[26px] tracking-tight text-gray-950">
                Appointly
              </span>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-gray-100" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-400">
              &copy; {new Date().getFullYear()} Appointly. All rights reserved.
            </span>

            <div className="flex items-center justify-center gap-6">
              <LegalLinks />

              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noreferrer"
                className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 text-[12px] font-semibold text-gray-400 transition-colors hover:text-gray-700 group"
              >
                <img
                  src={Prethigah}
                  alt="Prethigah"
                  className="h-4 sm:h-5 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                />

                <span className="leading-tight text-center sm:text-left max-w-50 sm:max-w-none">
                  <span className="font-extrabold text-[#2DD4BF] underline decoration-[#2DD4BF]/30 underline-offset-4">
                    {PORTFOLIO_NAME}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-full h-17.5 sm:h-30 md:h-40 lg:h-50 overflow-hidden flex items-start justify-center">
          <div className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 whitespace-nowrap select-none custom-brand-font text-[90px] sm:text-[150px] md:text-[220px] lg:text-[280px] leading-none tracking-tight text-[#D1D5DB] mask-[linear-gradient(to_bottom,black_10%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_bottom,black_10%,transparent_80%)]">
            Appointly
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
