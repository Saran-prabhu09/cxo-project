import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaChevronDown,
} from "react-icons/fa";
import footerlogo from "../assets/images/footerlogo.png";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView(0.08);

  const hidden = {
    up: "translateY(20px)",
    left: "translateX(-20px)",
    right: "translateX(20px)",
    none: "none",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : hidden,
        transition: `opacity 0.55s ease-out ${delay}ms, transform 0.55s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

const SocialIcon = ({ icon: Icon, label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? "#5707C7" : "#FFFFFF",
        border: hovered ? "1.5px solid #5707C7" : "1.5px solid #D4D4D8",
        transform: hovered ? "scale(1.14)" : "scale(1)",
        transition:
          "background 0.22s ease, border 0.22s ease, transform 0.22s ease",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <Icon
        style={{
          fontSize: "10px",
          color: hovered ? "#FFFFFF" : "#3F3F46",
          transition: "color 0.22s ease",
        }}
      />
    </button>
  );
};

const DropdownLink = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="relative flex flex-col items-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          relative flex items-center gap-1.5
          text-[#52525B] text-[14px] font-normal
          hover:text-[#5707C7]
          transition-colors duration-200 ease-out
          after:absolute after:left-0 after:-bottom-0.5
          after:h-[1.5px] after:w-0 after:bg-[#5707C7] after:rounded-full
          after:transition-all after:duration-300 after:ease-out
          hover:after:w-full
        "
      >
        {item.name}
        <FaChevronDown
          className={`text-[10px] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <ul className="flex flex-col gap-2.5 pl-3 border-l-[1.5px] border-[#E4E4E7]">
          {item.dropdown.map((subItem, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="text-[#52525B] text-[13px] hover:text-[#5707C7] transition-colors duration-200"
              >
                {subItem}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

/*Data*/
const socials = [
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
];

const columns = [
  {
    heading: "Explore",
    links: [
      "About",
      "Leadership ",
      {
        name: "Members",
        dropdown: ["All Members", "By Industry", "By Function", "By Expertise"],
      },

      "Inniatives",
      "Insights",
      "Events",
    ],
  },
  {
    heading: "Communities",
    links: [
      {
        name: "Councils",
        dropdown: ["CIO Sherpa", "CMO Sherpa", "CHRO Sherpa", "CYBER Sherpa"],
      },
      "Nominate a CXO",
      "Contact us",
    ],
  },
  {
    heading: "Useful Links",
    links: ["FAQ", "Contact us", "Privacy Policy"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#F8F8F8] font-['Poppins'] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-0">
        <div
          className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          sm:gap-10
          lg:gap-12
          xl:gap-16
        "
        >
          <Reveal
            direction="up"
            delay={0}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="flex flex-col">
              <img
                src={footerlogo}
                alt="CXO Logo"
                loading="lazy"
                className="w-28 sm:w-32 h-auto object-contain"
              />

              <p className="mt-5 text-[#52525B] text-[12px] leading-6 max-w-55">
                The Operating System for C-Suite Leadership Communities
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-8">
                {socials.map((s, i) => (
                  <SocialIcon key={i} icon={s.icon} label={s.label} />
                ))}
              </div>
            </div>
          </Reveal>

          {columns.map((col, colIdx) => (
            <Reveal key={colIdx} direction="up" delay={90 + colIdx * 75}>
              <div>
                <h3
                  className="
                  text-[#5707C7] uppercase
                  text-[11px] sm:text-[12px]
                  font-semibold tracking-widest mb-5 sm:mb-6
                "
                >
                  {col.heading}
                </h3>

                <ul className="flex flex-col gap-3 sm:gap-4">
                  {col.links.map((linkItem, i) => {
                    const isDropdown =
                      typeof linkItem === "object" && linkItem.dropdown;

                    if (isDropdown) {
                      return <DropdownLink key={i} item={linkItem} />;
                    }

                    return (
                      <li key={i}>
                        <a
                          href="#"
                          className="
                            relative inline-block
                            text-[#52525B] text-[14px] font-normal
                            hover:text-[#5707C7]
                            transition-colors duration-200 ease-out
                            after:absolute after:left-0 after:-bottom-0.5
                            after:h-[1.5px] after:w-0 after:bg-[#5707C7] after:rounded-full
                            after:transition-all after:duration-300 after:ease-out
                            hover:after:w-full
                          "
                        >
                          {linkItem}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="none" delay={250}>
          <div className="mt-10 sm:mt-12 border-t border-[#E4E4E7]" />
        </Reveal>
        <Reveal direction="up" delay={270}>
          <div className="py-5 text-center">
            <p className="text-[#A1A1AA] text-[13px]">
              © Copyright 2026, All Rights Reserved
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
