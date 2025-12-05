const generateCurvePath = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // End position = top-right corner (slightly outside)
  const endX = vw * 1.1;
  const endY = -vh * 1.1;

  return `
    M 0 0
    C ${vw * 0.25} ${-vh * 0.10},
      ${vw * 0.55} ${-vh * 0.25},
      ${vw * 0.80} ${-vh * 0.45}
    S ${endX} ${endY}, ${endX} ${endY}
  `;
};

const planeCurvePath = `
  M 0 0
  C 120 -40, 320 -160, 700 -350
  S 1200 -700, 1600 -900
`;

import React, { useState, useRef, memo } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import PageTitle from "../components/PageTitle";
import PageTransition from "../components/PageTransition";

import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";

import emailjs from "@emailjs/browser";
import neonPlane from "../assets/neon-plane.svg"; // ensure this exists

const EMAILJS_SERVICE_ID = "service_2hbeidi";
const EMAILJS_TEMPLATE_ID = "template_olznacj";
const EMAILJS_PUBLIC_KEY = "N8UuYpR-uFvn4sA5Y";

function ContactComponent() {
  const [formState, setFormState] = useState({ status: "idle", message: "" });
  const [planeActive, setPlaneActive] = useState(false);
  const [planeStart, setPlaneStart] = useState({ left: 0, top: 0 });
  const [planeKey, setPlaneKey] = useState(0); // re-mount plane each run
  const formRef = useRef(null);
  const btnRef = useRef(null);

  const validate = (formEl) => {
    const name = formEl.querySelector("[name='from_name']")?.value?.trim();
    const email = formEl.querySelector("[name='from_email']")?.value?.trim();
    const message = formEl.querySelector("[name='message']")?.value?.trim();
    if (!name || !email || !message) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // compute path offsets relative to start: E path (dip then rise)
  const computeKeyframes = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return {
    x: [
      0,
      vw * 0.18,   // soft start right
      vw * 0.40,   // bigger arc begins
      vw * 0.68,   // middle curve
      vw * 0.95,   // near exit
      vw * 1.20,   // off screen
    ],
    y: [
      0,
      -vh * 0.05,   // tiny lift
      -vh * 0.18,   // rising
      -vh * 0.38,   // high arc
      -vh * 0.65,   // very high near exit
      -vh * 1.0,    // fully off screen
    ],
    rotate: [0, 8, 16, 24, 32, 40],
    opacity: [1, 1, 1, 0.85, 0.5, 0],
    scale: [1, 1.05, 1.03, 0.95, 0.8, 0.65],
    transition: {
      duration: 2.6,            // slower & smoother
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier smooth
    },
  };
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;
    if (!validate(formEl)) {
      setFormState({ status: "error", message: "Please fill name, valid email, and a message." });
      setTimeout(() => setFormState({ status: "idle", message: "" }), 3500);
      return;
    }

    setFormState({ status: "loading", message: "Sending, please wait..." });

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      const result = await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formEl);

      if (result.status === 200) {
        // compute button center as start
        const btn = btnRef.current;
        if (btn) {
          const rect = btn.getBoundingClientRect();
          const planeW = 28; // plane svg width in px
          const planeH = 28;
          // center coordinates, adjusted for scroll
          const startLeft = rect.left + rect.width / 2 - planeW / 2 + window.scrollX;
          const startTop = rect.top + rect.height / 2 - planeH / 2 + window.scrollY;
          setPlaneStart({ left: startLeft, top: startTop });
        } else {
          // fallback center-of-screen start
          setPlaneStart({ left: window.innerWidth / 2, top: window.innerHeight / 2 });
        }

        // re-mount plane for consistent animation, then trigger
        setPlaneKey((k) => k + 1);
        // slight delay so position is applied before animation
        requestAnimationFrame(() => {
          setPlaneActive(true);
        });
        // auto-hide after animation duration
        setTimeout(() => setPlaneActive(false), 1900);

        setFormState({ status: "success", message: "Your message was successfully sent!" });
        formEl.reset();
        setTimeout(() => setFormState({ status: "idle", message: "" }), 4000);
      } else {
        setFormState({ status: "error", message: "Failed to send. Please try again." });
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setFormState({ status: "error", message: "Something went wrong. Try again later." });
    }
  };

  const keyframes = computeKeyframes();

  return (
    <PageTransition>
      <PagePopup image={popupConfig.contact.image} text={popupConfig.contact.text} />

      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">

        {/* FLYING PLANE (absolute positioned using computed start) */}
        <AnimatePresence>
  {planeActive && (
    <motion.img
      key={`plane-${planeKey}`}
      src={neonPlane}
      alt="plane"
      style={{
        position: "absolute",
        left: planeStart.left,
        top: planeStart.top,
        zIndex: 99999,
        pointerEvents: "none",
        width: "32px",
        height: "32px",
      }}
      initial={{ offsetDistance: "0%" }}
      animate={{
        offsetDistance: "100%",
        opacity: [1, 1, 0.8, 0],
        rotate: [0, 10, 20, 35],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
      }}
      className="plane-path"
    />
  )}
</AnimatePresence>


        {/* CONTACT CONTENT */}
        <div className="flex flex-col items-center gap-8 w-full max-w-xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-3">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
              <PageTitle>Contact</PageTitle>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              Whether you want to discuss a project or just say hello, I’d love to hear from you.
            </p>
          </div>

          <a
            href="mailto:bevicky750@gmail.com"
            className="flex justify-center items-center gap-2 text-primary text-lg font-medium hover:underline"
          >
            <Mail className="w-5 h-5" />
            bevicky750@gmail.com
          </a>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full p-6 sm:p-8 bg-white/90 dark:bg-neutral-900/80 border border-border/40 dark:border-border/60 rounded-2xl shadow space-y-4"
          >
            {/* STATUS */}
           <AnimatePresence>
  {planeActive && (
    <motion.img
      key={`plane-${planeKey}`}
      src={neonPlane}
      alt="plane"
      style={{
        position: "absolute",
        left: planeStart.left,
        top: planeStart.top,
        zIndex: 99999,
        pointerEvents: "none",
        width: "34px",
        height: "34px",
      }}
      initial={{ offsetDistance: "0%" }}
      animate={{
        offsetDistance: "100%",
        opacity: [1, 1, 0.9, 0],
        rotate: [0, 10, 18, 30],
      }}
      transition={{
        duration: 3,        // ★ 3 seconds (as you wanted)
        ease: "easeInOut",
      }}
      className="plane-path"
      
    />
  )}
</AnimatePresence>


            {/* FIELDS */}
            <Input name="from_name" type="text" placeholder="Your Name" required />
            <Input name="from_email" type="email" placeholder="Your Email" required />
            <Textarea name="message" rows={4} placeholder="Your Message" required />

            {/* SUBMIT BUTTON - attach ref here so we can compute start position */}
            <div>
              <Button
                ref={btnRef}
                type="submit"
                disabled={formState.status === "loading"}
                className="w-full text-lg font-semibold py-3 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {formState.status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default memo(ContactComponent);
