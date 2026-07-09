import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/backgroundImage.png";
import CxoImage from "../assets/images/CxoImage.png";

const STEPS = [
  "Personal Information",
  "Professional Profile",
  "Community Participation",
  "Areas of Interest",
  "Membership Interest",
];

const INDUSTRY_OPTIONS = [
  "Technology / IT",
  "Healthcare",
  "Finance / Banking",
  "Education",
  "Manufacturing",
  "Retail / E-commerce",
  "Real Estate",
  "Consulting",
  "Other",
];

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const INPUT_CLS =
  "w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-gray-900 " +
  "placeholder-gray-400 bg-white focus:outline-none focus:border-[#4a04c4] focus:ring-1 " +
  "focus:ring-[#4a04c4] transition-all duration-200 shadow-sm";

const LABEL_CLS = "block text-[13px] font-semibold text-gray-600 mb-1.5";

const CB_WRAP_CLS = "flex items-start gap-2.5 cursor-pointer group";

const CB_TEXT_CLS =
  "text-[14px] text-gray-600 leading-snug group-hover:text-gray-900 transition-colors";

const CB_INPUT_CLS =
  "mt-[3px] w-4 h-4 text-[#4a04c4] bg-gray-100 border-gray-300 rounded focus:ring-[#4a04c4] focus:ring-2 cursor-pointer transition-all";

const SECTION_TITLE_CLS =
  "text-[13px] font-bold text-[#4a04c4] uppercase tracking-wider mb-4 pb-1";

// CustomDropdown

