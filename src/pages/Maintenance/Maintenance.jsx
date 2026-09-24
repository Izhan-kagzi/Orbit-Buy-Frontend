import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Maintenance() {
  // Set your target reopen date here
  const targetDate = new Date("2026-10-01T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060e18] text-white">
      {/* =====================================================
          DRAMATIC BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#07101c] to-[#040a12]" />

        {/* Soft navy + gold ambient light */}
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#09335A]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C9A227]/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#09335A]/20 blur-[100px]" />

        {/* Subtle grid / industrial lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#040a12_100%)]" />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 py-8 sm:px-10"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-display text-[24px] tracking-[0.2em] text-white transition-transform duration-500 group-hover:scale-[1.02] sm:text-[26px]">
              ORBIT BUY
            </span>
            <span className="mt-1.5 text-[8px] font-medium tracking-[0.4em] text-[#C9A227]">
              PREMIUM FASHION
            </span>
          </Link>

          <div className="hidden items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A227] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
            </span>
            Maintenance Mode
          </div>
        </div>
      </motion.header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="relative z-10 flex min-h-[calc(100vh-140px)] flex-col items-center justify-center px-5 pb-20 pt-6 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[48px] font-medium tracking-[0.08em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] sm:text-[64px] md:text-[80px] lg:text-[92px]"
        >
          UNDER
          <br className="sm:hidden" />
          <span className="text-white"> MAINTENANCE</span>
        </motion.h1>

        {/* Gold subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-[13px] font-medium uppercase tracking-[0.35em] text-[#C9A227] sm:text-[14px]"
        >
          Elevating the Orbit Buy Experience
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mx-auto mt-6 max-w-[520px] text-[14px] leading-7 text-white/55 sm:text-[15px]"
        >
          We’re making refined improvements behind the scenes.
          Orbit Buy will return shortly with a smoother,
          more premium shopping experience.
        </motion.p>

        {/* =================================================
            COUNTDOWN
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-14 grid w-full max-w-[720px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-md"
            >
              <div className="flex flex-1 items-center justify-center px-4 py-7 sm:py-9">
                <span className="font-display text-[36px] font-medium tracking-tight text-white sm:text-[44px] md:text-[52px]">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <div className="border-t border-white/10 bg-white/[0.04] py-2.5 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* =================================================
            NEWSLETTER / NOTIFY
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-16 w-full max-w-[480px]"
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/50">
            Get notified when we return
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handle subscribe logic
            }}
            className="flex overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md"
          >
            <div className="relative flex flex-1 items-center">
              <FiMail
                size={16}
                className="absolute left-4 text-white/40"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="h-13 w-full bg-transparent py-3.5 pl-11 pr-4 text-[13px] text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex h-13 items-center gap-2 bg-[#C9A227] px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#09335A] transition-all duration-300 hover:bg-[#d4b03a]"
            >
              Notify Me
              <FiArrowRight size={14} />
            </button>
          </form>
        </motion.div>

        {/* Subtle brand line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 flex items-center gap-3"
        >
          <div className="h-px w-10 bg-white/15" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Orbit Buy · Premium Fashion
          </span>
          <div className="h-px w-10 bg-white/15" />
        </motion.div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <div className="relative z-10 pb-8 text-center">
        <p className="text-[9px] uppercase tracking-[0.32em] text-white/25">
          © {new Date().getFullYear()} Orbit Buy · All Rights Reserved
        </p>
      </div>
    </main>
  );
}