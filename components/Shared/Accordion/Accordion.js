"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className={`
            overflow-hidden rounded-2xl border border-gray-200
            bg-white shadow-sm transition-all duration-300
            hover:shadow-lg
            ${openIndex === i ? "shadow-lg border-indigo-200" : ""}
          `}
        >
          <button
            onClick={() => toggle(i)}
            className="flex w-full items-center justify-between p-5 text-right"
          >
            <span className="font-semibold text-gray-800 text-base">
              {item.question}
            </span>

            <div
              className={`
                flex items-center justify-center
                w-8 h-8 rounded-full bg-gray-100
                transition-all duration-300
                ${openIndex === i ? "rotate-180 bg-indigo-100" : ""}
              `}
            >
              <ChevronDownIcon className="h-5 w-5 text-indigo-600" />
            </div>
          </button>

          <div
            className={`
              transition-all duration-300 ease-in-out
              ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
              overflow-hidden
            `}
          >
            <p className="px-5 pb-5 text-gray-600 leading-8 text-sm">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
