import React from 'react';
import Layout from './src/layout';
import './src/styles/normalize.css';
import './src/styles/fonts.css';
import Provider from './src/hooks/provider';
import { AnimatePresence } from 'framer-motion';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>
    <AnimatePresence initial={false} mode="wait">
      {element}
    </AnimatePresence>
  </Layout>
);

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>;

export const shouldUpdateScroll = ({ prevRouterProps, routerProps: { location }, getSavedScrollPosition }) => {
  const isMobile = (() => {
    if (typeof window !== 'undefined') return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return true;
  })();

  if (!isMobile) return true;
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 500;
  // if it's a "normal" route
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY);
    return false;
  }
  // if we used the browser's forwards or back button
  else if (prevRouterProps) {
    const savedPosition = getSavedScrollPosition(location) || [0, 0];
    window.setTimeout(() => window.scrollTo(...savedPosition), TRANSITION_DELAY * 2);
    return false;
  }
};
