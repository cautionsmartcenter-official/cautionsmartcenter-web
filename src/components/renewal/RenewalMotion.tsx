import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Observe headings, never replace their text: the existing inline editor remains usable. */
export function RenewalMotion({page}: {page:string}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {stiffness:150, damping:30, mass:0.2});
  useEffect(() => {
    const root = document.querySelector('.caution-renewal');
    if (!root) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.2});
    const observe = () => root.querySelectorAll('main h2:not(.signature-subtitle):not([data-reveal]), main section:not(.signature-hero) img:not([data-reveal])').forEach(node => {
      node.setAttribute('data-reveal','');
      observer.observe(node);
    });
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(root, {childList:true,subtree:true});
    return () => {observer.disconnect();mutations.disconnect();};
  }, [page]);
  return <motion.div aria-hidden="true" className="renewal-reading-progress" style={{scaleX:progress}}/>;
}
