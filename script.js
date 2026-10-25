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


// Image/video media: tap to play one complete cycle, then return to the
// original promotional still for two seconds and wait for the visitor to replay.
(() => {
  document.querySelectorAll('.hero-media').forEach((media) => {
    const video = media.querySelector('.hero-video');
    const hint = media.querySelector('.media-hint');
    if (!video) return;
    let playing = false;
    let stillTimer = null;

    const showStill = () => {
      media.classList.remove('is-playing');
      media.setAttribute('aria-pressed', 'false');
    };
    const setHint = (message) => {
      if (!hint) return;
      hint.innerHTML = message ? message + ' <span aria-hidden="true">▶</span>' : '';
    };
    const playOnce = () => {
      if (playing) return;
      playing = true;
      clearTimeout(stillTimer);
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
      setHint('');
      stillTimer = setTimeout(() => setHint('Tap to play again'), 2000);
    });
    media.addEventListener('click', () => { if (!playing) playOnce(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && playing) {
        playing = false;
        video.pause();
        showStill();
        clearTimeout(stillTimer);
        setHint('Tap to play');
      }
    });
  });
})();
