(function () {
  'use strict';

  var store = window.MegaMartStore;
  var searchForm = document.getElementById('searchForm');
  var searchInput = document.getElementById('searchInput');
  var categoryGrid = document.getElementById('categoryGrid');
  var recommendationGrid = document.getElementById('recommendationGrid');
  var recommendationPagination = document.getElementById('recommendationPagination');
  var recommendationHeading = document.getElementById('recommendationHeading');
  var recommendationCount = document.getElementById('recommendationCount');
  var emptyState = document.getElementById('emptyState');
  var liveStatus = document.getElementById('liveStatus');
  var urlParams = new URLSearchParams(window.location.search);
  var initialQuery = urlParams.get('q') || '';
  var initialCategory = urlParams.get('category') || '';
  var defaultRecommendations = store.products.slice();
  var pageSize = 15;
  var currentPage = Math.max(1, Number.parseInt(urlParams.get('page') || '1', 10) || 1);
  for (var index = defaultRecommendations.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    var currentProduct = defaultRecommendations[index];
    defaultRecommendations[index] = defaultRecommendations[randomIndex];
    defaultRecommendations[randomIndex] = currentProduct;
  }
  var selectedCategory = store.categories.some(function (category) { return category.key === initialCategory; })
    ? initialCategory
    : '';
  if (initialQuery) searchInput.value = initialQuery;

  function renderRecommendations() {
    var query = searchInput.value.trim().toLocaleLowerCase('id');
    var category = store.categories.find(function (entry) { return entry.key === selectedCategory; });
    var products = selectedCategory
      ? store.getProductsByCategory(selectedCategory)
      : query
        ? store.products
        : defaultRecommendations;
    if (query) {
      products = products.filter(function (product) {
        return product.name.toLocaleLowerCase('id').includes(query);
      });
    }

    var pageCount = Math.max(1, Math.ceil(products.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    var startIndex = (currentPage - 1) * pageSize;
    var visibleProducts = products.slice(startIndex, startIndex + pageSize);
    recommendationGrid.replaceChildren();
    visibleProducts.forEach(function (product) {
      recommendationGrid.appendChild(store.createProductCard(product));
    });
    recommendationHeading.replaceChildren();
    if (query) {
      recommendationHeading.append(document.createTextNode('Hasil pencarian '));
      recommendationHeading.appendChild(document.createElement('span')).textContent = 'produk';
    } else if (category) {
      recommendationHeading.append(document.createTextNode('Produk '));
      recommendationHeading.appendChild(document.createElement('span')).textContent = category.label.toLocaleLowerCase('id');
    } else {
      recommendationHeading.textContent = 'Rekomendasi';
    }
    recommendationCount.textContent = 'Menampilkan ' + visibleProducts.length + ' dari ' + products.length + ' produk';
    emptyState.hidden = products.length > 0;
    recommendationPagination.replaceChildren();
    recommendationPagination.hidden = pageCount <= 1;
    for (var pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
      var pageButton = document.createElement('button');
      pageButton.type = 'button';
      pageButton.className = 'recommendation-page' + (pageNumber === currentPage ? ' is-current' : '');
      pageButton.textContent = String(pageNumber);
      pageButton.setAttribute('aria-label', 'Halaman ' + pageNumber);
      if (pageNumber === currentPage) pageButton.setAttribute('aria-current', 'page');
      pageButton.addEventListener('click', function (event) {
        currentPage = Number(event.currentTarget.textContent);
        var nextUrl = new URL(window.location.href);
        if (currentPage > 1) nextUrl.searchParams.set('page', String(currentPage));
        else nextUrl.searchParams.delete('page');
        window.history.replaceState(null, '', nextUrl);
        renderRecommendations();
        document.getElementById('recommendations').scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
      });
      recommendationPagination.appendChild(pageButton);
    }
    categoryGrid.querySelectorAll('[data-category-filter]').forEach(function (button) {
      var active = button.dataset.categoryFilter === selectedCategory;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (query || selectedCategory) liveStatus.textContent = products.length + ' produk ditemukan.';
  }

  function selectCategory(categoryKey, shouldScroll) {
    selectedCategory = categoryKey;
    currentPage = 1;
    searchInput.value = '';
    renderRecommendations();
    var nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete('q');
    nextUrl.searchParams.delete('page');
    if (categoryKey) nextUrl.searchParams.set('category', categoryKey);
    else nextUrl.searchParams.delete('category');
    nextUrl.hash = 'recommendations';
    window.history.replaceState(null, '', nextUrl);
    if (shouldScroll) {
      document.getElementById('recommendations').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }

  categoryGrid.addEventListener('click', function (event) {
    var button = event.target.closest('[data-category-filter]');
    if (button) selectCategory(button.dataset.categoryFilter, true);
  });
  document.querySelectorAll('[data-recommendation-category]').forEach(function (link) {
    link.addEventListener('click', function () {
      selectCategory(link.dataset.recommendationCategory, false);
    });
  });
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    selectedCategory = '';
    currentPage = 1;
    renderRecommendations();
    document.getElementById('recommendations').scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  });

  searchInput.addEventListener('input', function () {
    if (searchInput.value.trim()) selectedCategory = '';
    currentPage = 1;
    renderRecommendations();
  });
  renderRecommendations();

  var currentSlide = 0;
  var physicalSlide = 1;
  var isTransitioning = false;
  var heroTrack = document.getElementById('heroTrack');
  var heroSlides = Array.prototype.slice.call(heroTrack.querySelectorAll('.hero-slide'));
  var heroDots = Array.prototype.slice.call(document.querySelectorAll('.hero-dot'));
  var hero = document.querySelector('.hero');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var slideTimer = null;
  var slideDelay = 5000;

  function makeClone(slide) {
    var clone = slide.cloneNode(true);
    clone.classList.add('is-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    clone.setAttribute('tabindex', '-1');
    return clone;
  }

  heroTrack.insertBefore(makeClone(heroSlides[heroSlides.length - 1]), heroSlides[0]);
  heroTrack.appendChild(makeClone(heroSlides[0]));

  function showSlide(index, direction) {
    if (isTransitioning) return;
    var nextSlide = (index + heroSlides.length) % heroSlides.length;
    if (nextSlide === currentSlide) return;

    currentSlide = nextSlide;
    physicalSlide += direction;
    isTransitioning = !reducedMotion.matches;
    heroTrack.style.transform = 'translate3d(-' + (physicalSlide * 20) + '%, 0, 0)';

    heroSlides.forEach(function (slide, slideIndex) {
      var active = slideIndex === currentSlide;
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });

    heroDots.forEach(function (dot, dotIndex) {
      var active = dotIndex === currentSlide;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });

    if (reducedMotion.matches) {
      if (physicalSlide === 0) physicalSlide = heroSlides.length;
      if (physicalSlide === heroSlides.length + 1) physicalSlide = 1;
      heroTrack.classList.add('no-transition');
      heroTrack.style.transform = 'translate3d(-' + (physicalSlide * 20) + '%, 0, 0)';
      heroTrack.offsetHeight;
      window.requestAnimationFrame(function () { heroTrack.classList.remove('no-transition'); });
    }
  }

  heroTrack.addEventListener('transitionend', function (event) {
    if (event.target !== heroTrack || event.propertyName !== 'transform') return;
    isTransitioning = false;

    if (physicalSlide === 0 || physicalSlide === heroSlides.length + 1) {
      physicalSlide = currentSlide + 1;
      heroTrack.classList.add('no-transition');
      heroTrack.style.transform = 'translate3d(-' + (physicalSlide * 20) + '%, 0, 0)';
      heroTrack.offsetHeight;
      window.requestAnimationFrame(function () { heroTrack.classList.remove('no-transition'); });
    }
  });

  function stopSlideTimer() {
    window.clearInterval(slideTimer);
    slideTimer = null;
  }

  function startSlideTimer() {
    stopSlideTimer();
    if (reducedMotion.matches || document.hidden || hero.matches(':hover') || hero.contains(document.activeElement)) return;
    slideTimer = window.setInterval(function () {
      showSlide(currentSlide + 1, 1);
    }, slideDelay);
  }

  document.querySelector('.hero-prev').addEventListener('click', function () {
    showSlide(currentSlide - 1, -1);
    startSlideTimer();
  });
  document.querySelector('.hero-next').addEventListener('click', function () {
    showSlide(currentSlide + 1, 1);
    startSlideTimer();
  });
  heroDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var target = Number(dot.dataset.slide);
      var forwardDistance = (target - currentSlide + heroSlides.length) % heroSlides.length;
      showSlide(target, forwardDistance <= heroSlides.length / 2 ? 1 : -1);
      startSlideTimer();
    });
  });
  hero.addEventListener('mouseenter', stopSlideTimer);
  hero.addEventListener('mouseleave', startSlideTimer);
  hero.addEventListener('focusin', stopSlideTimer);
  hero.addEventListener('focusout', function (event) {
    if (!hero.contains(event.relatedTarget)) startSlideTimer();
  });
  document.addEventListener('visibilitychange', startSlideTimer);
  reducedMotion.addEventListener('change', startSlideTimer);
  startSlideTimer();

  document.querySelectorAll('.add-button').forEach(function (button) {
    if (button.hasAttribute('data-cart-bound')) return;
    button.addEventListener('click', function () {
      var product = window.MegaMartStore.getProduct(button.dataset.productId);
      if (!product) return;
      try {
        window.MegaMartStore.add(product.id, 1);
        liveStatus.textContent = product.name + ' ditambahkan ke keranjang.';
      } catch (error) {
        liveStatus.textContent = 'Produk tidak dapat ditambahkan. Periksa penyimpanan browser lalu coba lagi.';
        console.error('Gagal menambahkan produk ke keranjang.', error);
      }
    });
    button.setAttribute('data-cart-bound', '');
  });
})();
