const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();


// Hero photo animation: start on hover (desktop) or tap (touch). Each video
// cycle is followed by a two-second still-image pause before replaying.
(() => {
  const media = document.querySelector('.hero-media');
  if (!media) return;
  const video = media.querySelector('.hero-video');
  const hint = media.querySelector('.media-hint');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  let active = false;
  let stillTimer = null;

  const showStill = () => {
    media.classList.remove('is-playing');
    media.setAttribute('aria-pressed', String(active));
  };
  const playCycle = () => {
    if (!active) return;
    clearTimeout(stillTimer);
    showStill();
    try { video.currentTime = 0; } catch (_) {}
    const promise = video.play();
    if (promise && promise.catch) promise.catch(() => { active = false; showStill(); });
    media.classList.add('is-playing');
    media.setAttribute('aria-pressed', 'true');
  };
  const start = () => {
    if (active) return;
    active = true;
    if (hint) hint.innerHTML = 'Playing animation <span aria-hidden="true">▶</span>';
    playCycle();
  };
  const stop = () => {
    active = false;
    clearTimeout(stillTimer);
    video.pause();
    showStill();
    if (hint) hint.innerHTML = 'Hover or tap to see the animation <span aria-hidden="true">▶</span>';
  };

  video.addEventListener('ended', () => {
    if (!active) return;
    video.pause();
    showStill();
    stillTimer = setTimeout(() => {
      if (active) playCycle();
    }, 2000);
  });
  media.addEventListener('mouseenter', () => { if (hoverCapable.matches) start(); });
  media.addEventListener('mouseleave', () => { if (hoverCapable.matches) stop(); });
  media.addEventListener('click', () => { if (!hoverCapable.matches) active ? stop() : start(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
})();
