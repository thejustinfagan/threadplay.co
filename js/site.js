const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Integrate the approved black-thread visual system and the supplied public
// Battle Dinghy Game #151 capture into the existing cinematic experience.
const brandStyle = document.createElement('style');
brandStyle.textContent = `
  .brand-world-art{position:absolute;z-index:0;inset:4% 0 2%;width:100%;height:94%;object-fit:cover;border:1px solid rgba(255,255,255,.15);border-radius:30px;box-shadow:0 44px 120px rgba(0,0,0,.48);opacity:.72;filter:saturate(.9) contrast(1.03);-webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,.3),#000 28%,#000 92%);mask-image:linear-gradient(90deg,rgba(0,0,0,.3),#000 28%,#000 92%)}
  .sim-card.front{height:675px;background:#000}.sim-card.front img.actual-game{width:100%;height:calc(100% - 52px);aspect-ratio:auto;object-fit:cover;object-position:top center}
  .brand-reel{position:relative;margin-bottom:110px;min-height:520px;border:1px solid var(--line);border-radius:30px;overflow:hidden;background:#f5f5f2;box-shadow:0 50px 130px rgba(0,0,0,.48)}
  .brand-reel>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .brand-reel-caption{position:absolute;z-index:2;left:28px;bottom:28px;max-width:560px;padding:18px 20px;border:1px solid rgba(255,255,255,.2);background:rgba(5,6,8,.78);backdrop-filter:blur(18px);box-shadow:0 20px 50px rgba(0,0,0,.3)}
  .brand-reel-caption span{display:block;color:var(--cyan);font:750 8px var(--mono);letter-spacing:.14em}.brand-reel-caption b{display:block;margin-top:8px;font-size:22px}.brand-reel-caption small{display:block;margin-top:7px;color:#9aa2ac;line-height:1.5}
  .capture-tile.one img{object-position:top center}
  @media(max-width:760px){.brand-world-art{inset:3% 0 0;height:96%;opacity:.58}.sim-card.front{height:505px}.brand-reel{min-height:350px;margin-bottom:70px;border-radius:20px}.brand-reel-caption{left:12px;right:12px;bottom:12px;max-width:none;padding:14px}.brand-reel-caption b{font-size:17px}}
`;
document.head.append(brandStyle);

const heroWorld = $('.hero-world');
const worldGrid = $('.world-grid', heroWorld || document);
if (heroWorld && worldGrid && !$('.brand-world-art', heroWorld)) {
  worldGrid.insertAdjacentHTML('afterend', '<img class="brand-world-art" src="/assets/brand/threadplay-visual-system.svg" alt="ThreadPlay black-thread visual system with restrained electric-blue signals">');
}

const backCard = $('.sim-card.back');
if (backCard) {
  backCard.innerHTML = '<header><b>ThreadPlay Visual System</b><small>BLACK THREAD · BLUE SIGNAL</small></header><img src="/assets/brand/threadplay-visual-system.svg" alt="ThreadPlay black-thread and spool branding">';
}

const frontCard = $('.sim-card.front');
if (frontCard) {
  frontCard.innerHTML = '<header><b>Battle Dinghy</b><small>ACTUAL GAME #151 · 3 PLAYERS</small></header><img class="actual-game" src="/assets/captures/battle-dinghy-game151.svg" alt="Actual public Battle Dinghy Game 151 showing a three-player full fleet battle">';
}

const nativeSection = $('#native');
if (nativeSection && !$('.brand-reel')) {
  nativeSection.insertAdjacentHTML('afterend', `
    <section class="brand-reel shell view-reveal" aria-label="ThreadPlay visual identity system">
      <img src="/assets/brand/threadplay-visual-system.svg" alt="Black ThreadPlay strands flowing around the TP spool with restrained electric-blue signals">
      <div class="brand-reel-caption"><span>THREADPLAY VISUAL SYSTEM</span><b>Physical thread. Public play. Digital signal.</b><small>Black thread is the default material. Electric blue appears only when the system is active.</small></div>
    </section>`);
}

const firstCapture = $('.capture-tile.one');
if (firstCapture) {
  const image = $('img', firstCapture);
  if (image) {
    image.src = '/assets/captures/battle-dinghy-game151.svg';
    image.alt = 'Actual public Battle Dinghy Game 151 capture';
  }
  const caption = $('figcaption', firstCapture);
  if (caption) caption.innerHTML = '<div><small>01 · actual public game</small><b>Battle Dinghy · Game #151</b></div><span>3-player full fleet</span>';
}
const archiveNote = $('.archive-note');
if (archiveNote) archiveNote.textContent = 'Game #151 is reconstructed from the supplied public capture · remaining pieces are emulator-derived renders';

// Reading progress
const progressBar = $('.progress i');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? scrollY / max : 0;
  if (progressBar) progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
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
