(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var currentSlide = document.getElementById('currentSlide');
  var progressBar = document.getElementById('progressBar');
  var previousButton = document.getElementById('prevBtn');
  var nextButton = document.getElementById('nextBtn');
  var fullscreenButton = document.getElementById('fullscreenBtn');
  var status = document.getElementById('presentationStatus');
  var activeIndex = 0;

  function showSlide(index) {
    activeIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach(function (slide, slideIndex) {
      var active = slideIndex === activeIndex;
      slide.hidden = !active;
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    currentSlide.textContent = String(activeIndex + 1).padStart(2, '0');
    progressBar.style.width = (slides.length > 1 ? activeIndex / (slides.length - 1) : 1) * 100 + '%';
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;
    status.textContent = 'Slide ' + (activeIndex + 1) + ' dari ' + slides.length;
  }

  previousButton.addEventListener('click', function () { showSlide(activeIndex - 1); });
  nextButton.addEventListener('click', function () { showSlide(activeIndex + 1); });

  document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    var target = event.target;
    if (target && target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === ' ' && target && target.closest('a, button')) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      showSlide(activeIndex + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key.toLowerCase() === 'f') {
      toggleFullscreen();
    }
  });

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        status.textContent = 'Layar penuh tidak didukung browser ini.';
        return;
      }
    } catch (error) {
      status.textContent = 'Layar penuh tidak tersedia. Gunakan tombol navigasi untuk melanjutkan.';
      console.error('Mode layar penuh tidak dapat diaktifkan.', error);
    }
  }

  fullscreenButton.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', function () {
    var isFullscreen = Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute('aria-label', isFullscreen ? 'Keluar dari layar penuh' : 'Aktifkan layar penuh');
    status.textContent = isFullscreen ? 'Mode layar penuh aktif.' : 'Mode layar penuh ditutup.';
  });

  document.getElementById('totalSlides').textContent = String(slides.length).padStart(2, '0');
  showSlide(0);
})();
