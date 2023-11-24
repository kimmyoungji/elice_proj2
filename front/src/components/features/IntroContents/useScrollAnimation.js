import { useState, useRef, useEffect } from 'react';

export default function useScrollAnimation() {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        } else {
          setIsInViewport(false);
        }
      });
    };
    const options = { root: null, rootMargin: "0px", threshold: 0 };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { isInViewport, ref };
}


