'use client';

import React from 'react';

import { AnimatePresence, motion, Variants } from 'framer-motion';

const basicVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 1.5,
  ease: [0.6, 0.01, 0, 0.9],
};

const PageWrapper = ({ children }: any) => {
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        console.log('exit complete ---------- ');
      }}
    >
      <motion.div variants={basicVariants} transition={pageTransition} initial="initial" animate="animate" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageWrapper;
