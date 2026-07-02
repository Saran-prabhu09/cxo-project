import React, { useEffect, useRef, useState } from "react";
import StageImage from "../assets/images/StageImage.png";

/* Scroll-reveal hook (bidirectional)
   element fades in when scrolled near,
   fades out when scrolled away */
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

/*Reveal wrapper */
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView(0.08);

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
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

/*Animated count-up for metric numbers - Completes calculation even if scrolled away quickly*/
const CountUp = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.2);

  useEffect(() => {
    if (!inView) {
      setCount(0); // resets when leaving viewport
      return;
    }

    const end = parseInt(target, 10);
    const duration = 4200;
    let frameId;
    let startTime;

    function animate(time) {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};
/* Data*/
const metrics = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-[#5707C7]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    value: "500",
    suffix: "+",
    label: "CXO's",
    multiline: false,
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-[#5707C7]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
    value: "50",
    suffix: "+",
    label: (
      <>
        Strategic
        <br />
        Engagements
      </>
    ),
    multiline: true,
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-[#5707C7]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    value: "20",
    suffix: "+",
    label: (
      <>
        Industry
        <br />
        Domains
      </>
    ),
    multiline: true,
  },
];

const listItems = [
  "Closed-Door CXO Roundtables",
  "Leadership Summits and Strategic Forums",
  "CXO Leadership Excellence Awards",
  "Industry-Specific Executive Dialogues",
];

const WhereLeadersConverge = () => {
  return (
    <section className="bg-white py-14 lg:py-16 font-['Poppins'] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col gap-8 lg:grid lg:gap-6 lg:items-center"
          style={{ gridTemplateColumns: "1fr 331px 1fr" }}
        >
          {/* LEFT — text content */}
          <div className="flex flex-col gap-5">
            <Reveal direction="left">
              <p className="text-[#5707C7] text-[11px] sm:text-[12px] font-semibold uppercase tracking-widest">
                Signature Experiences That Define Leadership
              </p>
            </Reveal>

            <Reveal direction="left" delay={80}>
              <h2 className="text-[#111248] text-[26px] sm:text-[30px] lg:text-[32px] font-bold leading-tight">
                Where Leaders Converge
              </h2>
            </Reveal>

            <ul className="flex flex-col gap-4 sm:gap-5">
              {listItems.map((item, i) => (
                <Reveal key={i} direction="left" delay={120 + i * 70}>
                  <li className="flex items-center gap-3 text-[#52525B] text-[14px] sm:text-[15px] lg:text-[16px] font-medium">
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-[#5707C7] shrink-0
                        transition-transform duration-300 hover:scale-125"
                    />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* CENTER — stage image */}
          <Reveal direction="none" delay={100}>
            <div
              className="
                w-full mx-auto overflow-hidden rounded-[10px]
                shadow-[0_8px_32px_rgba(87,7,199,0.13)]
                hover:shadow-[0_14px_44px_rgba(87,7,199,0.22)]
                transition-shadow duration-400 ease-out
                group
              "
              style={{
                maxWidth: "331px",
                height: "293px",
              }}
            >
              <img
                src={StageImage}
                alt="Leadership Event"
                loading="lazy"
                className="w-full h-full object-cover
                  group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Reveal>

          {/* RIGHT — metric cards */}
          <div
            className="
            flex flex-row gap-3 overflow-x-auto pb-1
            sm:justify-center
            lg:grid lg:grid-cols-3 lg:gap-3 lg:overflow-x-visible lg:pb-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none
          "
          >
            {metrics.map((card, i) => (
              <Reveal key={i} direction="right" delay={100 + i * 90}>
                <div
                  className="
                    bg-white border border-[#E5E7EB] rounded-[10px]
                    flex flex-col items-center justify-start text-center
                    px-3 pt-7 pb-6
                    min-w-27 sm:min-w-0
                    hover:border-[#5707C7]/30
                    hover:shadow-[0_4px_20px_rgba(87,7,199,0.10)]
                    transition-all duration-300 ease-out group
                  "
                  style={{ height: "220px" }}
                >
                  {/* Icon badge */}
                  <div
                    className="
                    w-11 h-11 rounded-full bg-[#F5F0FF]
                    flex items-center justify-center mb-4
                    group-hover:bg-[#ede4ff]
                    group-hover:scale-110
                    transition-all duration-300 ease-out
                  "
                  >
                    {card.icon}
                  </div>

                  {/* Animated number */}
                  <h3 className="text-[#5707C7] text-[32px] sm:text-[36px] lg:text-[38px] font-bold leading-none">
                    <CountUp target={card.value} suffix={card.suffix} />
                  </h3>

                  {/* Label */}
                  <p className="text-[#3F3F46] text-[12px] sm:text-[13px] leading-[1.35] mt-2 font-medium">
                    {card.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereLeadersConverge;