const CustomDropdown = ({ options, value, onChange, name, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <div
        className={`${INPUT_CLS} flex justify-between items-center cursor-pointer select-none`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <span
          className="text-gray-400 text-xs ml-2 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </div>

      {/* Options list */}
      {isOpen && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto py-1">
          {options.map((opt) => (
            <li
              key={opt}
              className={
                "px-4 py-2.5 text-[14px] cursor-pointer transition-colors duration-100 " +
                (value === opt
                  ? "bg-purple-50 text-[#4a04c4] font-semibold"
                  : "text-gray-700 hover:bg-gray-50")
              }
              onClick={() => {
                onChange({ target: { name, value: opt } });
                setIsOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MembershipForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [highestCompletedStep, setHighestCompletedStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    officialEmail: "",
    countryCode: "+91",
    mobileNumber: "",
    linkedIn: "",
    designation: "",
    organization: "",
    industry: "",
    city: "",
    state: "",
    leadershipRole: [],
    leadershipRoleOther: "",
    experience: [],
    expertise: [],
    expertiseOther: "",
    membershipCategory: [],
    contributeAs: [],
    areasOfInterest: [],
    motivation: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const list = prev[category] || [];
      return {
        ...prev,
        [category]: checked
          ? [...list, value]
          : list.filter((item) => item !== value),
      };
    });
  };

  const nextStep = () => {
    const form = document.querySelector("form");
    if (!form.reportValidity()) return;

    if (currentStep === 0 && (!formData.industry || !formData.state)) {
      alert("Please select your Industry and State from the dropdowns.");
      return;
    }
    if (
      currentStep === 1 &&
      (formData.leadershipRole.length === 0 ||
        formData.experience.length === 0 ||
        formData.expertise.length === 0)
    ) {
      alert(
        "Please select at least one option for each section (Leadership, Experience, Expertise).",
      );
      return;
    }
    if (
      currentStep === 2 &&
      (formData.membershipCategory.length === 0 ||
        formData.contributeAs.length === 0)
    ) {
      alert(
        "Please select at least one option for each section (Membership Category, Contribution).",
      );
      return;
    }
    if (currentStep === 3 && formData.areasOfInterest.length === 0) {
      alert("Please select at least one area of interest.");
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setHighestCompletedStep((prev) => Math.max(prev, currentStep + 1));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = document.querySelector("form");
    if (!form.reportValidity()) {
      setIsSubmitting(false);
      return;
    }
    if (currentStep === 4 && !formData.motivation.trim()) {
      alert("Please elaborate on why you want to join.");
      setIsSubmitting(false);
      return;
    }

    // Dummy submission mock
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
    }, 1500);
  };

  //  Step content renderer

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="md:col-span-2">
              <label className={LABEL_CLS}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={INPUT_CLS}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Official Email Address</label>
              <input
                type="email"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleInputChange}
                className={INPUT_CLS}
                placeholder="Your official email"
                required
              />
            </div>
            <div>
              <label className={LABEL_CLS}>
                Phone Number (with country code)
              </label>
              <div className="flex gap-2">
                <div className="relative w-21.25 shrink-0">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className={`${INPUT_CLS} appearance-none pr-6 bg-transparent relative z-10 cursor-pointer text-center`}
                  >
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none z-0">
                    ▼
                  </span>
                </div>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className={`${INPUT_CLS} flex-1`}
                  placeholder="Your mobile number"
                  required
                />
              </div>
            </div>
            <div>
              <label className={LABEL_CLS}>LinkedIn Profile URL</label>
              <input
                type="url"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleInputChange}
                className={INPUT_CLS}
                placeholder="https://linkedin.com/in/your-profile"
                required
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className={INPUT_CLS}
                placeholder="Your designation"
                required
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Organization / Company</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className={INPUT_CLS}
                placeholder="Your company name"
                required
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Industry</label>
              <CustomDropdown
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                options={INDUSTRY_OPTIONS}
                placeholder="Select your industry"
              />
            </div>
            <div>
              <label className={LABEL_CLS}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={INPUT_CLS}
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className={LABEL_CLS}>State</label>
              <CustomDropdown
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                options={INDIAN_STATES}
                placeholder="Select state"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h4 className={SECTION_TITLE_CLS}>Leadership Role</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "CIO",
                  "CTO",
                  "CISO",
                  "CDO",
                  "Chief AI Officer",
                  "Chief Digital Officer",
                  "VP Technology",
                  "Head – IT",
                  "Head – Digital Transformation",
                ].map((role) => (
                  <label key={role} className={CB_WRAP_CLS}>
                    <input
                      type="checkbox"
                      name="leadershipRole"
                      value={role}
                      checked={formData.leadershipRole.includes(role)}
                      onChange={(e) =>
                        handleCheckboxChange(e, "leadershipRole")
                      }
                      className={CB_INPUT_CLS}
                    />
                    <span className={CB_TEXT_CLS}>{role}</span>
                  </label>
                ))}
                <div className="col-span-2 md:col-span-3 flex items-center gap-3 mt-2">
                  <span
                    className={`${CB_TEXT_CLS} font-semibold whitespace-nowrap`}
                  >
                    Other:
                  </span>
                  <input
                    type="text"
                    name="leadershipRoleOther"
                    value={formData.leadershipRoleOther}
                    onChange={handleInputChange}
                    className={`${INPUT_CLS} flex-1`}
                    placeholder="Please specify"
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className={SECTION_TITLE_CLS}>
                Years of Leadership Experience
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["5–10 Years", "10–15 Years", "15–20 Years", "20+ Years"].map(
                  (exp) => (
                    <label key={exp} className={CB_WRAP_CLS}>
                      <input
                        type="checkbox"
                        name="experience"
                        value={exp}
                        checked={formData.experience.includes(exp)}
                        onChange={(e) => handleCheckboxChange(e, "experience")}
                        className={CB_INPUT_CLS}
                      />
                      <span className={CB_TEXT_CLS}>{exp}</span>
                    </label>
                  ),
                )}
              </div>
            </div>
            <div>
              <h4 className={SECTION_TITLE_CLS}>Primary Areas of Expertise</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Artificial Intelligence",
                  "Cybersecurity",
                  "Cloud Computing",
                  "Digital Transformation",
                  "Data & Analytics",
                  "Automation",
                  "Enterprise Applications",
                  "IT Infrastructure",
                  "Governance & Compliance",
                  "Emerging Technologies",
                ].map((item) => (
                  <label key={item} className={CB_WRAP_CLS}>
                    <input
                      type="checkbox"
                      name="expertise"
                      value={item}
                      checked={formData.expertise.includes(item)}
                      onChange={(e) => handleCheckboxChange(e, "expertise")}
                      className={CB_INPUT_CLS}
                    />
                    <span className={CB_TEXT_CLS}>{item}</span>
                  </label>
                ))}
                <div className="col-span-2 md:col-span-3 flex items-center gap-3 mt-2">
                  <span
                    className={`${CB_TEXT_CLS} font-semibold whitespace-nowrap`}
                  >
                    Other:
                  </span>
                  <input
                    type="text"
                    name="expertiseOther"
                    value={formData.expertiseOther}
                    onChange={handleInputChange}
                    className={`${INPUT_CLS} flex-1`}
                    placeholder="Please specify"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h4 className={SECTION_TITLE_CLS}>Membership Category</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Founding Member",
                  "Executive Member",
                  "Corporate Member",
                  "Government Member",
                  "Advisory Council Member",
                  "Academic Member",
                  "Startup & Innovation Member",
                ].map((cat) => (
                  <label key={cat} className={CB_WRAP_CLS}>
                    <input
                      type="checkbox"
                      name="membershipCategory"
                      value={cat}
                      checked={formData.membershipCategory.includes(cat)}
                      onChange={(e) =>
                        handleCheckboxChange(e, "membershipCategory")
                      }
                      className={CB_INPUT_CLS}
                    />
                    <span className={CB_TEXT_CLS}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className={SECTION_TITLE_CLS}>
                I Would Like to Contribute As:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Speaker",
                  "Mentor",
                  "Author",
                  "Panelist",
                  "Research Contributor",
                  "Jury Member",
                  "Council Ambassador",
                  "Startup Mentor",
                ].map((role) => (
                  <label key={role} className={CB_WRAP_CLS}>
                    <input
                      type="checkbox"
                      name="contributeAs"
                      value={role}
                      checked={formData.contributeAs.includes(role)}
                      onChange={(e) => handleCheckboxChange(e, "contributeAs")}
                      className={CB_INPUT_CLS}
                    />
                    <span className={CB_TEXT_CLS}>{role}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-3">
            {[
              "Executive Networking",
              "Leadership Roundtables",
              "AI & Innovation Forums",
              "Industry Research",
              "Policy Discussions",
              "Masterclasses",
              "Awards & Recognition",
              "Thought Leadership",
              "Publications",
              "Executive Events",
            ].map((interest) => (
              <label key={interest} className={CB_WRAP_CLS}>
                <input
                  type="checkbox"
                  name="areasOfInterest"
                  value={interest}
                  checked={formData.areasOfInterest.includes(interest)}
                  onChange={(e) => handleCheckboxChange(e, "areasOfInterest")}
                  className={CB_INPUT_CLS}
                />
                <span className={CB_TEXT_CLS}>{interest}</span>
              </label>
            ))}
          </div>
        );

      case 4:
        return (
          <div>
            <label className="block text-[15px] font-semibold text-gray-800 mb-3">
              Why do you want to join the CXO Sherpa Council?
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              className={`${INPUT_CLS} min-h-40 resize-y`}
              placeholder="Please elaborate on your motivations and goals..."
              required
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden font-sans">
      {/* Dynamic Keyframes for smooth standard fade-in without relying on missing plugins */}
      <style>{`
        @keyframes customFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-step {
          animation: customFadeIn 0.4s ease-out forwards;
        }
      `}</style>

      {/* Background Graphic positioned Top-Right strictly */}
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-87.5 md:w-125 max-w-full h-auto object-top-right object-contain pointer-events-none select-none z-0"
      />

      {/* ── Header ── */}
      <header className="relative z-10 text-center pt-12 pb-10 px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-[38px] font-bold inline-flex items-center justify-center flex-wrap gap-2 md:gap-3 leading-tight">
          <span className="text-orange-500">Join</span>
          <img
            src={CxoImage}
            alt="CXO Sherpa"
            className="h-9 md:h-11 w-auto mx-1"
          />
          <span className="text-orange-500">Sherpa Council</span>
        </h1>
        <h2 className="text-[14px] md:text-[15px] font-bold text-[#4a04c4] tracking-widest uppercase mt-4">
          Membership Application Form
        </h2>
      </header>

      {/*  Page layout  */}
      <div className="relative z-10 flex flex-col md:flex-row gap-10 max-w-275 mx-auto px-6 pb-24 items-start">
        {/*  Sidebar Stepper  */}
        <aside className="w-full md:w-70 shrink-0 md:sticky md:top-10 relative mt-2">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-4.75 top-6 bottom-10 w-0.5 bg-orange-200 z-0"></div>

          <nav
            aria-label="Form steps"
            className="flex md:flex-col flex-row flex-wrap gap-8 md:gap-10 relative z-10"
          >
            {STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isLocked = index > highestCompletedStep;

              return (
                <div
                  key={index}
                  role="button"
                  tabIndex={isLocked ? -1 : 0}
                  aria-current={isActive ? "step" : undefined}
                  aria-disabled={isLocked}
                  onClick={() => {
                    if (!isLocked) setCurrentStep(index);
                  }}
                  className={[
                    "flex items-center gap-4 transition-all duration-200 outline-none group bg-transparent",
                    isLocked
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer",
                  ].join(" ")}
                >
                  {/* Step circle container */}
                  <div className="relative w-10 h-10 flex items-center justify-center shrink-0 z-10 bg-white rounded-full">
                    {/* Active state Pulse Animation */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#4a04c4] animate-ping opacity-25 duration-1000"></span>
                    )}

                    <div
                      className={[
                        "relative w-full h-full rounded-full flex items-center justify-center text-[15px] transition-all z-10",
                        isActive
                          ? "bg-[#4a04c4] text-white font-bold"
                          : "border-2 border-[#ea580c] text-[#ea580c] font-semibold bg-white",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Step label */}
                  <span
                    className={[
                      "text-[15px] font-medium leading-tight",
                      isActive
                        ? "text-gray-900 font-bold"
                        : "text-gray-500 group-hover:text-gray-800",
                    ].join(" ")}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </nav>
        </aside>

        {/*  Form Panel  */}
        <main className="flex-1 w-full bg-white rounded-2xl shadow-[0_4px_24px_rgb(0,0,0,0.04)] border-[1.5px] border-orange-500 p-8 md:p-12 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div key={currentStep} className="flex-1 animate-fade-in-step">
              <h2 className="text-[22px] font-bold text-[#2e0964] mb-8">
                {STEPS[currentStep]}
              </h2>

              {renderStep()}
            </div>

            {/*  Navigation actions  */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
                className="px-6 py-2.5 rounded-lg text-[14px] font-semibold text-gray-500 hover:bg-gray-100 transition-all duration-200 disabled:opacity-60"
              >
                Back
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-10 py-3 rounded-lg text-[14px] font-semibold text-white bg-[#4a04c4] hover:bg-purple-900 active:scale-95 transition-all duration-200 shadow-md shadow-purple-900/20"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-3 rounded-lg text-[14px] font-semibold text-white bg-[#4a04c4] hover:bg-purple-900 active:scale-95 transition-all duration-200 shadow-md shadow-purple-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting…" : "Continue"}
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MembershipForm;
