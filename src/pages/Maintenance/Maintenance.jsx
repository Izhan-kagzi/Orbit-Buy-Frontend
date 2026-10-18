import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Maintenance({ message, endTime }) {
  // The countdown only renders once an admin has actually set an end time
  // for the maintenance window — without one we just show the message.
  const targetDate = endTime ? new Date(endTime).getTime() : null;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!targetDate) return undefined;

    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // The parent hook will re-check maintenance status at the exact
        // end boundary and restore the storefront automatically.
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    tick();
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f7faff] text-[#0b1f3a]">
      {/* Soft blue premium background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#1d72d8]/10 blur-[100px]" />
        <div className="absolute -right-28 top-1/3 h-[480px] w-[480px] rounded-full bg-[#5aa7ff]/15 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.32] [background-image:radial-gradient(#b7cce5_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12"
      >
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b2e59] text-white shadow-lg shadow-blue-950/15 transition-transform duration-300 group-hover:-rotate-6">
            <span className="text-lg font-semibold">O</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-[0.16em] text-[#0b2e59] sm:text-xl">ORBIT BUY</span>
            <span className="mt-1.5 text-[9px] font-semibold tracking-[0.28em] text-[#3979bd]">PREMIUM FASHION</span>
          </span>
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#315779] shadow-sm backdrop-blur sm:px-4 sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-40" />
            <span className="relative h-2 w-2 rounded-full bg-blue-600" />
          </span>
          Maintenance in progress
        </div>
      </motion.header>

      {/* Main content */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-150px)] w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-3 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 mx-auto w-full max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3979bd] shadow-sm sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            A little patience, a better experience
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#0b1f3a] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Under
            <span className="mt-1 block bg-gradient-to-r from-[#1557a6] via-[#287fdb] to-[#62a9ff] bg-clip-text pb-2 uppercase text-transparent">
              maintenance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#3979bd] sm:text-sm sm:tracking-[0.3em]"
          >
            Elevating the Orbit Buy experience
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0"
          >
            {message || "We’re polishing things behind the scenes to bring you a smoother, more refined shopping experience. Thanks for bearing with us."}
          </motion.p>

          {/* Show the countdown only when the admin/manager configured an end time. */}
          {targetDate && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.65 }}
              className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3 lg:max-w-[620px]"
            >
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="overflow-hidden rounded-2xl border border-blue-100/90 bg-white/85 shadow-[0_8px_30px_rgba(28,86,145,0.07)] backdrop-blur"
                >
                  <div className="flex min-h-[76px] items-center justify-center px-3 py-4 sm:min-h-[88px] sm:py-5">
                    <span className="text-3xl font-semibold tracking-tight text-[#123b68] sm:text-4xl">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="border-t border-blue-100 bg-blue-50/70 py-2.5 text-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Notify form — existing submit behavior retained */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.65 }}
            className="mx-auto mt-9 w-full max-w-[480px] lg:mx-0"
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[11px]">
              Get notified when we return
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handle subscribe logic
              }}
              className="flex overflow-hidden rounded-2xl border border-blue-100 bg-white/90 shadow-[0_12px_36px_rgba(28,86,145,0.08)] focus-within:border-blue-300"
            >
              <div className="relative flex min-w-0 flex-1 items-center">
                <FiMail size={16} className="absolute left-4 text-[#3979bd]" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="h-12 w-full min-w-0 bg-transparent py-3 pl-11 pr-3 text-sm text-[#0b1f3a] placeholder:text-slate-400 focus:outline-none sm:h-14"
                />
              </div>
              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 bg-[#0b2e59] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#12457e] sm:px-5 sm:text-[11px]"
              >
                Notify me
                <FiArrowRight size={14} />
              </button>
            </form>
          </motion.div>

          <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
            <div className="h-px w-8 bg-blue-200" />
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-slate-400 sm:text-[10px]">
              Orbit Buy · Premium Fashion
            </span>
            <div className="h-px w-8 bg-blue-200" />
          </div>
        </motion.div>

        {/* Blue maintenance illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:order-2 lg:max-w-none"
        >
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-blue-300/25 blur-3xl" />
          <div className="relative w-full rounded-[2rem] border border-white/90 bg-white/70 p-3 shadow-[0_24px_80px_rgba(23,72,125,0.11)] backdrop-blur-sm sm:p-5">
            <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-blue-100 bg-white/95 px-3 py-2 shadow-sm sm:left-8 sm:top-8">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#315779]">Making improvements</span>
            </div>
            <img
              src="/maintenance-illustration-blue.png"
              alt="Illustration of a person improving a website"
              className="relative z-0 mx-auto h-auto w-full max-w-[520px] object-contain"
            />
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 px-5 pb-6 text-center sm:px-8">
        <p className="text-[9px] font-medium tracking-[0.12em] text-slate-400 sm:text-[10px]">
          © {new Date().getFullYear()} Orbit Buy <span className="mx-2 text-blue-300">·</span> All rights reserved
        </p>
      </footer>
    </main>
  );
  }