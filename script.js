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
  let paused = reducedMotion.matches;
  let pointerId = null;
  let pointerX = 0;
  let offset = 0;
  let frame = null;
  let previousTime = null;
  let timer;
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
  function stepWidth() {
    return track.children[1].getBoundingClientRect().left - track.children[0].getBoundingClientRect().left;
  }
  function render() {
    const step = stepWidth();
    if (step <= 0) return;
    // Rotate the cards as they leave either edge, preserving the drag position.
    while (offset <= -step) {
      track.append(track.firstElementChild);
      offset += step;
    }
    while (offset > 0) {
      track.prepend(track.lastElementChild);
      offset -= step;
    }
    track.style.transform = `translateX(${offset}px)`;
  }
  function suspended() {
    const focused = document.activeElement;
    const keyboardFocus = focused && carousel.contains(focused) && focused.matches(':focus-visible');
    return paused || pointerId !== null || document.hidden || keyboardFocus;
  }
  function tick(time) {
    frame = null;
    if (suspended()) return;
    if (previousTime !== null) {
      offset -= stepWidth() * Math.min(time - previousTime, 100) / 6500;
      render();
    }
    previousTime = time;
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    clearTimeout(timer);
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = null;
    if (suspended() || slides.length < 2) return;
    if (reducedMotion.matches) {
      timer = setTimeout(() => { manualAdvance(1); schedule(); }, 6000);
    } else {
      frame = requestAnimationFrame(tick);
    }
  }
  function manualAdvance(direction) {
    if (slides.length < 2) return;
    offset -= direction * stepWidth();
    render();
  }
  pause.addEventListener('click', () => { paused = !paused; updateControls(); schedule(); });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      manualAdvance(event.key === 'ArrowRight' ? 1 : -1);
      schedule();
    }
  });
  track.addEventListener('dragstart', event => event.preventDefault());
  track.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || slides.length < 2) return;
    pointerId = event.pointerId;
    pointerX = event.clientX;
    track.classList.add('is-dragging');
    track.setPointerCapture(pointerId);
    // Avoid selecting text and native image dragging with a mouse.
    if (event.pointerType === 'mouse') event.preventDefault();
    schedule();
  });
  track.addEventListener('pointermove', event => {
    if (event.pointerId !== pointerId) return;
    offset += event.clientX - pointerX;
    pointerX = event.clientX;
    render();
  });
  function endDrag(event) {
    if (event.pointerId !== pointerId) return;
    const capturedPointer = pointerId;
    pointerId = null;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(capturedPointer)) track.releasePointerCapture(capturedPointer);
    schedule();
  }
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('lostpointercapture', endDrag);
  window.addEventListener('blur', () => {
    if (pointerId !== null) endDrag({ pointerId });
  });
  window.addEventListener('resize', render);
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateControls(); schedule(); });
  controls.hidden = false;
  updateControls();
  schedule();
}
