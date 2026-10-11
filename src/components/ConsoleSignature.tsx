"use client";

import { useEffect } from "react";

const signature = String.raw`
 ███████╗██████╗  █████╗  ██████╗███████╗
 ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝
 ███████╗██████╔╝███████║██║     █████╗
 ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝
 ███████║██║     ██║  ██║╚██████╗███████╗
 ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝

  █████╗ ██████╗ ██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██╔════╝
 ███████║██████╔╝██████╔╝███████╗
 ██╔══██║██╔═══╝ ██╔═══╝ ╚════██║
 ██║  ██║██║     ██║     ███████║
 ╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝

 N A S A   S P A C E   A P P S   K A N D Y

 Kandy, Sri Lanka // November 14-15, 2026
 Website: https://nasaspaceapps.lk

 Crafted by Sequence Labs
 https://www.sequencelabs.dev

 © 2026 NASA Space Apps Kandy. Ideas beyond boundaries.
`;

export function ConsoleSignature() {
  useEffect(() => {
    console.log(
      `%c${signature}`,
      "color:#eafe07;font:700 12px/1.12 monospace;",
    );
  }, []);

  return null;
}
