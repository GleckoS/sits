import React from 'react';
import { motion } from 'framer-motion';
import { myContext } from '../../hooks/provider';

export default function Wrapper({ children }) {
  const isMobile = (() => {
    if (typeof window !== 'undefined') return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return true;
  })();

  if (isMobile) {
    return <main>{children}</main>;
  }

  return (
    <myContext.Consumer>
      {({ setTransition }) => (
        <motion.main
          onAnimationStart={({ opacity }) => {
            setTransition(opacity);
          }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.35,
              stiffness: 75,
              duration: 0.2,
              when: 'beforeChildren',
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              type: 'spring',
              mass: 0.35,
              stiffness: 75,
            },
          }}
        >
          {children}
        </motion.main>
      )}
    </myContext.Consumer>
  );
}
