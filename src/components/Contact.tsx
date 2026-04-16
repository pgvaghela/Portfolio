"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionLabel } from "@/components/About";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "pgvaghela20@gmail.com",
    href: "mailto:pgvaghela20@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "United States of America",
    href: null,
  },
];

const socials = [
  { icon: GitHubIcon, label: "GitHub", href: "https://github.com/pgvaghela" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/in/priyanshvaghela" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with your preferred form backend (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="04. Contact" inView={inView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-[15px] max-w-md">
            Open to full-time opportunities, internships, and interesting collaborations.
            My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-3 font-mono tracking-widest uppercase">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-3"
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12 bg-card border border-primary/20 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <Send size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-xl mb-2">
                  Message sent!
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Name
                    </label>
                    <Input id="name" name="name" placeholder="Alex Johnson" required className="bg-background" />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="alex@example.com" required className="bg-background" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Subject
                  </label>
                  <Input id="subject" name="subject" placeholder="Internship, collaboration, just saying hi..." required className="bg-background" />
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me what you have in mind..."
                    rows={5}
                    required
                    className="bg-background resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  whileHover={status === "idle" ? { scale: 1.01 } : {}}
                  whileTap={status === "idle" ? { scale: 0.98 } : {}}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
