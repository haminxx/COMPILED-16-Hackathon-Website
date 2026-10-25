type FreqWordmarkProps = {
  className?: string;
};

/** Geometric Freq wordmark: one stem weight, tight, a single color via currentColor. */
export function FreqWordmark({ className = "h-7 w-auto" }: FreqWordmarkProps) {
  return (
    <svg viewBox="0 0 198 62" className={className} fill="currentColor" role="img" aria-label="Freq">
      <path d="M2 8h40v9H13v8h22v9H13v18H2V8z" />
      <path d="M50 22h11v30H50V22zm0 0h20c10 0 16 6 16 14v5h-11v-4c0-4-3-7-8-7H50V22z" />
      <g transform="translate(-8 0)">
        <path
          fillRule="evenodd"
          d="M112 32c0-12 9-21 21-21s21 9 21 21v3H126v7c1 5 6 8 11 8 4.5 0 8-1.8 11-4.6l7 7c-4.4 4.6-10.6 7.6-18 7.6-13.6 0-24-9.2-24-21.4V32zm13-.5h18c-.6-5.6-4.6-9.2-9-9.2s-9 3.6-9 9.2z"
        />
      </g>
      <g transform="translate(-18 0)">
        <path
          fillRule="evenodd"
          d="M176 32 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0z M176 32 m-7 0 a7 7 0 1 1 14 0 a7 7 0 1 1 -14 0z"
        />
        <path d="M186 26h10v32h-10z" />
      </g>
    </svg>
  );
}
