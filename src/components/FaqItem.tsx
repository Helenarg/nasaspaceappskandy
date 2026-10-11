"use client";
import { useId, useState, type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";

type FaqItemProps = {
  question: ReactNode;
  children: ReactNode;
};

export function FaqItem({ question, children }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduced = useReducedMotion();
  return (
    <div className="faq-item">
      <h3>
        <button
          id={`${id}-trigger`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={() => setOpen((previous) => !previous)}
        >
          <span>{question}</span>
          <m.span
            className="faq-indicator"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <PlusIcon size={19} aria-hidden="true" />
          </m.span>
        </button>
      </h3>
      <m.div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="faq-answer"
      >
        <div className="faq-answer-inner">{children}</div>
      </m.div>
    </div>
  );
}
