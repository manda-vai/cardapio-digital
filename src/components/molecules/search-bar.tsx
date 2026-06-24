"use client";

import { useRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/atoms/icon-button";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  value: string;
}

export function SearchBar({
  className,
  onClear,
  value,
  placeholder = "Buscar no cardápio...",
  ...props
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative", className)} role="search">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/60 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label="Buscar no cardápio"
        className={cn(
          "w-full pl-10 pr-10 py-2.5 bg-surface-container text-on-surface placeholder:text-on-surface-variant/60",
          "rounded-radius-full border border-outline-variant",
          "transition-all duration-200",
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0",
          "[&::-webkit-search-cancel-button]:hidden"
        )}
        {...props}
      />
      {value && onClear && (
        <IconButton
          aria-label="Limpar busca"
          size="sm"
          variant="standard"
          onClick={() => {
            onClear();
            inputRef.current?.focus();
          }}
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </IconButton>
      )}
    </div>
  );
}
