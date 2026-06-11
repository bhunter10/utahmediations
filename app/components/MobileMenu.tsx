"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  href: string;
  label: string;
  newTab?: boolean;
};

export function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="mobile-menu" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="mobile-menu-button"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isOpen ? (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6 6 18 18" />
            <path d="M18 6 6 18" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        )}
      </button>
      {isOpen ? (
        <div className="mobile-menu-panel">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
              rel={item.newTab ? "noopener noreferrer" : undefined}
              target={item.newTab ? "_blank" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="mobile-book-link"
            href="/#booking"
            onClick={() => setIsOpen(false)}
          >
            Book
          </Link>
        </div>
      ) : null}
    </div>
  );
}
