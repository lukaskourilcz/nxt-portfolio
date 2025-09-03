import React from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-t from-gray-100 to-gray-200 py-20 px-6 lg:px-20 text-center"
    >
      <h2 className="text-4xl font-bold mb-12 text-gray-800">Contact</h2>

      <div className="flex flex-col items-center gap-6 text-lg text-gray-700">
        <a
          href="mailto:kouril.lukas@gmail.com"
          className="flex items-center gap-3 hover:text-[#2ea44f] transition"
        >
          <EnvelopeIcon className="w-6 h-6 text-[#2ea44f]" />
          kouril.lukas@gmail.com
        </a>

        <a
          href="tel:+420737875367"
          className="flex items-center gap-3 hover:text-[#2ea44f] transition"
        >
          <PhoneIcon className="w-6 h-6 text-[#2ea44f]" />
          +420 737 875 367
        </a>

        <div className="flex items-center gap-3">
          <MapPinIcon className="w-6 h-6 text-[#2ea44f]" />
          <span>
            Currently residing in <b>Prague, Czech Republic</b>.
          </span>
        </div>
      </div>
    </section>
  );
}
