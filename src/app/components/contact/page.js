import React from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-white to-gray-100 text-gray-900 py-24 px-6 lg:px-20 overflow-hidden"
    >
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[length:40px_40px]"></div>

      <h2
        className="absolute inset-0 flex items-center justify-center text-[14rem] font-bold text-transparent
               [-webkit-text-stroke:6px_rgba(0,0,0,0.08)] opacity-40 leading-none pointer-events-none"
      >
        LET&apos;S WORK
      </h2>

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900">
          {" "}
          Let&apos;s make something happen.
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Feel free to reach out via email or phone.
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-lg max-w-2xl mx-auto">
        <a
          href="mailto:kouril.lukas@gmail.com"
          className="flex items-center gap-4 w-full bg-gray-50 backdrop-blur-md rounded-xl border border-gray-400 px-6 py-4 hover:border-yellow-400 hover:shadow-yellow-400/30 transition"
        >
          <EnvelopeIcon className="w-7 h-7 text-yellow-600" />
          <span className="text-gray-800">kouril.lukas@gmail.com</span>
        </a>

        <a
          href="tel:+420737875367"
          className="flex items-center gap-4 w-full bg-gray-50 backdrop-blur-md rounded-xl border border-gray-400 px-6 py-4 hover:border-yellow-400 hover:shadow-yellow-400/30 transition"
        >
          <PhoneIcon className="w-7 h-7 text-yellow-600" />
          <span className="text-gray-800">+420 737 875 367</span>
        </a>

        <div className="flex items-center gap-4 w-full bg-gray-50 backdrop-blur-md rounded-xl border border-gray-400 px-6 py-4">
          <MapPinIcon className="w-7 h-7 text-yellow-600" />
          <span className="text-gray-800">
            Residing in{" "}
            <b className="text-yellow-600">Prague, Czech Republic</b>
          </span>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-16 mt-24">
        {" "}
        <Link href="https://www.linkedin.com/in/lukas-kouril" target="_blank">
          {" "}
          <Image
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width={80}
            height={80}
            className="opacity-70 hover:opacity-100 hover:scale-110 transition filter invert"
          />{" "}
        </Link>{" "}
        <Link href="https://github.com/lukaskourilcz" target="_blank">
          {" "}
          <Image
            src="/icons/github.svg"
            alt="GitHub"
            width={80}
            height={80}
            className="opacity-70 hover:opacity-100 hover:scale-110 transition filter invert"
          />{" "}
        </Link>{" "}
      </div>
    </section>
  );
}
