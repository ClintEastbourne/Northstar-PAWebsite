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


// Hero media: tap/click to play one complete video cycle, then return to the
// original promotional image for two seconds and wait for the visitor to replay.
(() => {
  const media = document.querySelector('.hero-media');
  if (!media) return;
  const video = media.querySelector('.hero-video');
  const hint = media.querySelector('.media-hint');
  let playing = false;
  let stillTimer = null;

  const showStill = () => {
    media.classList.remove('is-playing');
    media.setAttribute('aria-pressed', 'false');
  };
  const setHint = (message) => {
    if (hint) hint.innerHTML = message + ' <span aria-hidden="true">▶</span>';
  };
  const playOnce = () => {
    if (playing) return;
    playing = true;
    clearTimeout(stillTimer);
    showStill();
    try { video.currentTime = 0; } catch (_) {}
    media.classList.add('is-playing');
    media.setAttribute('aria-pressed', 'true');
    setHint('Playing');
    const promise = video.play();
    if (promise && promise.catch) promise.catch(() => {
      playing = false;
      showStill();
      setHint('Tap to play');
    });
  };

  video.addEventListener('ended', () => {
    playing = false;
    video.pause();
    showStill();
    // Keep the full promotional still visible for at least two seconds.
    setHint('');
    if (hint) hint.textContent = '';
    stillTimer = setTimeout(() => setHint('Tap to play again'), 2000);
  });

  media.addEventListener('click', () => {
    if (!playing) playOnce();
  });
  media.addEventListener('mouseenter', () => {});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) {
      playing = false;
      video.pause();
      showStill();
      clearTimeout(stillTimer);
      setHint('Tap to play');
    }
  });
})();
