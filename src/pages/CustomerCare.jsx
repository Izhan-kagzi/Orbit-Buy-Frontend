import { useState } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiFileText,
  FiHelpCircle,
  FiImage,
  FiMail,
  FiMessageCircle,
  FiPackage,
  FiCreditCard,
  FiShoppingBag,
  FiTruck,
  FiUploadCloud,
  FiUser,
  FiShield,
  FiX,
} from "react-icons/fi";

const categories = [
  {
    id: "order",
    label: "Order Issue",
    description: "Order status, cancellation or tracking",
    icon: FiPackage,
  },
  {
    id: "product",
    label: "Product Issue",
    description: "Damaged, missing or incorrect items",
    icon: FiShoppingBag,
  },
  {
    id: "payment",
    label: "Payment Issue",
    description: "Payments, refunds or billing",
    icon: FiCreditCard,
  },
  {
    id: "delivery",
    label: "Delivery Issue",
    description: "Delayed or unsuccessful delivery",
    icon: FiTruck,
  },
  {
    id: "account",
    label: "Account Issue",
    description: "Login or account-related problems",
    icon: FiUser,
  },
  {
    id: "other",
    label: "Other",
    description: "Something else? Tell us about it",
    icon: FiMessageCircle,
  },
];

const faqs = [
  {
    question: "How long does it take to resolve a complaint?",
    answer:
      "Our support team aims to review complaints as soon as possible. Resolution time depends on the nature of the issue. We may contact you if additional information is needed.",
  },
  {
    question: "How can I check my complaint status?",
    answer:
      "Keep your complaint reference number after submission. If your website has a complaint tracking feature, you can use that number to check your status. Otherwise, contact our support team for an update.",
  },
  {
    question: "What should I include in my complaint?",
    answer:
      "Describe the issue clearly and include your order ID when relevant. You can also attach supporting images or documents to help our team understand the problem.",
  },
  {
    question: "Can I report a damaged or incorrect product?",
    answer:
      "Yes. Choose Product Issue and explain what happened. Include your order details and attach clear photos of the item if available.",
  },
];

