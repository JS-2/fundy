import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('scroll to top');
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
