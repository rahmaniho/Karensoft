"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          <div key={item.q} className={cn("glass rounded-2xl transition-colors", isOpen && "border-electric-400/40")}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-start text-base font-bold text-white sm:px-6 sm:text-[1.05rem]"
              >
                <span>{item.q}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-5 shrink-0 text-electric-300 transition-transform duration-300", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 leading-8 text-mist-400 sm:px-6">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
