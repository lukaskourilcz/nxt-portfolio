"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  const contactItems = [
    {
      href: "mailto:kouril.lukas@gmail.com",
      icon: <Mail className="w-5 h-5 text-gray-700" />,
      text: "kouril.lukas@gmail.com",
    },
    {
      href: "tel:+420737875367",
      icon: <Phone className="w-5 h-5 text-gray-700" />,
      text: "+420 737 875 367",
    },
    {
      href: null,
      icon: <MapPin className="w-5 h-5 text-gray-700" />,
      text: "Prague, Czech Republic",
    },
  ];

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-[85vh] bg-gray-50 px-6 py-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 
    bg-[radial-gradient(circle,rgba(0,0,0,0.02)_2px,transparent_2px),radial-gradient(circle,rgba(0,0,0,0.04)_2px,transparent_2px)] 
    bg-[length:40px_40px,20px_20px] 
    bg-[position:0_0,10px_10px]"
      ></div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 uppercase text-4xl md:text-5xl -mt-18 font-extrabold text-gray-800 text-center mb-6 tracking-wider"
      >
        Get in touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-gray-600 text-center max-w-lg mb-12 text-sm sm:text-base leading-relaxed"
      >
        Are you hiring or have a project in mind?  
        <br/>Reach out and let’s build something great!
      </motion.p>

      <div className="relative z-10 grid gap-4 sm:gap-5 w-full max-w-xl">
        {contactItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200">
              <CardContent className="flex items-center gap-3 sm:gap-4 py-4 px-5">
                <div className="flex-shrink-0 text-gray-700">{item.icon}</div>
                {item.href ? (
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    className="text-gray-800 hover:text-gray-900 transition text-sm sm:text-base"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <span className="text-gray-800 text-sm sm:text-base">
                    {item.text}
                  </span>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative z-10 flex justify-center gap-10 mt-14"
      >
        <Link
          href="https://www.linkedin.com/in/lukas-kouril"
          target="_blank"
          className="opacity-70 hover:opacity-100 hover:scale-110 transition"
        >
          <Linkedin className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
        </Link>
        <Link
          href="https://github.com/lukaskourilcz"
          target="_blank"
          className="opacity-70 hover:opacity-100 hover:scale-110 transition"
        >
          <Github className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
        </Link>
      </motion.div>

    </section>
  );
}
