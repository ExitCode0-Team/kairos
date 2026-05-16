export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  durationFast: 150,
  duration: 200,
  durationSlow: 300,
} as const;

export const transition = {
  default: `all ${motion.duration}ms ${motion.ease}`,
  fast: `all ${motion.durationFast}ms ${motion.ease}`,
} as const;
