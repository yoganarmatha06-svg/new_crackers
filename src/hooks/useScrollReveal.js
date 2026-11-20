import { useEffect, useRef, useState } from 'react';

/**
 * Custom React hook for triggering scroll reveal animations with IntersectionObserver
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (default 0.2 = ~20% visible)
 * @param {string} options.rootMargin - Root margin (default '0px')
 * @param {boolean} options.triggerOnce - Whether to animate only once (default true)
 * @returns {[React.RefObject, boolean]} [elementRef, isVisible]
 */
export const useScrollReveal = ({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    // Fallback if IntersectionObserver is unsupported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
};

export default useScrollReveal;
