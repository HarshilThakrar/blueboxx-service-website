import { Variants } from 'framer-motion';

export const hoverButtonVariant: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  tap: { scale: 0.95 },
};

export const hoverCardVariant: Variants = {
  initial: { y: 0, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
  hover: {
    y: -10,
    boxShadow: '0px 20px 40px rgba(0,0,0,0.2)',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const menuStaggerVariant: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const menuItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const modalVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};
