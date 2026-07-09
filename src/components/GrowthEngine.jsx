import React, { useEffect, useRef, useState } from "react";
import { Users, PencilLine, CalendarDays, Rocket } from "lucide-react";

/* Bidirectional scroll-reveal hook
   visible when near viewport, hidden when away */
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

/* Reveal wrapper */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView(0.08);

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

const features = [
  {
    icon: Users,
    title: "Peer-to-Peer\nLeadership Exchange",
    description:
      "Engage with a trusted network of verified CXOs through curated, high-value interactions.",
  },
  {
    icon: PencilLine,
    title: "Thought &\nLeadership",
    description:
      "Publish insights, participate in executive conversations, and build credible authority at scale.",
  },
  {
    icon: CalendarDays,
    title: "Executive Events &\nRoundtables",
    description:
      "Access invite-only summits, boardroom discussions, and strategic forums.",
  },
  {
    icon: Rocket,
    title: "Career & Influence\nAcceleration",
    description:
      "Unlock opportunities for speaking, recognition, advisory roles, and industry visibility.",
  },
];

const GrowthEngine = () => {
  const [cardRef, cardInView] = useInView(0.08);

  return (
    <section className="w-full bg-white py-10 sm:py-12 px-4 font-['Poppins',sans-serif] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/*  Outer card with border glow matching image  */}
        <div
          ref={cardRef}
          style={{
            opacity: cardInView ? 1 : 0,
            transform: cardInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
          }}
          className="
            bg-[#2E0578] rounded-xl
            px-6 sm:px-8 md:px-12
            py-10 sm:py-12
            border border-[#5B2BC7]
            shadow-[0_0_0_1px_rgba(91,43,199,0.4),0_8px_40px_rgba(46,5,120,0.5)]
          "
        >
          {/* Heading */}
          <Reveal direction="up" delay={100}>
            <h2
              className="
              text-center text-white font-semibold
              text-[18px] sm:text-[22px] md:text-[26px] lg:text-[24px]
              leading-snug mb-10 sm:mb-12
              max-w-2xl mx-auto
            "
            >
              More Than a Network. A Leadership Growth Engine.
            </h2>
          </Reveal>

          <div
            className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8 sm:gap-10 lg:gap-0
          "
          >
            {features.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === features.length - 1;

              return (
                <Reveal
                  key={index}
                  direction="up"
                  delay={150 + index * 90}
                  className={`
                    flex flex-col items-center text-center
                    px-4 lg:px-6
                    ${!isLast ? "lg:border-r lg:border-dashed lg:border-[#7E5FC7]" : ""}
                    ${
                      /* mobile horizontal divider between rows on sm 2-col grid */
                      index === 1
                        ? "sm:border-r sm:border-dashed sm:border-[#7E5FC7] lg:border-r lg:border-dashed lg:border-[#7E5FC7]"
                        : ""
                    }
                  `}
                >
                  <div
                    className="
                    relative flex items-center justify-center
                    w-14 h-14 rounded-full
                    bg-white/5
                    mb-5
                    group
                    hover:bg-white/10
                    transition-colors duration-300
                  "
                  >
                    <Icon
                      size={30}
                      color="#FB6427"
                      strokeWidth={1.6}
                      className="
                        group-hover:scale-110
                        transition-transform duration-300 ease-out
                      "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                    text-white font-semibold
                    text-[14px] sm:text-[15px] md:text-[16px]
                    leading-snug whitespace-pre-line
                    mb-4
                  "
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                    text-white/80
                    text-[12px] sm:text-[13px] md:text-[13.5px]
                    leading-relaxed
                    max-w-50 sm:max-w-55
                    mx-auto
                  "
                  >
                    {item.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthEngine;
