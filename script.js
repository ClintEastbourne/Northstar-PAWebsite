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


// Hero photo animation: hover on desktop; tap to toggle on touch devices.
(() => {
  const media = document.querySelector('.hero-media');
  if (!media) return;
  const video = media.querySelector('.hero-video');
  const hint = media.querySelector('.media-hint');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  const setPlaying = (playing) => {
    media.classList.toggle('is-playing', playing);
    media.setAttribute('aria-pressed', String(playing));
    if (hint) hint.innerHTML = playing ? 'Tap to return to the photo <span aria-hidden="true">↺</span>' : 'Hover or tap to see the animation <span aria-hidden="true">▶</span>';
    if (playing) {
      const promise = video.play();
      if (promise && promise.catch) promise.catch(() => media.classList.remove('is-playing'));
    } else {
      video.pause();
      try { video.currentTime = 0; } catch (_) {}
    }
  };
  media.addEventListener('mouseenter', () => { if (hoverCapable.matches) setPlaying(true); });
  media.addEventListener('mouseleave', () => { if (hoverCapable.matches) setPlaying(false); });
  media.addEventListener('click', () => { if (!hoverCapable.matches) setPlaying(!media.classList.contains('is-playing')); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) setPlaying(false); });
})();
