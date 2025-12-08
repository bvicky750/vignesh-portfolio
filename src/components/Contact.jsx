import React, { useState, useRef, memo } from "react";
import { Mail, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import PageTitle from "../components/PageTitle";
import PageTransition from "../components/PageTransition";
import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";

import emailjs from "@emailjs/browser";
import neonPlane from "../assets/neon-plane.svg";

// 🔊 preload sounds (no delay)
const successSound = new Audio("/sounds/success.mp3");
const errorSound = new Audio("/sounds/error.mp3");
successSound.preload = "auto";
errorSound.preload = "auto";

const EMAILJS_SERVICE_ID = "service_2hbeidi";
const EMAILJS_TEMPLATE_ID = "template_olznacj";
const EMAILJS_PUBLIC_KEY = "N8UuYpR-uFvn4sA5Y";

function ContactComponent() {
  const [formState, setFormState] = useState({ status: "idle", message: "" });
  const [planeActive, setPlaneActive] = useState(false);
  const [planeStart, setPlaneStart] = useState({ left: 0, top: 0 });
  const [planeKey, setPlaneKey] = useState(0);

  const formRef = useRef(null);
  const btnRef = useRef(null);

  // Validation
  const validate = (formEl) => {
    const name = formEl.from_name.value.trim();
    const email = formEl.from_email.value.trim();
    const message = formEl.message.value.trim();
    if (!name || !email || !message) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Plane keyframes
  const computeKeyframes = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    return {
      x: [0, vw * 0.2, vw * 0.45, vw * 0.75, vw * 1.1],
      y: [0, -vh * 0.05, -vh * 0.25, -vh * 0.50, -vh * 0.9],
      rotate: [0, 12, 20, 30, 40],
      opacity: [1, 1, 0.9, 0.5, 0],
      scale: [1, 1.05, 1, 0.9, 0.7],
      transition: { duration: 2.8, ease: "easeInOut" }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;

    if (!validate(formEl)) {
      errorSound.currentTime = 0;
      errorSound.play();

      setFormState({ status: "error", message: "Fill all fields correctly." });
      setTimeout(() => setFormState({ status: "idle", message: "" }), 2500);
      return;
    }

    setFormState({ status: "loading", message: "" });

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formEl
      );

      if (result.status === 200) {
        // success sound
        successSound.currentTime = 0;
        successSound.play();

        // plane start position = button center
        const btn = btnRef.current;
        const rect = btn.getBoundingClientRect();
        setPlaneStart({
          left: rect.left + rect.width / 2 - 12,
          top: rect.top + rect.height / 2 - 12 + window.scrollY
        });

        setPlaneKey((k) => k + 1);
        requestAnimationFrame(() => setPlaneActive(true));
        setTimeout(() => setPlaneActive(false), 2500);

        setFormState({ status: "success", message: "Message sent!" });
        formEl.reset();
        setTimeout(() => setFormState({ status: "idle", message: "" }), 2500);

      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      errorSound.currentTime = 0;
      errorSound.play();
      setFormState({ status: "error", message: "Failed to send email." });
    }
  };

  const keyframes = computeKeyframes();

  return (
    <PageTransition>
      <PagePopup image={popupConfig.contact.image} text={popupConfig.contact.text} />

      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">

        {/* ✈ Plane Animation */}
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
                width: "32px"
              }}
              animate={keyframes}
              transition={keyframes.transition}
            />
          )}
        </AnimatePresence>

        {/* Contact Box */}
        <div className="flex flex-col items-center gap-8 w-full max-w-xl">
          <div className="text-center">
            <div className="flex items-center gap-3 justify-center mb-3">
              <Mail className="w-12 h-12 text-primary drop-shadow-lg" />
              <PageTitle>Contact</PageTitle>
            </div>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Feel free to reach out anytime!
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="
              w-full p-8 rounded-2xl shadow-xl
              bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#000]
              border-2 border-cyan-400/60
              shadow-[0px_0px_20px_rgba(0,255,255,0.5)]
              space-y-4
            "
          >
            <Input name="from_name" placeholder="Your Name" required />
            <Input name="from_email" placeholder="Your Email" required />
            <Textarea name="message" placeholder="Your Message" rows={4} required />

            <motion.div
              animate={
                formState.status === "error"
                  ? { x: [-8, 8, -8, 8, 0] } // shake effect
                  : {}
              }
              transition={{ duration: 0.35 }}
            >
              <Button
                ref={btnRef}
                type="submit"
                className={`w-full py-3 text-lg font-semibold flex items-center justify-center gap-2 ${
                  formState.status === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-primary hover:bg-primary/80"
                }`}
              >
                {formState.status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default memo(ContactComponent);
