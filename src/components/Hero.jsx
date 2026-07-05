import React, { useEffect, useRef, useState } from "react";
import { Monitor, Megaphone, Users, UserRound } from "lucide-react";
import HeroImage from "../assets/images/HeroImage.png";

function useInView(threshold = 0.06) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}
const isMobile = window.innerWidth < 768;
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView(0.05);
  const hidden = {
    up: "translateY(22px)",
    left: "translateX(-22px)",
    right: "translateX(22px)",
    none: "none",
  }[direction];
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : hidden,
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

const councils = [
  {
    icon: Monitor,
    title: "CIO\nSherpa Council",
    description: "Driving enterprise technology and digital transformation",
    iconBg: "bg-[#E8D9FF]",
    iconColor: "#5707C7",
  },
  {
    icon: Megaphone,
    title: "CMO\nSherpa Council",
    description: "Advancing growth, brand, and customer strategy",
    iconBg: "bg-[#FCECE3]",
    iconColor: "#FB6427",
  },
  {
    icon: Users,
    title: "CHRO\nSherpa Council",
    description: "Leading talent, culture, and workforce transformation",
    iconBg: "bg-[#E8D9FF]",
    iconColor: "#5707C7",
  },
  {
    icon: UserRound,
    title: "CYBER\nSherpa Councils",
    description: "Securing, scaling, and sustaining modern enterprises",
    iconBg: "bg-[#E8D9FF]",
    iconColor: "#5707C7",
  },
];

const Hero = () => {
  return (
    /* outer wrapper — clips horizontal overflow from absolute image */
    <div className="overflow-x-hidden font-['Poppins'] bg-white">
      {/*  HERO SECTION  */}
      <section className="relative bg-[#F9F8FD] pb-20 lg:pb-36">
        {/* Full-bleed right-half background image — absolute, top to bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden lg:block"
          style={{ width: "54%" }}
        >
          <img
            src={HeroImage}
            alt=""
            loading="eager"
            className="w-full h-full object-cover"
            style={{ borderRadius: 0, display: "block" }}
          />
          {/* Gradient fade: solid bg-color → transparent, bleeds over left content */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #F9F8FD 0%, rgba(249,248,253,0.6) 18%, rgba(249,248,253,0.15) 38%, transparent 58%)",
            }}
          />
        </div>

        {/* Hero content — sits above image layer */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex items-center"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <div className="w-full grid lg:grid-cols-12 gap-12 pt-16 pb-6 lg:pt-20 lg:pb-0">
            {/* LEFT — text + buttons */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <Reveal direction="left" delay={0}>
                <h1 className="font-bold leading-[1.12] text-[32px] sm:text-[46px] md:text-[46px] lg:text-[50px]">
                  The Premier
                  <br />
                  <span className="text-[#5707C7]">C-Suite</span>{" "}
                  <span className="text-[#FF5E2B]">Leadership</span>
                  <br />
                  Ecosystem
                </h1>
              </Reveal>

              <Reveal
                direction="left"
                delay={130}
                className="mt-6 space-y-3 max-w-120"
              >
                <p className="text-[#52525B] text-[14px] leading-relaxed">
                  CXO Sherpa Council is a curated, multi-disciplinary leadership
                  platform designed for the world's most influential
                  decision-makers and emerging digital leaders.
                </p>
                <p className="text-[#52525B] text-[14px] leading-relaxed">
                  We bring together strategic thinkers, industry pioneers, and
                  transformation leaders to foster collaboration, accelerate
                  innovation, and shape the future of enterprise leadership.
                </p>
              </Reveal>

              <Reveal
                direction="left"
                delay={240}
                className="flex flex-wrap gap-3 mt-9"
              >
                <button
                  className="
                  bg-[#5707C7] text-white
                  px-6 py-2.75 rounded-xl
                  text-[14px] font-semibold tracking-wide
                  hover:bg-[#4906a8]
                  hover:shadow-[0_6px_22px_rgba(87,7,199,0.42)]
                  active:scale-[0.97]
                  transition-all duration-200 ease-out
                  whitespace-nowrap
                "
                >
                  Apply for membership
                </button>
                <button
                  className="
                  border border-[#5707C7] text-[#5707C7]
                  px-6 py-2.75 rounded-xl
                  text-[14px] font-medium bg-transparent
                  hover:bg-[#F3EEFF]
                  active:scale-[0.97]
                  transition-all duration-200 ease-out
                  whitespace-nowrap
                "
                >
                  Explore Councils
                </button>
              </Reveal>
            </div>

            {/* RIGHT — empty placeholder (image is in absolute layer) */}
            <div className="hidden lg:block lg:col-span-6" />

            {/* Mobile image */}
            <div className="lg:hidden col-span-full w-full rounded-2xl overflow-hidden shadow-md">
              <img
                src={HeroImage}
                alt="Leadership Ecosystem"
                loading="eager"
                className="w-full h-60 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/*  INTERSECTION LAYER FOR COUNCIL CARD  */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-14 pb-16 bg-transparent">
        <div className="max-w-7xl mx-auto -mt-16 sm:-mt-24 lg:-mt-14">
          <CouncilCard />
        </div>
      </div>
    </div>
  );
};

const CouncilCard = () => {
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 0.65s ease-out 80ms, transform 0.65s ease-out 80ms",
      }}
      className="
        bg-white rounded-xl
        border border-[#E6E6E6]
        shadow-[0_12px_40px_rgba(0,0,0,0.10)]
        px-4 sm:px-6 md:px-8
        pt-7 sm:pt-8
        pb-6 sm:pb-8
      "
    >
      <Reveal direction="up" delay={80}>
        <p className="text-center text-[#5707C7] text-[11px] sm:text-[12px] md:text-[13px] font-semibold uppercase tracking-wider mb-3">
          One Platform. Multiple Leadership Councils.
        </p>
      </Reveal>

      <Reveal direction="up" delay={140}>
        <h2 className="text-center text-[#111248] text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-7 sm:mb-8">
          A Unified Ecosystem for Every CXO Role
        </h2>
      </Reveal>

      {/* CENTERED GRID CONTAINER WITH MAX-WIDTH LIMITATIONS */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 justify-center items-stretch max-w-225 mx-auto">
        {councils.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal
              key={i}
              direction="up"
              delay={isMobile ? 0 : 160 + i * 70}
              className="w-full flex justify-center"
            >
              <div
                className="
                border border-[#E2E8F0] rounded-xl
                bg-white/10
                px-4 py-6
                text-center
                max-w-52.5 w-full
                flex flex-col items-center justify-start
                backdrop-blur-2xl
                hover:bg-white/15
                hover:shadow-[0_8px_24px_rgba(87,7,199,0.08)]
                hover:border-[#C4A9FF]
                hover:-translate-y-0.5
                transition-all duration-200 ease-out
                group
              "
              >
                {/* Icon wrapper exactly matching smaller aesthetic */}
                <div
                  className={`
                  w-10 h-12 sm:w-12 sm:h-12 rounded-full ${item.iconBg}
                  flex items-center justify-center mb-4
                  group-hover:scale-105
                  transition-transform duration-200 ease-out
                `}
                >
                  <Icon size={22} color={item.iconColor} strokeWidth={1.5} />
                </div>

                <h3 className="whitespace-pre-line text-[#1E1E1E] text-[11px] sm:text-[14px] font-semibold leading-snug mb-2.5">
                  {item.title}
                </h3>

                <p className="text-[#52525B] text-[10px] leading-normal font-medium tracking-normal px-1">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
