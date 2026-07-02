import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  FileText,
  PlaySquare,
  ClipboardList,
  Award,
  Video,
  MessageSquare,
  Star,
} from "lucide-react";

import Tablet from "../assets/images/Tablet.png";
import CXOAward from "../assets/images/CXOAward.png";

/* Scroll-reveal hook (fires once, stays visible) */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* Reusable reveal wrapper */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView(0.08);
  const hidden = {
    up: "translateY(24px)",
    left: "translateX(-24px)",
    right: "translateX(24px)",
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

/* Animated feature row */
const FeatureItem = ({ icon: Icon, text, color, delay }) => {
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      className="flex items-start gap-3"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.55s ease-out ${delay}ms, transform 0.55s ease-out ${delay}ms`,
      }}
    >
      <Icon
        size={24}
        className="shrink-0 mt-0.5"
        style={{ color }}
        strokeWidth={1.8}
      />
      <p className="text-[#535353] text-[16px] md:text-[16px] leading-snug font-medium">
        {text}
      </p>
    </div>
  );
};

const leftItems = [
  { icon: Users, text: "CXO Interviews and Leadership Perspectives" },
  { icon: FileText, text: "Industry Reports and Whitepapers" },
  { icon: PlaySquare, text: "Podcasts, Video Series, and Expert Panels" },
  { icon: ClipboardList, text: "Enterprise Case Studies" },
];

const rightItems = [
  { icon: Award, text: "CXO Leadership Awards and Honors" },
  { icon: Video, text: "Featured Stories and Editorial Coverage" },
  { icon: MessageSquare, text: "Speaking Engagements and Panel Opportunities" },
  { icon: Star, text: "Industry Recognition and Personal Branding" },
];

const InsightsSection = () => {
  return (
    <section className="bg-white py-14 lg:py-20 font-['Poppins'] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Groundbreaking Grid Layout for perfect baseline rows alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-8">
          {/* LEFT HEADER */}
          <div className="lg:pr-10 xl:pr-14">
            <Reveal direction="up">
              <p className="uppercase text-[#5707C7] text-[11px] sm:text-[12px] font-semibold mb-2 tracking-widest">
                Insights from the Frontlines of Leadership
              </p>
              <h2 className="text-[#111248] text-[20px] sm:text-[26px] lg:text-[26px] font-bold leading-tight">
                Intelligence That Drives Decision-Making
              </h2>
            </Reveal>
          </div>

          {/* RIGHT HEADER */}
          <div className="lg:pl-10 xl:pl-14 lg:border-l lg:border-gray-200">
            <Reveal direction="up">
              <p className="uppercase text-[#5707C7] text-[11px] sm:text-[12px] font-semibold mb-2 tracking-widest">
                Build Your Influence as a CXO
              </p>
              <h2 className="text-[#111248] text-[20px] sm:text-[24px] lg:text-[24px] font-bold leading-tight">
                Recognition. Visibility. Authority.
              </h2>
            </Reveal>
          </div>

          {/* LEFT CONTENT */}
          <div className="lg:pr-10 xl:pr-14 pb-10 lg:pb-0 border-b border-gray-200 lg:border-b-0">
            <div className="flex flex-col sm:flex-row gap-6 items-stretch h-full">
              {/* Tablet image */}
              <Reveal
                direction="left"
                delay={80}
                className="shrink-0 w-full sm:w-68.5"
              >
                <div
                  className="
                    w-full h-64.5 sm:h-full min-h-80
                    rounded-[10px] overflow-hidden
                    shadow-[0_6px_28px_rgba(87,7,199,0.13)]
                    group
                  "
                >
                  <img
                    src={Tablet}
                    alt="Tablet Analytics"
                    loading="lazy"
                    className="w-full h-full object-cover
                      group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </Reveal>

              {/* Feature list + footer */}
              <div className="flex-1 flex flex-col justify-between pt-1 gap-6">
                <div className="flex flex-col gap-8">
                  {leftItems.map((item, i) => (
                    <FeatureItem
                      key={i}
                      icon={item.icon}
                      text={item.text}
                      color="#5707C7"
                      delay={120 + i * 90}
                    />
                  ))}
                </div>

                {/* Footer text */}
                <Reveal direction="up" delay={500} className="w-full">
                  <div className="pt-3">
                    <p className="text-[#535353] text-[12px] sm:text-[13px] leading-relaxed">
                      Stay ahead with data-driven insights and peer-led
                      knowledge exchange.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:pl-10 xl:pl-14 pt-6 lg:pt-0 lg:border-l lg:border-gray-200">
            <div className="flex flex-col sm:flex-row gap-6 items-stretch h-full">
              {/* Feature list + footer — on left of image */}
              <div className="flex-1 flex flex-col justify-between pt-1 gap-5 order-2 sm:order-1">
                <div className="flex flex-col gap-8">
                  {rightItems.map((item, i) => (
                    <FeatureItem
                      key={i}
                      icon={item.icon}
                      text={item.text}
                      color="#FB6427"
                      delay={120 + i * 90}
                    />
                  ))}
                </div>

                {/* Footer text */}
                <Reveal direction="up" delay={500} className="w-full">
                  <div className="pt-3">
                    <p className="text-[#535353] text-[14px] sm:text-[14px] leading-relaxed">
                      Position yourself as a recognized voice in the executive
                      ecosystem.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Award image */}
              <Reveal
                direction="right"
                delay={80}
                className="shrink-0 w-full sm:w-60.5 order-1 sm:order-3 self-center sm:self-auto"
              >
                <div
                  className="
                    w-full h-92 sm:h-90.74
                    rounded-[10px] overflow-hidden
                    shadow-[0_6px_28px_rgba(251,100,39,0.13)]
                    group
                  "
                >
                  <img
                    src={CXOAward}
                    alt="CXO Award"
                    loading="lazy"
                    className="w-full h-full object-cover object-[70%_center]
                      group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