const inputClasses =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-[#031e3d] outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#09335a] focus:ring-4 focus:ring-[#09335a]/5";

const CustomerCare = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderId: "",
    category: "",
    subject: "",
    message: "",
  });

  const [files, setFiles] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    const validFiles = selectedFiles.filter(
      (file) => allowedTypes.includes(file.type) && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      setError(
        "Only JPG, PNG, WEBP and PDF files up to 5 MB each are allowed."
      );
    } else {
      setError("");
    }

    setFiles((previous) => {
      const combined = [...previous, ...validFiles];

      return combined
        .filter(
          (file, index, array) =>
            array.findIndex(
              (item) =>
                item.name === file.name &&
                item.size === file.size &&
                item.lastModified === file.lastModified
            ) === index
        )
        .slice(0, 5);
    });

    event.target.value = "";
  };

  const removeFile = (indexToRemove) => {
    setFiles((previous) =>
      previous.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.category) {
      setError("Please select a complaint category.");
      return;
    }

    if (form.message.trim().length < 15) {
      setError("Please describe your issue in at least 15 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * BACKEND INTEGRATION
       *
       * Connect this form to your complaint API here.
       *
       * Example:
       *
       * const formData = new FormData();
       *
       * Object.entries(form).forEach(([key, value]) => {
       *   formData.append(key, value);
       * });
       *
       * files.forEach((file) => {
       *   formData.append("attachments", file);
       * });
       *
       * const response = await fetch("/api/complaints", {
       *   method: "POST",
       *   body: formData,
       * });
       *
       * if (!response.ok) {
       *   throw new Error("Unable to submit your complaint.");
       * }
       */

      // Remove this demo success behavior when connecting your backend.
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      orderId: "",
      category: "",
      subject: "",
      message: "",
    });

    setFiles([]);
    setError("");
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fafafa] text-[#031e3d]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#031e3d]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#09335a]/80 blur-[110px]" />

          <div className="absolute -bottom-48 right-0 h-[450px] w-[450px] rounded-full bg-[#d9c3a3]/15 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "65px 65px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#d9c3a3]/60 sm:w-12" />

              <span className="text-[10px] font-semibold uppercase tracking-[5px] text-[#d9c3a3] sm:text-xs">
                Orbit Buy Care
              </span>

              <span className="h-px w-8 bg-[#d9c3a3]/60 sm:w-12" />
            </div>

            <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              We're here to
              <span className="ml-2 italic text-[#d9c3a3]">
                help you.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
              Your experience matters to us. Tell us what's wrong, and let our
              support team help make things right.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#submit-complaint"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d9c3a3] px-6 py-3.5 text-sm font-semibold text-[#031e3d] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                Submit a Complaint
                <FiArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#help-faq"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#d9c3a3]/60 hover:bg-white/5"
              >
                <FiHelpCircle size={17} />
                Explore FAQs
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-xs text-gray-300 sm:gap-x-10">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-[#d9c3a3]" />
                Dedicated Support
              </span>

              <span className="flex items-center gap-2">
                <FiShield className="text-[#d9c3a3]" />
                Your Privacy Matters
              </span>

              <span className="flex items-center gap-2">
                <FiClock className="text-[#d9c3a3]" />
                Timely Assistance
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-[50%] bg-[#fafafa]" />
      </section>

      {/* MAIN CONTENT */}
      <section className="relative py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
            {/* COMPLAINT FORM */}
            <section
              id="submit-complaint"
              className="scroll-mt-24 overflow-hidden rounded-[28px] border border-gray-200/80 bg-white shadow-[0_20px_70px_rgba(3,30,61,0.055)] sm:rounded-[32px]"
            >
              <div className="border-b border-gray-100 px-5 py-7 sm:px-8 sm:py-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#031e3d] text-[#d9c3a3] shadow-lg shadow-[#031e3d]/10">
                    <FiFileText size={21} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#09335a]">
                      Customer Support
                    </p>

                    <h2 className="mt-2 font-serif text-2xl text-[#031e3d] sm:text-3xl">
                      Submit a complaint
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Share the details below so we can better understand
                      your concern.
                    </p>
                  </div>
                </div>
              </div>

              {isSubmitted ? (
                <div className="px-6 py-16 text-center sm:px-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
                    <FiCheckCircle size={32} />
                  </div>

                  <h3 className="mt-6 font-serif text-3xl text-[#031e3d]">
                    Thank you for reaching out.
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
                    Your complaint form has been completed. Connect this
                    page to your backend to save the complaint and generate
                    a real reference number.
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#031e3d] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#09335a]"
                  >
                    Submit Another Complaint
                    <FiArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                  {/* PERSONAL INFORMATION */}
                  <div className="mb-8">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#031e3d] text-[10px] font-bold text-[#d9c3a3]">
                        01
                      </span>

                      <h3 className="text-sm font-semibold text-[#031e3d]">
                        Your information
                      </h3>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="customer-name"
                          className="mb-2 block text-xs font-semibold text-gray-700"
                        >
                          Full name <span className="text-red-500">*</span>
                        </label>

                        <input
                          id="customer-name"
                          type="text"
                          autoComplete="name"
                          required
                          maxLength={100}
                          value={form.name}
                          onChange={(e) =>
                            updateField("name", e.target.value)
                          }
                          placeholder="Enter your full name"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="customer-email"
                          className="mb-2 block text-xs font-semibold text-gray-700"
                        >
                          Email address{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <input
                          id="customer-email"
                          type="email"
                          autoComplete="email"
                          required
                          maxLength={254}
                          value={form.email}
                          onChange={(e) =>
                            updateField("email", e.target.value)
                          }
                          placeholder="you@example.com"
                          className={inputClasses}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="order-id"
                          className="mb-2 block text-xs font-semibold text-gray-700"
                        >
                          Order ID{" "}
                          <span className="font-normal text-gray-400">
                            (Optional)
                          </span>
                        </label>

                        <input
                          id="order-id"
                          type="text"
                          maxLength={100}
                          value={form.orderId}
                          onChange={(e) =>
                            updateField("orderId", e.target.value)
                          }
                          placeholder="e.g. OB-123456"
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 h-px bg-gray-100" />

                  {/* COMPLAINT CATEGORY */}
                  <div className="mb-8">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#031e3d] text-[10px] font-bold text-[#d9c3a3]">
                        02
                      </span>

                      <div>
                        <h3 className="text-sm font-semibold text-[#031e3d]">
                          What can we help with?
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          Select the category that best matches your issue.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        const selected = form.category === category.id;

                        return (
                          <button
                            key={category.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() =>
                              updateField("category", category.id)
                            }
                            className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                              selected
                                ? "border-[#031e3d] bg-[#031e3d] shadow-lg shadow-[#031e3d]/10"
                                : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#09335a]/40 hover:bg-gray-50"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                selected
                                  ? "bg-white/10 text-[#d9c3a3]"
                                  : "bg-gray-50 text-[#09335a] group-hover:bg-[#031e3d] group-hover:text-[#d9c3a3]"
                              }`}
                            >
                              <Icon size={19} />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span
                                className={`block text-sm font-semibold ${
                                  selected ? "text-white" : "text-[#031e3d]"
                                }`}
                              >
                                {category.label}
                              </span>

                              <span
                                className={`mt-1 block text-xs leading-5 ${
                                  selected ? "text-gray-300" : "text-gray-400"
                                }`}
                              >
                                {category.description}
                              </span>
                            </span>

                            <span
                              className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                selected
                                  ? "border-[#d9c3a3] bg-[#d9c3a3]"
                                  : "border-gray-300"
                              }`}
                            >
                              {selected && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#031e3d]" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-8 h-px bg-gray-100" />

                  {/* ISSUE DETAILS */}
                  <div className="mb-8">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#031e3d] text-[10px] font-bold text-[#d9c3a3]">
                        03
                      </span>

                      <h3 className="text-sm font-semibold text-[#031e3d]">
                        Tell us about the issue
                      </h3>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="complaint-subject"
                          className="mb-2 block text-xs font-semibold text-gray-700"
                        >
                          Subject <span className="text-red-500">*</span>
                        </label>

                        <input
                          id="complaint-subject"
                          type="text"
                          required
                          minLength={4}
                          maxLength={150}
                          value={form.subject}
                          onChange={(e) =>
                            updateField("subject", e.target.value)
                          }
                          placeholder="Briefly describe your concern"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <label
                            htmlFor="complaint-message"
                            className="text-xs font-semibold text-gray-700"
                          >
                            Complaint details{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <span className="text-[10px] text-gray-400">
                            {form.message.length}/2000
                          </span>
                        </div>

                        <textarea
                          id="complaint-message"
                          required
                          minLength={15}
                          maxLength={2000}
                          rows={6}
                          value={form.message}
                          onChange={(e) =>
                            updateField("message", e.target.value)
                          }
                          placeholder="Please explain what happened and how we can help..."
                          className={`${inputClasses} min-h-[150px] resize-y leading-7`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 h-px bg-gray-100" />

                  {/* ATTACHMENTS */}
                  <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#031e3d] text-[10px] font-bold text-[#d9c3a3]">
                        04
                      </span>

                      <div>
                        <h3 className="text-sm font-semibold text-[#031e3d]">
                          Supporting documents
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          Optional · Maximum 5 files · 5 MB per file
                        </p>
                      </div>
                    </div>

                    <label
                      htmlFor="complaint-files"
                      className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 px-5 py-8 text-center transition-all duration-300 hover:border-[#09335a]/50 hover:bg-[#09335a]/[0.03]"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#09335a] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                        <FiUploadCloud size={23} />
                      </span>

                      <span className="mt-4 text-sm font-semibold text-[#031e3d]">
                        Click to upload or choose files
                      </span>

                      <span className="mt-2 text-xs leading-5 text-gray-400">
                        JPG, PNG, WEBP or PDF
                      </span>

                      <input
                        id="complaint-files"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>

                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={`${file.name}-${file.lastModified}`}
                            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#09335a]/5 text-[#09335a]">
                              <FiImage size={17} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-semibold text-[#031e3d]">
                                {file.name}
                              </p>

                              <p className="mt-1 text-[10px] text-gray-400">
                                {(file.size / 1024).toFixed(0)} KB
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              aria-label={`Remove ${file.name}`}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ERROR */}
                  {error && (
                    <div
                      role="alert"
                      className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      {error}
                    </div>
                  )}

                  {/* SUBMIT */}
                  <div className="rounded-2xl bg-gray-50 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <FiShield
                        size={18}
                        className="mt-0.5 shrink-0 text-[#09335a]"
                      />

                      <p className="text-xs leading-6 text-gray-500">
                        Please provide accurate information so our team can
                        assist you effectively. Your contact details will be
                        used to respond to your complaint.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#031e3d] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#031e3d]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#09335a] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Complaint
                          <FiArrowUpRight
                            size={18}
                            className="text-[#d9c3a3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* SUPPORT CARD */}
              <div className="relative overflow-hidden rounded-[28px] bg-[#031e3d] p-6 text-white shadow-[0_20px_60px_rgba(3,30,61,0.12)] sm:p-7">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />

                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#d9c3a3]">
                    <FiMessageCircle size={22} />
                  </div>

                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-[3px] text-[#d9c3a3]">
                    We're listening
                  </p>

                  <h2 className="mt-3 font-serif text-3xl leading-tight">
                    Every concern
                    <br />
                    deserves attention.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-gray-300">
                    We're committed to making your shopping experience better.
                    Share your concern and let us work toward a solution.
                  </p>

                  <a
                    href="mailto:support@orbitbuy.com"
                    className="group mt-6 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4 transition-all duration-300 hover:bg-white/15"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <FiMail
                        size={19}
                        className="shrink-0 text-[#d9c3a3]"
                      />

                      <span className="min-w-0">
                        <span className="block text-xs text-gray-300">
                          Email our team
                        </span>

                        <span className="mt-1 block break-all text-sm font-medium text-white">
                          support@orbitbuy.com
                        </span>
                      </span>
                    </span>

                    <FiArrowUpRight
                      size={18}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>

              {/* QUICK INFORMATION */}
              <div className="rounded-[28px] border border-gray-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.025)] sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#09335a]">
                  What happens next?
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#031e3d]">
                  A simple process.
                </h3>

                <div className="mt-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#031e3d] text-sm font-semibold text-[#d9c3a3]">
                      01
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#031e3d]">
                        Tell us your concern
                      </h4>

                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        Complete the form with your issue and relevant details.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#09335a]/10 text-sm font-semibold text-[#09335a]">
                      02
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#031e3d]">
                        Our team reviews it
                      </h4>

                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        Your complaint can be reviewed once it reaches our
                        support system.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d9c3a3]/30 text-sm font-semibold text-[#031e3d]">
                      03
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#031e3d]">
                        Get assistance
                      </h4>

                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        Our team can contact you with updates and next steps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTACT NOTE */}
              <div className="flex items-start gap-4 rounded-[24px] border border-[#d9c3a3]/40 bg-[#d9c3a3]/10 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#09335a] shadow-sm">
                  <FiHelpCircle size={19} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#031e3d]">
                    Need a quick answer?
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-gray-600">
                    Check the frequently asked questions below for helpful
                    information about orders, payments and returns.
                  </p>

                  <a
                    href="#help-faq"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#09335a] transition-colors hover:text-[#031e3d]"
                  >
                    Explore FAQs
                    <FiArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* FAQ SECTION */}
          <section
            id="help-faq"
            className="scroll-mt-24 mx-auto mt-20 max-w-4xl sm:mt-28"
          >
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-[#d9c3a3]" />

                <span className="text-[10px] font-semibold uppercase tracking-[4px] text-[#09335a]">
                  Help Center
                </span>

                <span className="h-px w-8 bg-[#d9c3a3]" />
              </div>

              <h2 className="font-serif text-3xl text-[#031e3d] sm:text-4xl md:text-5xl">
                Frequently asked
                <span className="ml-2 italic text-[#09335a]">questions.</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
                Find quick answers to common questions before submitting
                your complaint.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <article
                    key={faq.question}
                    className={`group relative overflow-hidden rounded-[22px] border transition-all duration-300 ${
                      isOpen
                        ? "border-gray-300 bg-white shadow-[0_15px_45px_rgba(3,30,61,0.06)]"
                        : "border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 h-full w-1 origin-top bg-gradient-to-b from-[#09335a] to-[#d9c3a3] transition-transform duration-300 ${
                        isOpen ? "scale-y-100" : "scale-y-0"
                      }`}
                    />

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenFaq(isOpen ? -1 : index)
                      }
                      className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          isOpen
                            ? "bg-[#031e3d] text-[#d9c3a3]"
                            : "bg-gray-50 text-[#09335a] group-hover:bg-[#031e3d] group-hover:text-[#d9c3a3]"
                        }`}
                      >
                        <FiHelpCircle size={18} />
                      </span>

                      <span className="flex-1 text-sm font-semibold leading-6 text-[#031e3d] sm:text-base">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 border-[#031e3d] bg-[#031e3d] text-white"
                            : "border-gray-200 text-gray-400 group-hover:border-gray-300"
                        }`}
                      >
                        <FiChevronDown size={17} />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-6 sm:px-6 sm:pl-[76px]">
                          <p className="border-l border-gray-200 pl-5 text-sm leading-7 text-gray-500">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* BOTTOM CTA */}
          <section className="relative mt-20 overflow-hidden rounded-[30px] bg-[#031e3d] p-7 text-white sm:mt-24 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#d9c3a3]">
                  We're just an email away
                </p>

                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Still need a hand?
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-300">
                  If you couldn't find the answer you need, reach out to our
                  support team. We're happy to help.
                </p>
              </div>

              <a
                href="mailto:support@orbitbuy.com"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#031e3d] transition-all duration-300 hover:-translate-y-1 hover:bg-[#d9c3a3] hover:shadow-xl"
              >
                Contact Support
                <FiArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-gray-400">
            <FiShield size={15} className="text-[#09335a]" />
            <span>
              Orbit Buy Customer Care · We're committed to a better shopping
              experience.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerCare;