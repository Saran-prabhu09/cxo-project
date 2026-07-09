import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/backgroundImage.png";
import CxoImage from "../assets/images/CxoImage.png";

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── Shared Tailwind class strings ────────────────────────────────────────────

const INPUT_CLS =
  "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 " +
  "placeholder-gray-400 bg-white focus:outline-none focus:ring-2 " +
  "focus:ring-purple-500 focus:border-transparent transition-all duration-150";

const LABEL_CLS = "block text-sm font-semibold text-gray-700 mb-1.5";

const CB_WRAP_CLS = "flex items-start gap-2.5 cursor-pointer";

const CB_TEXT_CLS = "text-sm text-gray-700 leading-snug";

const CB_INPUT_CLS =
  "mt-0.5 w-4 h-4 accent-purple-700 flex-shrink-0 cursor-pointer";

const SECTION_TITLE_CLS =
  "text-xs font-bold text-purple-800 uppercase tracking-widest mb-3 pb-1 border-b border-purple-100";

// ─── CustomDropdown ───────────────────────────────────────────────────────────

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
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-52 overflow-y-auto py-1">
          {options.map((opt) => (
            <li
              key={opt}
              className={
                "px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100 " +
                (value === opt
                  ? "bg-purple-100 text-purple-800 font-semibold"
                  : "text-gray-700 hover:bg-purple-50")
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

// ─── MembershipForm ───────────────────────────────────────────────────────────

const MembershipForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [highestCompletedStep, setHighestCompletedStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const [formData, setFormData] = useState({
    // Step 0 – Personal Information
    fullName: "",
    officialEmail: "",
    countryCode: "+91",
    mobileNumber: "",
    linkedIn: "",
    designation: "",
    organization: "",
    department: "",
    industry: "",
    city: "",
    state: "",
    officeTelephone: "",
    country: "",
    website: "",
    // Step 1 – Professional Profile
    leadershipRole: [],
    leadershipRoleOther: "",
    experience: [],
    expertise: [],
    expertiseOther: "",
    // Step 2 – Community Participation
    membershipCategory: [],
    contributeAs: [],
    // Step 3 – Areas of Interest
    areasOfInterest: [],
    // Step 4 – Membership Interest
    motivation: "",
    // Kept for data parity
    professionalBio: "",
    documents: [],
    applicantName: "",
    date: "",
    applicantSignature: "",
  });

  // Scroll to top whenever the step changes
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

    if (currentStep === 0) {
      if (!formData.industry || !formData.state) {
        alert("Please select your Industry and State from the dropdowns.");
        return;
      }
    }

    if (currentStep === 1) {
      if (
        formData.leadershipRole.length === 0 ||
        formData.experience.length === 0 ||
        formData.expertise.length === 0
      ) {
        alert(
          "Please select at least one option for each section (Leadership, Experience, Expertise).",
        );
        return;
      }
    }

    if (currentStep === 2) {
      if (
        formData.membershipCategory.length === 0 ||
        formData.contributeAs.length === 0
      ) {
        alert(
          "Please select at least one option for each section (Membership Category, Contribution).",
        );
        return;
      }
    }

    if (currentStep === 3) {
      if (formData.areasOfInterest.length === 0) {
        alert("Please select at least one area of interest.");
        return;
      }
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

    if (currentStep === 4) {
      if (!formData.motivation.trim()) {
        alert("Please elaborate on why you want to join.");
        setIsSubmitting(false);
        return;
      }
    }

    // ── EmailJS / API call goes here ──────────────────────────────────────
    // emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...formData }, PUBLIC_KEY)
    //   .then(() => setSubmitStatus('success'))
    //   .catch(() => setSubmitStatus('error'))
    //   .finally(() => setIsSubmitting(false));
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
    }, 1500);
  };

  // ── Step content renderer ────────────────────────────────────────────────

  const renderStep = () => {
    switch (currentStep) {
      // ── 0: Personal Information ──────────────────────────────────────────
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className={`${INPUT_CLS} w-20 shrink-0 pr-1`}
                >
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
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

      // ── 1: Professional Profile ──────────────────────────────────────────
      case 1:
        return (
          <div className="space-y-8">
            {/* Leadership Role */}
            <div>
              <h4 className={SECTION_TITLE_CLS}>Leadership Role</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
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
                <div className="col-span-2 md:col-span-3 flex items-center gap-3 mt-1.5">
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

            {/* Years of Experience */}
            <div>
              <h4 className={SECTION_TITLE_CLS}>
                Years of Leadership Experience
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
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

            {/* Primary Areas of Expertise */}
            <div>
              <h4 className={SECTION_TITLE_CLS}>Primary Areas of Expertise</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
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
                <div className="col-span-2 md:col-span-3 flex items-center gap-3 mt-1.5">
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

      // ── 2: Community Participation ───────────────────────────────────────
      case 2:
        return (
          <div className="space-y-8">
            {/* Membership Category */}
            <div>
              <h4 className={SECTION_TITLE_CLS}>Membership Category</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
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

            {/* Contribute As */}
            <div>
              <h4 className={SECTION_TITLE_CLS}>
                I Would Like to Contribute As:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
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

      // ── 3: Areas of Interest ─────────────────────────────────────────────
      case 3:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

      // ── 4: Membership Interest ───────────────────────────────────────────
      case 4:
        return (
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-3">
              Why do you want to join the CXO Sherpa Council?
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              className={`${INPUT_CLS} min-h-52 resize-y`}
              placeholder="Please elaborate..."
              required
            />
          </div>
        );

      default:
        return null;
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen bg-linear-to-br from-purple-50 via-white to-orange-50 overflow-hidden">
      {/* Background graphic */}
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none select-none z-0"
      />

      {/* ── Header ── */}
      <header className="relative z-10 text-center pt-10 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 inline-flex items-center justify-center flex-wrap gap-3">
          Join
          <img src={CxoImage} alt="CXO Sherpa" className="h-10 w-auto" />
          Sherpa Council
        </h1>
        <h2 className="text-xs md:text-sm font-semibold text-gray-500 tracking-[0.3em] uppercase mt-2">
          Membership Application Form
        </h2>
      </header>

      {/* ── Page layout ── */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-4 pb-14 items-start">
        {/* ── Sidebar Stepper ── */}
        <aside className="md:w-56 w-full shrink-0 md:sticky md:top-8">
          <nav
            aria-label="Form steps"
            className="flex md:flex-col flex-row flex-wrap gap-1"
          >
            {STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
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
                  onKeyDown={(e) => {
                    if (!isLocked && (e.key === "Enter" || e.key === " "))
                      setCurrentStep(index);
                  }}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 outline-none",
                    isLocked
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400",
                    isActive
                      ? "bg-purple-700 shadow-md shadow-purple-200"
                      : isCompleted
                        ? "hover:bg-purple-50"
                        : "hover:bg-gray-100",
                  ].join(" ")}
                >
                  {/* Step circle */}
                  <div
                    className={[
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all",
                      isActive ? "bg-white text-purple-700" : "",
                      isCompleted && !isActive
                        ? "bg-purple-700 text-white"
                        : "",
                      !isActive && !isCompleted
                        ? "bg-gray-200 text-gray-500"
                        : "",
                    ].join(" ")}
                  >
                    {isCompleted ? "✓" : String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Step label */}
                  <span
                    className={[
                      "text-xs font-medium leading-tight",
                      isActive ? "text-white" : "",
                      isCompleted && !isActive ? "text-purple-700" : "",
                      !isActive && !isCompleted ? "text-gray-500" : "",
                    ].join(" ")}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Form Panel ── */}
        <main className="flex-1 bg-white rounded-2xl shadow-xl shadow-purple-100/60 border border-purple-100 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Step content — key forces remount on step change */}
            <div key={currentStep} className="flex-1">
              <h2 className="text-2xl font-bold text-purple-900 mb-6 pb-4 border-b border-purple-100">
                {STEPS[currentStep]}
              </h2>

              {renderStep()}
            </div>

            {/* ── Navigation actions ── */}
            <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
                className="px-7 py-2.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 disabled:opacity-60"
              >
                ← Back
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-2.5 rounded-full text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-md shadow-orange-200"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 rounded-full text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-md shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </main>
      </div>

      {/* ── Success Popup ── */}
      {submitStatus === "success" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl">
            {/* Checkmark icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl font-bold text-green-600">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Application Submitted!
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Thank you for your interest in the CXO Sherpa Council. We
              appreciate your application and will be in touch soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipForm;
