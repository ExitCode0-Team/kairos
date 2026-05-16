export function LiquidWave({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-12 w-full md:h-16"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill="#0A0A0A"
        />
        <path
          d="M0 48C200 72 400 24 720 48C1040 72 1240 24 1440 48V80H0V48Z"
          fill="#171717"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
}
