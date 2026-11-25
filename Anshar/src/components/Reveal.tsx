"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // failsafe #1 — sudah terlihat di layar saat mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.05) {
      setVisible(true);
    }

    // failsafe #2 — apa pun yang terjadi, tampilkan setelah 1.2s
    const timer = window.setTimeout(() => setVisible(true), 1200);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setVisible(true);
            io?.disconnect();
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );
      io.observe(el);
    }

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
