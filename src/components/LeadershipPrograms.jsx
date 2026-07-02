import React, { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import Masterclass from "../assets/images/Masterclass.png";
import ai from "../assets/icons/ai.png";
import AI from "../assets/images/AI.png";
import Chess from "../assets/images/Chess.png";
import Growth from "../assets/images/Growth.png";

/* Scroll-reveal hook
   - inView = true  when element enters viewport
   - inView = false when element leaves viewport
   (bidirectional — element hides when scrolled away) */
function useInView(threshold = 0.12) {
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

/* Reusable fade-slide reveal wrapper */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView(0.1);

  const hidden = {
    up: "translateY(32px)",
    down: "translateY(-32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
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

/* Individual card — has its own observer so each card triggers independently as it scrolls in */
const ProgramCard = ({ card, delay }) => {
  const [ref, inView] = useInView(0.1);
  const IconComponent = card.icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(36px) scale(0.97)",
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
      /* responsive width:
         mobile  → full width (capped at 310px, centred)
         sm–md   → ~45% so 2 per row
         lg+     → flex-1 in a nowrap row, capped at 310px  */
      className="
        w-full max-w-77.5 mx-auto
        sm:w-[calc(50%-12px)] sm:mx-0 sm:max-w-none
        lg:w-72.5 lg:max-w-77.5 lg:mx-0
        h-auto lg:h-96.25
        bg-white rounded-[10px] border border-gray-100 shadow-sm
        relative flex flex-col overflow-hidden
        group
        hover:shadow-[0_12px_36px_rgba(87,7,199,0.12)]
        hover:-translate-y-1
        transition-all duration-300 ease-out
        shrink-0
      "
    >
      {/* Card image */}
      <div className="w-full h-39.25 relative overflow-hidden bg-gray-900 shrink-0">
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* subtle image overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Floating icon badge */}
      <div className="absolute top-33.25 left-4 z-10">
        <div
          className={`
            w-12 h-12 rounded-full ${card.iconBg}
            flex items-center justify-center text-white shadow-sm
            group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.22)]
            transition-all duration-300 ease-out
          `}
        >
          <DynamicIcon name={card.icon} size={22} strokeWidth={2} />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 pt-10 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 className="text-[#1A1A1A] text-[17px] font-bold leading-snug tracking-tight whitespace-pre-line">
            {card.title}
          </h3>
          <p className="text-[#52525B] text-[13px] leading-relaxed font-normal mt-4">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
};

/*  DYNAMIC ICON LOADER */
const customIcons = {
  ai,
};
const DynamicIcon = ({ name, size = 22 }) => {
  if (customIcons[name]) {
    return (
      <img
        src={customIcons[name]}
        alt=""
        style={{
          width: size,
          height: size,
          objectFit: "contain",
        }}
      />
    );
  }

  const IconComponent = Icons[name] || Icons.HelpCircle;

  return <IconComponent size={size} color="white" strokeWidth={2} />;
};
const programs = [
  {
    image: Masterclass,
    icon: "GraduationCap",
    iconBg: "bg-[#5707C7]",
    title: "CXO Masterclasses",
    description:
      "Expert-led executive learning for real world leadership challenges",
  },
  {
    image: AI,
    icon: "ai",
    iconBg: "bg-[#FF5E2B]",
    title: "AI and Digital\nLeadership Labs",
    description:
      "Applied innovation frameworks to future proof your enterprise",
  },
  {
    image: Chess,
    icon: "FileText",
    iconBg: "bg-[#5707C7]",
    title: "Transformation\nPlaybooks",
    description: "Strategy-to-execution models for measurable impacts",
  },
  {
    image: Growth,
    icon: "Users",
    iconBg: "bg-[#FF5E2B]",
    title: "Boardroom Simulation\nExperiences",
    description:
      "Real-world decision environments to sharpen executive judgement",
  },
];

const LeadershipPrograms = () => {
  return (
    <section className="w-full bg-[#F9F8FD] py-16 px-4 font-['Poppins',sans-serif] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Subtitle */}
        <Reveal direction="up">
          <span className="text-[#5707C7] text-xs md:text-[13px] font-bold tracking-wider uppercase text-center mb-3 block">
            Structured Programs for Modern Leadership
          </span>
        </Reveal>

        {/* Heading */}
        <Reveal direction="up" delay={100}>
          <h2 className="text-[#111248] text-center text-2xl md:text-[32px] font-bold tracking-tight mb-14 max-w-3xl">
            Designed for Continuous Growth and Transformation
          </h2>
        </Reveal>

        {/* Card grid
            mobile  : 1 column, centred
            sm–md   : 2 columns, wrapped
            lg+     : single nowrap row (original layout), scroll if needed
         */}
        <div
          className="
            flex flex-col items-center gap-6 w-full
            sm:flex-row sm:flex-wrap sm:justify-center sm:items-stretch
            lg:flex-nowrap lg:overflow-x-auto lg:justify-center
            pb-2 lg:pb-1
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none
          "
        >
          {programs.map((card, idx) => (
            <ProgramCard key={idx} card={card} delay={idx * 110} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipPrograms;
