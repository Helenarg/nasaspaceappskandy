"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

export function PackageBenefits({ name, children }: { name: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="package-details" data-open={open}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        <span>{open ? "Hide full benefits" : "View full benefits"}<span className="sr-only"> for {name}</span></span>
        <PlusIcon size={18} aria-hidden="true" />
      </button>
      <div className="package-details-reveal" id={id} aria-hidden={!open} inert={!open}>
        <div className="package-details-inner">{children}</div>
      </div>
    </div>
  );
}
