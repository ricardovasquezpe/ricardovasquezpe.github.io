// Apply the preference before rendering the page, including across navigation.
(() => {
  let theme;
  try { theme = localStorage.getItem('portfolio-theme'); } catch (_) {}
  if (theme !== 'dark' && theme !== 'light') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
