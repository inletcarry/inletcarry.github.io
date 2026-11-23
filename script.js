(() => {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;
  const mainImg = gallery.querySelector('#gallery-main');
  const labelEl = gallery.querySelector('#gallery-label');
  const countEl = gallery.querySelector('#gallery-count');
  const thumbs = Array.from(gallery.querySelectorAll('.thumb'));
  if (!mainImg || !thumbs.length) return;

  function selectThumb(btn) {
    const src = btn.getAttribute('data-src');
    const alt = btn.getAttribute('data-alt') || '';
    const label = btn.getAttribute('data-label') || '';
    const idx = btn.getAttribute('data-index') || '';
    if (!src) return;

    thumbs.forEach((t) => {
      const active = t === btn;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (mainImg.getAttribute('src') !== src) {
      mainImg.classList.add('is-swapping');
      mainImg.setAttribute('src', src);
      mainImg.setAttribute('alt', alt);
      window.setTimeout(() => mainImg.classList.remove('is-swapping'), 140);
    } else {
      mainImg.setAttribute('alt', alt);
    }

    if (labelEl) labelEl.textContent = label;
    if (countEl) countEl.textContent = idx;
  }

  thumbs.forEach((btn, i) => {
    btn.addEventListener('click', () => selectThumb(btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = thumbs[(i + 1) % thumbs.length];
        next.focus();
        selectThumb(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = thumbs[(i - 1 + thumbs.length) % thumbs.length];
        prev.focus();
        selectThumb(prev);
      }
    });
  });
})();
