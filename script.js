const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}

const themeButton = document.querySelector('.theme-toggle');
if (themeButton) {
  function updateThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Enable light mode' : 'Enable dark mode');
    themeButton.title = dark ? 'Enable light mode' : 'Enable dark mode';
  }
  updateThemeButton();
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
    updateThemeButton();
  });
}

const track = document.querySelector('.carousel-track');
if (track) {
  const carousel = track.closest('.carousel');
  const slides = Array.from(track.children);
  const controls = carousel.querySelector('.carousel-controls');
  const pause = controls.querySelector('.carousel-pause');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let moving = false;
  let activeAnimation = null;
  let automaticAnimation = false;
  let paused = reducedMotion.matches;
  let hovered = false;
  let timer;
  let touchX = null;
  slides.forEach((slide, index) => {
    slide.setAttribute('data-moment', String(index + 1));
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
  });
  function updateControls() {
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Start automatic slideshow' : 'Pause automatic slideshow');
  }
  function schedule() {
    clearTimeout(timer);
    // Mouse clicks can leave focus inside after the pointer has moved away.
    // Only keyboard focus should keep playback paused independently of hover.
    const focused = document.activeElement;
    const keyboardFocus = focused && carousel.contains(focused) && focused.matches(':focus-visible');
    const suspended = paused || hovered || document.hidden || keyboardFocus;
    if (activeAnimation && automaticAnimation) {
      if (suspended) activeAnimation.pause();
      else activeAnimation.play();
    }
    if (!suspended && !moving) {
      if (reducedMotion.matches) timer = setTimeout(() => advance(1, true), 6000);
      else advance(1, true);
    }
  }
  function advance(direction, automatic = false) {
    if (moving || slides.length < 2) return;
    moving = true;
    const children = track.children;
    const step = children[1].getBoundingClientRect().left - children[0].getBoundingClientRect().left;
    const start = direction > 0 ? 0 : -step;
    const end = direction > 0 ? -step : 0;
    // Keep a fourth card ready outside the viewport during either direction.
    const incoming = (direction > 0 ? track.firstElementChild : track.lastElementChild).cloneNode(true);
    incoming.setAttribute('aria-hidden', 'true');
    incoming.inert = true;
    incoming.removeAttribute('id');
    incoming.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    if (direction > 0) track.append(incoming);
    else track.prepend(incoming);
    function finish() {
      incoming.remove();
      if (direction > 0) track.append(track.firstElementChild);
      else track.prepend(track.lastElementChild);
      track.style.transform = 'translateX(0)';
      if (activeAnimation) activeAnimation.cancel();
      activeAnimation = null;
      moving = false;
      updateControls();
      schedule();
    }
    if (reducedMotion.matches) {
      finish();
    } else {
      automaticAnimation = automatic;
      activeAnimation = track.animate(
        [{ transform: `translateX(${start}px)` }, { transform: `translateX(${end}px)` }],
        { duration: automatic ? 6500 : 700, easing: automatic ? 'linear' : 'ease-out', fill: 'forwards' }
      );
      activeAnimation.onfinish = finish;
    }
  }
  function manualAdvance(direction) { advance(direction); schedule(); }
  pause.addEventListener('click', () => { paused = !paused; updateControls(); schedule(); });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      manualAdvance(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  track.addEventListener('touchstart', event => { touchX = event.touches[0].clientX; clearTimeout(timer); }, { passive: true });
  track.addEventListener('touchend', event => {
    if (touchX !== null) {
      const distance = touchX - event.changedTouches[0].clientX;
      if (Math.abs(distance) > 40) advance(distance > 0 ? 1 : -1);
    }
    touchX = null;
    schedule();
  }, { passive: true });
  track.addEventListener('touchcancel', () => { touchX = null; schedule(); }, { passive: true });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateControls(); schedule(); });
  controls.hidden = false;
  updateControls();
  schedule();
}
