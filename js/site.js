const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reading progress
const progressBar = $('.progress i');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? scrollY / max : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
};
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Reveal fallback for browsers without view timelines.
if (!CSS.supports('animation-timeline: view()')) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }, { threshold: .13 });
  $$('.reveal').forEach(el => observer.observe(el));
}
