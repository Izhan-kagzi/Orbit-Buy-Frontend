import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiInstagram,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message");
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success("Thanks — your message has been sent. We'll reply soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 700);
  };

  return (
    <div className="bg-white">

      {/* ================= Intro ================= */}
      <section className="relative bg-brand-dark overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="uppercase tracking-[6px] text-brand-tan text-sm font-semibold"
          >
            Get In Touch
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-5xl md:text-7xl font-serif text-white mt-6"
          >
            Let's Start a<br className="hidden sm:block" /> Conversation
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="mt-8 text-gray-300 max-w-xl mx-auto leading-relaxed"
          >
            Whether it's a question about an order, a styling suggestion, or
            simply hello — our team reads every message personally.
          </motion.p>
        </div>
      </section>

      {/* ================= Content ================= */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 pb-28 relative">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-brand-primary text-white rounded-3xl p-10 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl font-serif mb-10">Contact Details</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <FiMapPin className="text-brand-tan mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Studio</p>
                    <p className="text-gray-200 mt-1">Surat, Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiPhone className="text-brand-tan mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-200 mt-1">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiMail className="text-brand-tan mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-200 mt-1">support@orbitbuy.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiClock className="text-brand-tan mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-200 mt-1">Mon – Sat, 10am – 8pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-12 pt-8 border-t border-white/15">
              <a href="#" aria-label="Instagram" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-brand-primary flex items-center justify-center transition">
                <FiInstagram size={17} />
              </a>
              <a href="#" aria-label="Facebook" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-brand-primary flex items-center justify-center transition">
                <FiFacebook size={17} />
              </a>
              <a href="#" aria-label="Twitter" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-brand-primary flex items-center justify-center transition">
                <FiTwitter size={17} />
              </a>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl shadow-xl p-8 sm:p-12"
          >
            <h2 className="text-3xl font-serif text-brand-dark mb-2">
              Send a Message
            </h2>
            <p className="text-gray-500 mb-10">
              We typically reply within one business day.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=" "
                    id="contact-name"
                    className="peer w-full border-0 border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 bg-transparent transition"
                  />
                  <label
                    htmlFor="contact-name"
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-primary transition-all"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder=" "
                    id="contact-email"
                    className="peer w-full border-0 border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 bg-transparent transition"
                  />
                  <label
                    htmlFor="contact-email"
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-primary transition-all"
                  >
                    Your Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder=" "
                  id="contact-subject"
                  className="peer w-full border-0 border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 bg-transparent transition"
                />
                <label
                  htmlFor="contact-subject"
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-primary transition-all"
                >
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder=" "
                  id="contact-message"
                  className="peer w-full border-0 border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 bg-transparent resize-none transition"
                ></textarea>
                <label
                  htmlFor="contact-message"
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-primary transition-all"
                >
                  Message
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto bg-brand-dark hover:bg-brand-primary transition-all duration-300 text-white px-10 py-4 rounded-full flex items-center justify-center gap-3 font-semibold disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
                <FiSend />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
