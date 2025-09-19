"use client";

import React from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-white to-gray-100 text-gray-900 py-16 px-4 sm:px-8 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:24px_24px] sm:bg-[length:40px_40px]"></div>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="hidden sm:flex absolute inset-0 items-center justify-center text-[6rem] md:text-[10rem] lg:text-[14rem] font-bold text-transparent
                 [-webkit-text-stroke:3px_rgba(0,0,0,0.08)] md:[-webkit-text-stroke:5px_rgba(0,0,0,0.08)] lg:[-webkit-text-stroke:6px_rgba(0,0,0,0.08)] leading-none pointer-events-none text-center"
      >
        LET&apos;S WORK
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-10 sm:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900">
          Let&apos;s make something happen.
        </h2>
        <p className="text-gray-600 mt-2 sm:mt-3 max-w-sm sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg">
          Feel free to reach out via email or phone.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-sm sm:text-base md:text-lg max-w-md sm:max-w-2xl mx-auto w-full"
      >
        {[
          {
            href: "mailto:kouril.lukas@gmail.com",
            icon: (
              <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-600" />
            ),
            text: "kouril.lukas@gmail.com",
          },
          {
            href: "tel:+420737875367",
            icon: (
              <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-600" />
            ),
            text: "+420 737 875 367",
          },
        ].map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 sm:gap-4 w-full bg-gray-50 backdrop-blur-md rounded-lg sm:rounded-xl border border-gray-300 sm:border-gray-400 px-3 py-2.5 sm:px-6 sm:py-4 hover:border-yellow-400 hover:shadow-yellow-400/30 transition"
          >
            {item.icon}
            <span className="text-gray-800 truncate">{item.text}</span>
          </motion.a>
        ))}

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 sm:gap-4 w-full bg-gray-50 backdrop-blur-md rounded-lg sm:rounded-xl border border-gray-300 sm:border-gray-400 px-3 py-2.5 sm:px-6 sm:py-4"
        >
          <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-600" />
          <span className="text-gray-800 text-sm sm:text-base">
            Residing in{" "}
            <b className="text-yellow-600">Prague, Czech Republic</b>
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="relative z-10 flex justify-center gap-8 sm:gap-12 md:gap-16 mt-12 sm:mt-20 flex-wrap"
      >
        <Link href="https://www.linkedin.com/in/lukas-kouril" target="_blank">
          <Image
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width={40}
            height={40}
            className="sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] opacity-70 hover:opacity-100 hover:scale-110 transition filter invert"
          />
        </Link>
        <Link href="https://github.com/lukaskourilcz" target="_blank">
          <Image
            src="/icons/github.svg"
            alt="GitHub"
            width={40}
            height={40}
            className="sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] opacity-70 hover:opacity-100 hover:scale-110 transition filter invert"
          />
        </Link>
      </motion.div>
    </section>
  );
}
