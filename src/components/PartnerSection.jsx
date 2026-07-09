import React, { useEffect, useRef, useState } from "react";
import { Share2, Network, Users, UserRoundSearch } from "lucide-react";
import accenture from "../assets/images/accenture.png";
import amazon from "../assets/images/amazon.png";
import Google from "../assets/images/Google.png";
import Sap from "../assets/images/Sap.png";
import Ibm from "../assets/images/Ibm.png";
import Microsoft from "../assets/images/Microsoft.png";
import Bgimage from "../assets/images/Bgimage.png";

/* 
   Scroll-reveal hook  — BIDIRECTIONAL
   Visible when near viewport, hidden when away
 */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting), // no disconnect - bidirectional
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* 
   Reveal wrapper  (bidirectional)
 */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView(0.1);

  const hidden = {
    up: "translateY(28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
    none: "none",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : hidden,
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

const benefits = [
  { icon: Network, title: "Strategic brand visibility" },
  { icon: Share2, title: "Access to curated executive networks" },
  { icon: Users, title: "Participation in exclusive roundtables" },
  {
    icon: UserRoundSearch,
    title: "Co-created research and thought leadership",
  },
];
const SHOW_LOGOS = false;
/* Scroll-logos*/
const logos = [
  { name: "Accenture", src: accenture },
  { name: "Amazon", src: amazon },
  { name: "Google", src: Google },
  { name: "SAP", src: Sap },
  { name: "IBM", src: Ibm },
  { name: "Microsoft", src: Microsoft },
];
const marqueeLogos = [...logos, ...logos];

const PartnerSection = () => {
  return (
    <section className="bg-white py-16 font-['Poppins'] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
            PARTNER HEADER
         */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:mb-24">
          <Reveal direction="left" className="max-w-3xl w-full">
            <p className="text-[#5707C7] uppercase text-[12px] sm:text-[13px] font-bold tracking-wider mb-2">
              Partner With a High-Impact CXO Ecosystem
            </p>
            <h2 className="text-[#111248] text-[26px] sm:text-[30px] lg:text-[36px] font-bold leading-tight mb-3">
              Engage Directly with Decision-Makers
            </h2>
            <p className="text-[#646464] text-[14px] lg:text-[15px] font-normal leading-relaxed max-w-2xl">
              CXO Sherpa Council enables organizations to connect with senior
              leadership across industries.
            </p>
          </Reveal>

          <Reveal direction="right" delay={150} className="shrink-0">
            <button
              className="
              bg-[#5707C7] text-white px-7 h-12 rounded-[10px] text-[15px]
              font-medium lowercase whitespace-nowrap shadow-xs
              hover:bg-[#4906a8] hover:shadow-[0_6px_24px_rgba(87,7,199,0.35)]
              active:scale-[0.97] transition-all duration-300 ease-out
              w-full sm:w-auto
            "
            >
              partner with us
            </button>
          </Reveal>
        </div>
        {/*BENEFITS ROW*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-16 ">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={index} delay={index * 100} direction="up">
                <div className="flex items-center gap-4 group">
                  <div
                    className="
                    w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#5707C7]
                    flex items-center justify-center shrink-0 shadow-xs
                    group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(87,7,199,0.35)]
                    transition-all duration-300 ease-out
                  "
                  >
                    <Icon size={22} color="white" strokeWidth={1.5} />
                  </div>
                  <p className="text-[#535353] text-[13px] lg:text-[14px] font-normal leading-snug">
                    {item.title}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        {/* 
            TRUSTED BY LEADERS
        */}
        <div className="mt-20 sm:mt-16 text-center hidden">
          <Reveal direction="up">
            <h2 className="text-[#111248] text-[28px] sm:text-[32px] lg:text-[38px] font-bold leading-tight mb-4">
              Trusted by Leaders Across Industries
            </h2>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <p className="text-[#535353] text-[14px] sm:text-[16px] font-medium leading-6 max-w-3xl mx-auto mb-4">
              Join a growing network of forward-thinking executives and
              enterprise leaders shaping the future of business.
            </p>
          </Reveal>
        </div>
        <div className="mt-20 sm:mt-16 text-center">
          {SHOW_LOGOS && (
            <Reveal direction="up" delay={200}>
              {/* TRUSTED BY LEADERS MARQUEE */}
              <div className="mt-4 relative overflow-hidden w-full">
                {/* LEFT FADE */}
                <div
                  className="absolute inset-y-0 left-0 z-10 pointer-events-none"
                  style={{
                    width: "120px",
                    background:
                      "linear-gradient(to right, #ffffff 0%, transparent 100%)",
                  }}
                />

                {/* RIGHT FADE */}
                <div
                  className="absolute inset-y-0 right-0 z-10 pointer-events-none"
                  style={{
                    width: "140px",
                    background:
                      "linear-gradient(to left, #ffffff 0%, transparent 100%)",
                  }}
                />

                {/* MARQUEE TRACK */}
                <div
                  className="flex w-max items-center py-3 whitespace-nowrap will-change-transform"
                  style={{ animation: "marquee 22s linear infinite" }}
                >
                  {marqueeLogos.map((logo, index) => (
                    <div
                      key={`${logo.name}-${index}`}
                      className="flex items-center justify-center shrink-0 mx-10 sm:mx-12 lg:mx-14"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-16 sm:h-12 md:h-18 max-w-full object-contain select-none"
                        loading="lazy"
                        draggable={false}
                        style={{
                          mixBlendMode: "multiply",
                          filter: "grayscale(20%)",
                          transition: "filter 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.filter = "grayscale(0%)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.filter = "grayscale(20%)")
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
        {SHOW_LOGOS && (
          <style>{`
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`}</style>
        )}
        {/* FINAL CTA BANNER*/}
        <Reveal direction="up" delay={80} className="mt-16 sm:mt-20">
          <div
            className="
            relative overflow-hidden rounded-[14px]
            min-h-35s lg:h-40 flex items-center shadow-md
            hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]
            transition-shadow duration-500 ease-out
          "
          >
            {/* Background Image */}
            <img
              src={Bgimage}
              alt="Leadership Background"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative z-10 w-full px-5 sm:px-8 lg:px-10 py-6 sm:py-7">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-10">
                {/* Left Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-white uppercase text-[10px] sm:text-[11px] lg:text-[12px] font-medium tracking-wider mb-2 opacity-90">
                    STEP INTO THE INNER CIRCLE OF LEADERSHIP
                  </p>
                  <h2 className="text-white text-[22px] sm:text-[26px] lg:text-[34px] font-bold leading-tight mb-1.5 lg:whitespace-nowrap">
                    Lead. Influence. Transform.
                  </h2>
                  <p className="text-white/85 text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-relaxed max-w-2xl">
                    Become part of a high-impact leadership ecosystem designed
                    for those who define the future.
                  </p>
                </div>

                {/* Right Buttons */}
                <div
                  className="flex flex-col xs:flex-row sm:flex-row flex-wrap lg:flex-nowrap
                  items-stretch xs:items-center sm:items-center gap-2 sm:gap-3
                  shrink-0 lg:justify-end w-full lg:w-auto"
                >
                  {[
                    { label: "Apply for membership", solid: true },
                    { label: "Nominate a CXO", solid: false },
                    { label: "Become a Partner", solid: false },
                  ].map(({ label, solid }, i) => (
                    <button
                      key={i}
                      className={`
                        px-4 sm:px-5 h-10 sm:h-11 rounded-lg font-semibold
                        text-[13px] sm:text-[14px] whitespace-nowrap
                        active:scale-95 transition-all duration-200 ease-out
                        ${
                          solid
                            ? "bg-white text-[#5707C7] shadow-sm hover:shadow-md hover:scale-[1.03]"
                            : "border border-white/80 text-white hover:bg-white/10 hover:border-white"
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PartnerSection;
