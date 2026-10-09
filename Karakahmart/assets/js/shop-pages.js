(function () {
  'use strict';

  var store = window.MegaMartStore;
  var page = document.body.dataset.page;
  var liveStatus = document.getElementById('liveStatus');

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function setEmpty(container, message, actionLabel, actionHref) {
    container.replaceChildren();
    var empty = element('div', 'empty-panel');
    var iconWrap = element('span', 'empty-icon');
    var icon = element('i', 'ph ph-shopping-bag-open');
    icon.setAttribute('aria-hidden', 'true');
    iconWrap.appendChild(icon);
    empty.appendChild(iconWrap);
    empty.appendChild(element('h2', '', message));
    empty.appendChild(element('p', '', 'Pilih produk dari katalog untuk melanjutkan.'));
    var action = element('a', 'primary-action', actionLabel);
    action.href = actionHref;
    empty.appendChild(action);
    container.appendChild(empty);
  }

  function renderProduct() {
    var productId = new URLSearchParams(window.location.search).get('id');
    var product = store.getProduct(productId);
    var detail = document.getElementById('productDetail');
    var description = document.getElementById('detailDescription');
    var related = document.getElementById('relatedProducts');

    if (!product) {
      document.title = 'Produk tidak ditemukan | KarakahMart';
      setEmpty(detail, 'Produk tidak ditemukan', 'Kembali ke katalog', 'index.html');
      description.hidden = true;
      related.hidden = true;
      return;
    }

    document.title = product.name + ' | KarakahMart';
    document.querySelector('.breadcrumbs span').textContent = product.name;
    var image = element('img');
    image.src = product.image;
    image.alt = product.imageAlt;
    image.width = 900;
    image.height = 900;
    var imageWrap = element('div', 'detail-image');
    imageWrap.appendChild(image);

    var content = element('div', 'detail-content');
    content.appendChild(element('p', 'detail-category', store.getCategoryLabel(product.category)));
    content.appendChild(element('h1', '', product.name));
    var price = element('p', 'detail-price', store.formatPrice(product.price));
    content.appendChild(price);
    content.appendChild(element('p', 'detail-original', 'Harga normal ' + store.formatPrice(product.originalPrice)));
    content.appendChild(element('p', 'detail-description-copy', product.description));
    var featureList = element('ul', 'detail-points');
    ['Informasi produk pilihan untuk kebutuhan Anda.', 'Jumlah produk dapat diubah dari keranjang.', 'Pilih tambah ke keranjang atau beli sekarang.'].forEach(function (text) {
      featureList.appendChild(element('li', '', text));
    });
    content.appendChild(featureList);
    var actions = element('div', 'detail-actions');
    var addButton = element('button', 'primary-action', 'Tambah ke keranjang');
    addButton.type = 'button';
    var addIcon = element('i', 'ph ph-shopping-cart-simple');
    addIcon.setAttribute('aria-hidden', 'true');
    addButton.appendChild(document.createTextNode(' '));
    addButton.appendChild(addIcon);
    addButton.addEventListener('click', function () {
      if (!quantityInput.reportValidity()) return;
      try {
        store.add(product.id, Number(quantityInput.value));
        liveStatus.textContent = product.name + ' ditambahkan ke keranjang.';
        addedNotice.hidden = false;
      } catch (error) {
        liveStatus.textContent = 'Produk tidak dapat ditambahkan. Periksa penyimpanan browser lalu coba lagi.';
        console.error('Gagal menambahkan produk ke keranjang.', error);
      }
    });
    var buyNowButton = element('button', 'primary-action buy-now-action', 'Beli sekarang');
    buyNowButton.type = 'button';
    buyNowButton.addEventListener('click', function () {
      if (!quantityInput.reportValidity()) return;
      try {
        store.add(product.id, Number(quantityInput.value));
        window.location.href = 'checkout.html';
      } catch (error) {
        liveStatus.textContent = 'Checkout belum dapat dimulai. Periksa penyimpanan browser lalu coba lagi.';
        console.error('Gagal menyiapkan checkout produk.', error);
      }
    });
    var quantityGroup = element('div', 'quantity-control detail-quantity');
    quantityGroup.setAttribute('aria-label', 'Jumlah produk');
    var quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.max = '99';
    quantityInput.step = '1';
    quantityInput.required = true;
    quantityInput.value = '1';
    quantityInput.setAttribute('aria-label', 'Jumlah ' + product.name);
    var minus = element('button', '', '−');
    minus.type = 'button';
    minus.setAttribute('aria-label', 'Kurangi jumlah');
    minus.addEventListener('click', function () { quantityInput.value = String(Math.max(1, Number(quantityInput.value) - 1)); });
    var plus = element('button', '', '+');
    plus.type = 'button';
    plus.setAttribute('aria-label', 'Tambah jumlah');
    plus.addEventListener('click', function () { quantityInput.value = String(Math.min(99, Number(quantityInput.value) + 1)); });
    quantityGroup.append(minus, quantityInput, plus);
    actions.append(quantityGroup, addButton, buyNowButton);
    content.appendChild(actions);
    var addedNotice = element('p', 'added-notice', 'Produk ditambahkan. ');
    addedNotice.hidden = true;
    var cartLink = element('a', '', 'Lihat keranjang');
    cartLink.href = 'cart.html';
    addedNotice.appendChild(cartLink);
    content.appendChild(addedNotice);

    detail.replaceChildren(imageWrap, content);
    description.replaceChildren(element('h2', '', 'Deskripsi produk'), element('p', '', product.description));

    var relatedProducts = store.getRelatedProducts(product.id, 4);
    if (!relatedProducts.length) {
      related.hidden = true;
      return;
    }
    var relatedHeading = element('div', 'section-heading');
    var relatedTitle = element('h2', '');
    relatedTitle.appendChild(document.createTextNode('Produk lainnya di '));
    relatedTitle.appendChild(element('span', '', store.getCategoryLabel(product.category).toLocaleLowerCase('id')));
    var relatedLink = element('a', 'view-all', 'Lihat kategori ');
    relatedLink.href = 'index.html?category=' + encodeURIComponent(product.category) + '#recommendations';
    var relatedArrow = element('i', 'ph ph-caret-right');
    relatedArrow.setAttribute('aria-hidden', 'true');
    relatedLink.appendChild(relatedArrow);
    relatedHeading.append(relatedTitle, relatedLink);
    var relatedGrid = element('div', 'product-grid related-grid');
    relatedProducts.forEach(function (relatedProduct) {
      relatedGrid.appendChild(store.createProductCard(relatedProduct));
    });
    related.replaceChildren(relatedHeading, relatedGrid);
    related.hidden = false;
  }

  function renderCartPage() {
    var container = document.getElementById('cartPageItems');
    var items = store.getItems();
    var subtotal = items.reduce(function (sum, item) { return sum + item.product.price * item.quantity; }, 0);
    var quantityCount = items.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    document.getElementById('cartItemCount').textContent = quantityCount + (quantityCount === 1 ? ' produk' : ' produk');
    document.getElementById('cartSubtotal').textContent = store.formatPrice(subtotal);
    document.getElementById('cartGrandTotal').textContent = store.formatPrice(subtotal);
    document.getElementById('checkoutLink').setAttribute('aria-disabled', String(!items.length));
    document.getElementById('checkoutLink').tabIndex = items.length ? 0 : -1;
    document.getElementById('checkoutLink').classList.toggle('is-disabled', !items.length);

    if (!items.length) {
      setEmpty(container, 'Keranjang masih kosong', 'Mulai belanja', 'index.html');
      return;
    }

    container.replaceChildren();
    items.forEach(function (item) {
      var product = item.product;
      var row = element('article', 'cart-product');
      var link = element('a', 'cart-product-image');
      link.href = 'product.html?id=' + encodeURIComponent(product.id);
      var image = element('img');
      image.src = product.image;
      image.alt = product.imageAlt;
      image.loading = 'lazy';
      link.appendChild(image);
      var info = element('div', 'cart-product-info');
      var title = element('a', 'cart-product-title', product.name);
      title.href = link.href;
      info.append(title, element('span', 'cart-product-category', store.getCategoryLabel(product.category)));
      var unitPrice = element('strong', 'cart-product-price', store.formatPrice(product.price));
      var controls = element('div', 'cart-product-controls');
      var quantity = element('div', 'quantity-control');
      quantity.setAttribute('aria-label', 'Jumlah ' + product.name);
      var minus = element('button', '', '−');
      minus.type = 'button';
      minus.setAttribute('aria-label', 'Kurangi jumlah ' + product.name);
      minus.disabled = item.quantity <= 1;
      minus.addEventListener('click', function () { store.setQuantity(product.id, item.quantity - 1); renderCartPage(); });
      var value = element('span', 'quantity-value', String(item.quantity));
      var plus = element('button', '', '+');
      plus.type = 'button';
      plus.setAttribute('aria-label', 'Tambah jumlah ' + product.name);
      plus.disabled = item.quantity >= 99;
      plus.addEventListener('click', function () { store.setQuantity(product.id, item.quantity + 1); renderCartPage(); });
      quantity.append(minus, value, plus);
      var remove = element('button', 'remove-item', 'Hapus');
      remove.type = 'button';
      remove.addEventListener('click', function () {
        store.remove(product.id);
        renderCartPage();
        liveStatus.textContent = product.name + ' dihapus dari keranjang.';
      });
      controls.append(quantity, remove);
      var lineTotal = element('strong', 'cart-line-total', store.formatPrice(product.price * item.quantity));
      row.append(link, info, unitPrice, controls, lineTotal);
      container.appendChild(row);
    });
  }

  function renderCheckout() {
    sessionStorage.removeItem('megamart-last-order');
    var items = store.getItems();
    var form = document.getElementById('checkoutForm');
    var layout = document.querySelector('.checkout-layout');
    if (!items.length) {
      layout.replaceChildren();
      setEmpty(layout, 'Keranjang masih kosong', 'Kembali ke katalog', 'index.html');
      return;
    }

    var checkoutItems = document.getElementById('checkoutItems');
    var receipt = document.getElementById('receiptDialog');
    var receiptError = document.getElementById('receiptError');
    var confirmButton = document.getElementById('confirmOrder');

    function renderItems(container, orderItems, rowClass) {
      container.replaceChildren();
      orderItems.forEach(function (item) {
        var line = element('div', rowClass);
        line.append(element('span', '', item.product.name + ' × ' + item.quantity));
        line.append(element('strong', '', store.formatPrice(item.product.price * item.quantity)));
        container.appendChild(line);
      });
    }

    renderItems(checkoutItems, items, 'checkout-item');

    function updateTotals() {
      var subtotal = items.reduce(function (sum, item) { return sum + item.product.price * item.quantity; }, 0);
      var shipping = form.elements.shipping.value === 'express' ? 20000 : 0;
      document.getElementById('checkoutSubtotal').textContent = store.formatPrice(subtotal);
      document.getElementById('shippingCost').textContent = shipping ? store.formatPrice(shipping) : 'Gratis';
      document.getElementById('checkoutTotal').textContent = store.formatPrice(subtotal + shipping);
    }

    form.querySelectorAll('input[name="shipping"]').forEach(function (radio) {
      radio.addEventListener('change', updateTotals);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var error = document.getElementById('checkoutError');
      error.hidden = true;
      if (!form.reportValidity()) return;

      items = store.getItems();
      if (!items.length) {
        error.textContent = 'Keranjang kosong. Tambahkan produk sebelum melanjutkan.';
        error.hidden = false;
        return;
      }
      renderItems(checkoutItems, items, 'checkout-item');
      var subtotal = items.reduce(function (sum, item) { return sum + item.product.price * item.quantity; }, 0);
      var shipping = form.elements.shipping.value === 'express' ? 20000 : 0;
      var receiver = {
        name: form.elements.customerName.value.trim(),
        phone: form.elements.customerPhone.value.trim(),
        address: form.elements.customerAddress.value.trim(),
        city: form.elements.customerCity.value.trim(),
        postal: form.elements.customerPostal.value.trim()
      };
      var shippingMethod = form.elements.shipping.value;
      var paymentMethod = form.elements.payment.value;

      document.getElementById('receiptName').textContent = receiver.name;
      document.getElementById('receiptPhone').textContent = receiver.phone;
      document.getElementById('receiptAddress').textContent = receiver.address;
      document.getElementById('receiptCity').textContent = receiver.city;
      document.getElementById('receiptPostal').textContent = receiver.postal;
      document.getElementById('receiptShippingMethod').textContent = shippingMethod === 'express'
        ? 'Ekspres, estimasi 1-2 hari kerja'
        : 'Reguler, estimasi 2-4 hari kerja';
      document.getElementById('receiptPaymentMethod').textContent = paymentMethod === 'cod'
        ? 'Bayar di tempat'
        : 'Transfer bank';
      renderItems(document.getElementById('receiptItems'), items, 'receipt-item');
      document.getElementById('receiptSubtotal').textContent = store.formatPrice(subtotal);
      document.getElementById('receiptShippingCost').textContent = shipping ? store.formatPrice(shipping) : 'Gratis';
      document.getElementById('receiptTotal').textContent = store.formatPrice(subtotal + shipping);
      receiptError.hidden = true;
      receipt.showModal();
    });

    document.getElementById('editReceipt').addEventListener('click', function () {
      receipt.close();
    });

    confirmButton.addEventListener('click', function () {
      var subtotal = items.reduce(function (sum, item) { return sum + item.product.price * item.quantity; }, 0);
      var shipping = form.elements.shipping.value === 'express' ? 20000 : 0;
      var order = {
        quantity: items.reduce(function (sum, item) { return sum + item.quantity; }, 0),
        total: subtotal + shipping,
        receiver: {
          name: form.elements.customerName.value.trim(),
          phone: form.elements.customerPhone.value.trim(),
          address: form.elements.customerAddress.value.trim(),
          city: form.elements.customerCity.value.trim(),
          postal: form.elements.customerPostal.value.trim()
        },
        shipping: form.elements.shipping.value,
        payment: form.elements.payment.value,
        items: items.map(function (item) {
          return {
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price
          };
        })
      };
      try {
        sessionStorage.setItem('megamart-last-order', JSON.stringify(order));
        store.clear();
        window.location.href = 'order-complete.html';
      } catch (storageError) {
        receiptError.textContent = 'Pesanan belum dapat disimpan. Coba lagi atau periksa pengaturan penyimpanan.';
        receiptError.hidden = false;
        console.error('Gagal mengonfirmasi pesanan.', storageError);
      }
    });

    updateTotals();
  }

  function renderConfirmation() {
    var order;
    try {
      order = JSON.parse(sessionStorage.getItem('megamart-last-order') || 'null');
    } catch (error) {
      console.warn('Ringkasan pesanan tidak dapat dibaca.', error);
      order = null;
    }

    var itemsAreValid = order && Array.isArray(order.items) && order.items.length > 0
      && order.items.every(function (item) {
        var product = item && store.getProduct(item.id);
        return product && item.name === product.name && item.price === product.price
          && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99;
      });
    var itemQuantity = itemsAreValid
      ? order.items.reduce(function (sum, item) { return sum + item.quantity; }, 0)
      : 0;
    var subtotal = itemsAreValid
      ? order.items.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0)
      : 0;
    var shippingMethodIsValid = order && (order.shipping === 'regular' || order.shipping === 'express');
    var paymentMethodIsValid = order && (order.payment === 'transfer' || order.payment === 'cod');
    var receiverIsValid = order && order.receiver
      && ['name', 'phone', 'address', 'city', 'postal'].every(function (key) {
        return typeof order.receiver[key] === 'string' && order.receiver[key].trim().length > 0;
      });
    var shippingCost = order && order.shipping === 'express' ? 20000 : 0;

    if (!itemsAreValid || !shippingMethodIsValid || !paymentMethodIsValid || !receiverIsValid
      || !Number.isInteger(order.quantity) || order.quantity !== itemQuantity
      || !Number.isFinite(order.total) || order.total !== subtotal + shippingCost) {
      var panel = document.querySelector('.confirmation-panel');
      var iconWrap = element('div', 'confirmation-icon');
      var icon = element('i', 'ph ph-info');
      icon.setAttribute('aria-hidden', 'true');
      iconWrap.appendChild(icon);
      panel.replaceChildren(
        iconWrap,
        element('p', 'eyebrow-label', 'Belum ada pesanan'),
        element('h1', '', 'Belum ada pesanan.'),
        element('p', 'confirmation-copy', 'Tambahkan produk ke keranjang terlebih dahulu untuk melanjutkan checkout.')
      );
      var homeLink = element('a', 'primary-action home-action', 'Kembali ke halaman utama');
      homeLink.href = 'index.html';
      panel.appendChild(homeLink);
      return;
    }

    document.getElementById('confirmedItems').textContent = order.quantity + (order.quantity === 1 ? ' produk' : ' produk');
    document.getElementById('confirmedTotal').textContent = store.formatPrice(order.total);
  }

  if (page === 'product') renderProduct();
  if (page === 'cart') {
    renderCartPage();
    window.addEventListener('megamart:cartchange', renderCartPage);
  }
  if (page === 'checkout') renderCheckout();
  if (page === 'complete') renderConfirmation();
})();
