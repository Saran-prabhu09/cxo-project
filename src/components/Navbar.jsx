import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import footerlogo from "../assets/images/footerlogo.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Programmes", href: "#" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*  Close menu on outside click  */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /*  Lock body scroll when menu is open  */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`
          w-full bg-white sticky top-0 z-50
          border-b border-gray-100
          transition-shadow duration-300 ease-out
          ${scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : "shadow-none"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/*  Logo  */}
          <div className="flex items-center shrink-0">
            <img
              src={footerlogo}
              alt="CXO Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>

          {/*  Desktop nav  */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  relative text-[#18181B] text-[14px] font-medium
                  hover:text-[#FB6427] transition-colors duration-200
                  after:absolute after:left-0 after:-bottom-0.5
                  after:h-0.5 after:w-0 after:bg-[#FB6427] after:rounded-full
                  after:transition-all after:duration-300 after:ease-out
                  hover:after:w-full
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/*  Desktop CTA buttons  */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="
                h-10 px-5 lg:px-6 rounded-lg
                bg-[#FB6427] text-white text-[13px] lg:text-[14px] font-medium
                flex items-center gap-2
                hover:bg-[#e0541a] hover:shadow-[0_4px_16px_rgba(251,100,39,0.35)]
                active:scale-[0.97]
                transition-all duration-200 ease-out
              "
            >
              Apply for membership
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button
              className="
                h-10 px-5 lg:px-6 rounded-lg
                border border-[#FB6427] bg-white text-[#FB6427]
                text-[13px] lg:text-[14px] font-medium
                flex items-center gap-2
                hover:bg-[#FFF5F1] hover:shadow-[0_4px_14px_rgba(251,100,39,0.15)]
                active:scale-[0.97]
                transition-all duration-200 ease-out
              "
            >
              Partner with us
              <ArrowRight size={15} />
            </button>
          </div>

          {/*  Hamburger (mobile + tablet)  */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              md:hidden flex items-center justify-center
              w-10 h-10 rounded-lg
              text-[#18181B] hover:bg-gray-100
              transition-colors duration-200
            "
          >
            <span
              className="transition-all duration-300 ease-out"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen
                  ? "rotate(90deg) scale(0.6)"
                  : "rotate(0deg) scale(1)",
                position: "absolute",
              }}
            >
              <Menu size={22} />
            </span>
            <span
              className="transition-all duration-300 ease-out"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen
                  ? "rotate(0deg) scale(1)"
                  : "rotate(-90deg) scale(0.6)",
                position: "absolute",
              }}
            >
              <X size={22} />
            </span>
          </button>
        </div>
      </header>

      {/*  Mobile overlay backdrop  */}
      <div
        onClick={() => setMenuOpen(false)}
        className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/*  Mobile slide-down menu  */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-xl"
        style={{
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Menu header row */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-18 border-b border-gray-100">
          <img
            src={footerlogo}
            alt="CXO Logo"
            className="h-9 sm:h-10 w-auto object-contain"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="
              flex items-center justify-center w-10 h-10 rounded-lg
              text-[#18181B] hover:bg-gray-100 transition-colors duration-200
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 sm:px-6 pt-4 pb-2">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="
                text-[#18181B] text-[15px] font-medium py-3.5
                border-b border-gray-100 last:border-0
                hover:text-[#FB6427]
                flex items-center justify-between
                transition-colors duration-200
              "
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.35s ease-out ${80 + i * 60}ms, transform 0.35s ease-out ${80 + i * 60}ms`,
              }}
            >
              {link.label}
              <ArrowRight size={14} className="text-gray-300" />
            </a>
          ))}
        </nav>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 px-4 sm:px-6 pt-4 pb-6"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.35s ease-out 260ms, transform 0.35s ease-out 260ms`,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="
              flex-1 h-11 rounded-lg
              bg-[#FB6427] text-white text-[14px] font-medium
              flex items-center justify-center gap-2
              hover:bg-[#e0541a] active:scale-[0.97]
              transition-all duration-200
            "
          >
            Apply for membership
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => setMenuOpen(false)}
            className="
              flex-1 h-11 rounded-lg
              border border-[#FB6427] bg-white text-[#FB6427]
              text-[14px] font-medium
              flex items-center justify-center gap-2
              hover:bg-[#FFF5F1] active:scale-[0.97]
              transition-all duration-200
            "
          >
            Partner with us
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
