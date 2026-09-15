'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FCA311] via-[#14213D] to-[#FCA311] origin-left z-50 border-b border-[#000000]"
    />
  );
}
