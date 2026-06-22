/** SVG displacement filters for liquid glass refraction — mount once in the shell. */
export function LiquidGlassFilters() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="liquid-glass-displace" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="10s"
              values="0.008;0.018;0.008"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="liquid-glass-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
