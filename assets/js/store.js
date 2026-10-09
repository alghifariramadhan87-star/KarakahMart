(function () {
  'use strict';

  var products = [
    { id: 'phone-s22-blue', name: 'Galaxy S22 Ultra', category: 'smartphone', price: 3299000, originalPrice: 7499000, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85', imageAlt: 'Smartphone Samsung berwarna biru', description: 'Smartphone untuk produktivitas dan hiburan, dengan layar luas, kamera serbaguna, dan performa andal untuk kegiatan sehari-hari.' },
    { id: 'phone-m13', name: 'Galaxy M13 (4GB | 64GB)', category: 'smartphone', price: 1049000, originalPrice: 1499000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85', imageAlt: 'Smartphone layar sentuh warna hitam', description: 'Pilihan smartphone untuk komunikasi, belajar, dan menikmati hiburan dengan penyimpanan yang cukup untuk aplikasi dan foto.' },
    { id: 'phone-m33', name: 'Galaxy M33 (4GB | 64GB)', category: 'smartphone', price: 1699000, originalPrice: 2499000, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85', imageAlt: 'Smartphone dengan layar warna-warni', description: 'Ponsel serbaguna dengan ruang penyimpanan praktis untuk aplikasi favorit dan kebutuhan harian.' },
    { id: 'phone-m53', name: 'Galaxy M53 (4GB | 64GB)', category: 'smartphone', price: 3199000, originalPrice: 4099000, image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=85', imageAlt: 'Smartphone modern warna biru muda', description: 'Nikmati layar luas dan kamera serbaguna pada smartphone yang siap menemani aktivitas harian.' },
    { id: 'phone-s22-green', name: 'Galaxy S22 Ultra Hijau', category: 'smartphone', price: 6799000, originalPrice: 8599000, image: 'https://images.unsplash.com/photo-1678958274412-563119ec18ab?auto=format&fit=crop&w=900&q=85', imageAlt: 'Dua smartphone berwarna hijau', description: 'Smartphone premium dengan desain elegan, cocok untuk bekerja, berkomunikasi, dan menikmati konten.' },
    { id: 'daily-basket', name: 'Paket kebutuhan harian', category: 'grocery', price: 99000, originalPrice: 149000, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80', imageAlt: 'Keranjang berisi buah dan bahan makanan', description: 'Paket bahan makanan pilihan untuk melengkapi kebutuhan dapur sehari-hari.' },
    { id: 'fresh-vegetables', name: 'Sayuran segar', category: 'grocery', price: 35000, originalPrice: 52000, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80', imageAlt: 'Aneka sayuran segar', description: 'Pilihan sayuran segar untuk menemani menu masakan di rumah.' },
    { id: 'fresh-fruit', name: 'Buah pilihan', category: 'grocery', price: 45000, originalPrice: 69000, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80', imageAlt: 'Aneka buah segar warna-warni', description: 'Campuran buah pilihan yang cocok untuk camilan segar bersama keluarga.' },
    { id: 'strawberries', name: 'Stroberi segar', category: 'grocery', price: 39000, originalPrice: 59000, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=80', imageAlt: 'Buah stroberi segar', description: 'Stroberi segar dengan rasa manis dan sedikit asam, cocok dinikmati langsung atau sebagai pelengkap hidangan.' },
    { id: 'mango', name: 'Mangga matang', category: 'grocery', price: 28000, originalPrice: 42000, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=80', imageAlt: 'Mangga matang yang siap disantap', description: 'Mangga matang dengan daging buah lembut, nikmat untuk camilan maupun minuman segar.' },
    { id: 'cherries', name: 'Ceri merah', category: 'grocery', price: 52000, originalPrice: 78000, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=700&q=80', imageAlt: 'Buah ceri merah', description: 'Ceri merah untuk camilan segar dan sajian penutup favorit.' },
    { id: 'beauty-cleanser', name: 'Pembersih wajah lembut', category: 'beauty', price: 68000, originalPrice: 89000, image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80', imageAlt: 'Produk perawatan wajah dalam kemasan botol', description: 'Pembersih wajah untuk melengkapi rutinitas perawatan harian.' },
    { id: 'beauty-serum', name: 'Serum wajah harian', category: 'beauty', price: 115000, originalPrice: 149000, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80', imageAlt: 'Botol serum perawatan kulit', description: 'Serum wajah untuk melengkapi perawatan kulit sehari-hari.' },
    { id: 'beauty-moisturizer', name: 'Pelembap wajah', category: 'beauty', price: 79000, originalPrice: 105000, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=80', imageAlt: 'Pelembap wajah dalam kemasan', description: 'Pelembap untuk rutinitas perawatan wajah sehari-hari.' },
    { id: 'beauty-sunscreen', name: 'Tabir surya ringan', category: 'beauty', price: 92000, originalPrice: 119000, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80', imageAlt: 'Produk tabir surya untuk perawatan kulit', description: 'Tabir surya untuk melengkapi rutinitas perawatan saat beraktivitas.' },
    { id: 'electronics-headphones', name: 'Headphone nirkabel', category: 'electronics', price: 349000, originalPrice: 499000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80', imageAlt: 'Headphone nirkabel berwarna hitam', description: 'Headphone nirkabel untuk mendengarkan musik dan mengikuti panggilan.' },
    { id: 'electronics-speaker', name: 'Speaker Bluetooth mini', category: 'electronics', price: 219000, originalPrice: 299000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80', imageAlt: 'Speaker Bluetooth portabel', description: 'Speaker Bluetooth ringkas untuk menemani aktivitas di rumah.' },
    { id: 'electronics-camera', name: 'Kamera digital ringkas', category: 'electronics', price: 1899000, originalPrice: 2399000, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80', imageAlt: 'Kamera digital dengan lensa', description: 'Kamera digital ringkas untuk mengabadikan momen sehari-hari.' },
    { id: 'electronics-keyboard', name: 'Keyboard nirkabel', category: 'electronics', price: 279000, originalPrice: 359000, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80', imageAlt: 'Keyboard komputer berwarna hitam', description: 'Keyboard nirkabel untuk melengkapi meja kerja atau belajar.' },
    { id: 'home-lamp', name: 'Lampu meja minimalis', category: 'home', price: 185000, originalPrice: 249000, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80', imageAlt: 'Lampu meja minimalis di atas meja', description: 'Lampu meja untuk memberi penerangan tambahan di ruang kerja atau kamar.' },
    { id: 'home-cushion', name: 'Bantal sofa lembut', category: 'home', price: 99000, originalPrice: 139000, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80', imageAlt: 'Bantal dekoratif untuk sofa', description: 'Bantal dekoratif untuk menambah kenyamanan ruang keluarga.' },
    { id: 'home-storage', name: 'Keranjang penyimpanan', category: 'home', price: 75000, originalPrice: 105000, image: 'https://images.unsplash.com/photo-1700929977038-c359b55ea1e1?auto=format&fit=crop&w=700&q=80', imageAlt: 'Keranjang penyimpanan di dekat pintu rumah', description: 'Keranjang praktis untuk merapikan barang-barang di rumah.' },
    { id: 'home-vase', name: 'Vas dekorasi ruang', category: 'home', price: 125000, originalPrice: 169000, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80', imageAlt: 'Vas dekoratif untuk ruangan', description: 'Vas dekoratif untuk melengkapi tampilan meja atau rak.' },
    { id: 'watch-classic', name: 'Jam tangan klasik', category: 'watch', price: 425000, originalPrice: 599000, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80', imageAlt: 'Jam tangan klasik dengan tali kulit', description: 'Jam tangan bergaya klasik untuk melengkapi penampilan harian.' },
    { id: 'watch-sport', name: 'Jam tangan sport', category: 'watch', price: 319000, originalPrice: 449000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80', imageAlt: 'Jam tangan dengan desain modern', description: 'Jam tangan bergaya kasual untuk aktivitas sehari-hari.' },
    { id: 'watch-digital', name: 'Jam tangan digital', category: 'watch', price: 275000, originalPrice: 369000, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=80', imageAlt: 'Jam tangan digital berwarna gelap', description: 'Jam tangan digital dengan tampilan waktu yang mudah dibaca.' },
    { id: 'watch-metal', name: 'Jam tangan tali metal', category: 'watch', price: 589000, originalPrice: 749000, image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=700&q=80', imageAlt: 'Jam tangan dengan tali logam', description: 'Jam tangan tali metal dengan tampilan rapi untuk berbagai kesempatan.' },
    { id: 'accessory-backpack', name: 'Tas ransel harian', category: 'accessories', price: 289000, originalPrice: 389000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80', imageAlt: 'Tas ransel untuk penggunaan sehari-hari', description: 'Tas ransel untuk membawa barang penting saat beraktivitas.' },
    { id: 'accessory-wallet', name: 'Dompet lipat', category: 'accessories', price: 99000, originalPrice: 139000, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80', imageAlt: 'Dompet lipat berwarna gelap', description: 'Dompet ringkas untuk menyimpan kartu dan uang tunai.' },
    { id: 'accessory-sunglasses', name: 'Kacamata gaya', category: 'accessories', price: 159000, originalPrice: 219000, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80', imageAlt: 'Kacamata hitam dengan bingkai modern', description: 'Kacamata bergaya sederhana untuk melengkapi penampilan.' },
    { id: 'accessory-tote', name: 'Tas tote kanvas', category: 'accessories', price: 85000, originalPrice: 119000, image: 'https://images.unsplash.com/photo-1618249807726-2f381c277de1?auto=format&fit=crop&w=700&q=80', imageAlt: 'Tas tote berbahan kanvas', description: 'Tas tote praktis untuk membawa barang saat bepergian.' }
  ];
  var additionalProducts = [
    { id: 'phone-a35', name: 'Galaxy A35 5G', category: 'smartphone', price: 4299000, originalPrice: 4999000, imageAlt: 'Smartphone layar sentuh untuk pemakaian harian', description: 'Smartphone serbaguna untuk komunikasi, hiburan, dan aktivitas harian.' },
    { id: 'phone-redmi-note', name: 'Redmi Note 13', category: 'smartphone', price: 2799000, originalPrice: 3299000, imageAlt: 'Smartphone modern dengan layar lebar', description: 'Smartphone dengan layar lebar untuk menikmati konten dan menjalankan aplikasi harian.' },
    { id: 'phone-oppo-a', name: 'OPPO A78', category: 'smartphone', price: 2399000, originalPrice: 2899000, imageAlt: 'Smartphone untuk komunikasi dan hiburan', description: 'Ponsel praktis untuk komunikasi, foto, dan hiburan sehari-hari.' },
    { id: 'phone-vivo-y', name: 'vivo Y27', category: 'smartphone', price: 1899000, originalPrice: 2299000, imageAlt: 'Smartphone dengan desain ramping', description: 'Smartphone untuk mendukung kegiatan harian dengan desain yang nyaman digunakan.' },
    { id: 'grocery-rice', name: 'Beras pilihan 5 kg', category: 'grocery', price: 72000, originalPrice: 85000, imageAlt: 'Bahan pangan untuk kebutuhan rumah tangga', description: 'Beras pilihan untuk melengkapi persediaan bahan pangan keluarga.' },
    { id: 'grocery-cooking-oil', name: 'Minyak goreng 2 L', category: 'grocery', price: 36000, originalPrice: 42000, imageAlt: 'Kebutuhan bahan masak sehari-hari', description: 'Minyak goreng untuk berbagai kebutuhan memasak di rumah.' },
    { id: 'grocery-eggs', name: 'Telur ayam 1 kg', category: 'grocery', price: 31000, originalPrice: 37000, imageAlt: 'Bahan makanan segar untuk keluarga', description: 'Telur ayam untuk pelengkap menu harian keluarga.' },
    { id: 'beauty-toner', name: 'Toner wajah ringan', category: 'beauty', price: 74000, originalPrice: 92000, imageAlt: 'Produk perawatan wajah dalam botol', description: 'Toner untuk melengkapi rutinitas perawatan wajah sehari-hari.' },
    { id: 'beauty-mask', name: 'Masker wajah lembut', category: 'beauty', price: 49000, originalPrice: 65000, imageAlt: 'Produk masker untuk perawatan wajah', description: 'Masker wajah praktis untuk perawatan kulit di rumah.' },
    { id: 'beauty-lip-balm', name: 'Pelembap bibir', category: 'beauty', price: 32000, originalPrice: 42000, imageAlt: 'Produk perawatan bibir ukuran praktis', description: 'Pelembap bibir berukuran praktis untuk digunakan kapan saja.' },
    { id: 'beauty-body-lotion', name: 'Losion tubuh harian', category: 'beauty', price: 57000, originalPrice: 72000, imageAlt: 'Losion tubuh dalam kemasan botol', description: 'Losion tubuh untuk melengkapi perawatan kulit harian.' },
    { id: 'beauty-shampoo', name: 'Sampo perawatan rambut', category: 'beauty', price: 46000, originalPrice: 59000, imageAlt: 'Produk perawatan rambut dalam botol', description: 'Sampo untuk kebutuhan perawatan rambut sehari-hari.' },
    { id: 'electronics-mouse', name: 'Mouse nirkabel', category: 'electronics', price: 89000, originalPrice: 125000, imageAlt: 'Aksesori komputer untuk meja kerja', description: 'Mouse nirkabel untuk melengkapi perangkat kerja atau belajar.' },
    { id: 'electronics-powerbank', name: 'Power bank 10.000 mAh', category: 'electronics', price: 229000, originalPrice: 299000, imageAlt: 'Perangkat pengisi daya portabel', description: 'Pengisi daya portabel untuk membantu menjaga perangkat tetap aktif saat bepergian.' },
    { id: 'electronics-earbuds', name: 'Earbuds Bluetooth', category: 'electronics', price: 189000, originalPrice: 249000, imageAlt: 'Perangkat audio nirkabel berukuran kecil', description: 'Earbuds nirkabel untuk mendengarkan audio dan menerima panggilan.' },
    { id: 'electronics-monitor', name: 'Monitor kerja 22 inci', category: 'electronics', price: 1499000, originalPrice: 1799000, imageAlt: 'Perangkat elektronik untuk meja kerja', description: 'Monitor untuk mendukung aktivitas kerja dan belajar di meja.' },
    { id: 'electronics-router', name: 'Router Wi-Fi rumah', category: 'electronics', price: 319000, originalPrice: 399000, imageAlt: 'Perangkat jaringan untuk penggunaan rumah', description: 'Router untuk menghubungkan perangkat ke jaringan internet di rumah.' },
    { id: 'home-organizer', name: 'Kotak penyimpanan serbaguna', category: 'home', price: 59000, originalPrice: 79000, imageAlt: 'Perlengkapan penyimpanan untuk rumah', description: 'Kotak penyimpanan untuk membantu merapikan barang di rumah.' },
    { id: 'home-clock', name: 'Jam dinding sederhana', category: 'home', price: 89000, originalPrice: 119000, imageAlt: 'Dekorasi jam untuk dinding rumah', description: 'Jam dinding dengan tampilan sederhana untuk ruang keluarga.' },
    { id: 'home-mug', name: 'Set cangkir keramik', category: 'home', price: 115000, originalPrice: 149000, imageAlt: 'Perlengkapan minum untuk rumah', description: 'Set cangkir keramik untuk melengkapi perlengkapan minum di rumah.' },
    { id: 'home-bed-linen', name: 'Sprei nyaman', category: 'home', price: 179000, originalPrice: 229000, imageAlt: 'Perlengkapan kamar tidur untuk rumah', description: 'Sprei untuk melengkapi kebutuhan kamar tidur.' },
    { id: 'home-desk', name: 'Rak meja serbaguna', category: 'home', price: 99000, originalPrice: 135000, imageAlt: 'Rak kecil untuk meja di rumah', description: 'Rak meja untuk menyimpan barang kecil agar lebih mudah dijangkau.' },
    { id: 'watch-smart', name: 'Smartwatch harian', category: 'watch', price: 499000, originalPrice: 649000, imageAlt: 'Jam pintar untuk aktivitas harian', description: 'Jam pintar untuk melihat waktu dan memantau aktivitas harian.' },
    { id: 'watch-sport-band', name: 'Jam sport digital', category: 'watch', price: 239000, originalPrice: 319000, imageAlt: 'Jam digital bergaya sport', description: 'Jam digital bergaya sport untuk menemani kegiatan sehari-hari.' },
    { id: 'watch-minimal', name: 'Jam tangan minimalis', category: 'watch', price: 359000, originalPrice: 469000, imageAlt: 'Jam tangan dengan tampilan sederhana', description: 'Jam tangan dengan desain sederhana untuk berbagai kesempatan.' },
    { id: 'watch-leather', name: 'Jam tali kulit klasik', category: 'watch', price: 449000, originalPrice: 589000, imageAlt: 'Jam tangan klasik dengan tali kulit', description: 'Jam tangan bergaya klasik dengan tali kulit untuk pemakaian harian.' },
    { id: 'accessory-cardholder', name: 'Tempat kartu ringkas', category: 'accessories', price: 49000, originalPrice: 69000, imageAlt: 'Aksesori kecil untuk menyimpan kartu', description: 'Tempat kartu ringkas untuk menyimpan kartu penting.' },
    { id: 'accessory-cap', name: 'Topi kasual', category: 'accessories', price: 79000, originalPrice: 109000, imageAlt: 'Aksesori topi untuk penggunaan harian', description: 'Topi kasual untuk melengkapi penampilan sehari-hari.' },
    { id: 'grocery-milk', name: 'Susu UHT 1 L', category: 'grocery', price: 18500, originalPrice: 22000, imageAlt: 'Produk kebutuhan pangan untuk keluarga', description: 'Susu UHT untuk melengkapi pilihan minuman dan kebutuhan dapur.' }
  ];

  var additionalProductAssets = {
    'phone-a35': {
      image: 'https://images.unsplash.com/photo-1707438095940-1eee18e85400?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Smartphone dalam beberapa pilihan warna'
    },
    'phone-redmi-note': {
      image: 'https://images.unsplash.com/photo-1756575433582-130db85552a4?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Smartphone Xiaomi yang sedang digunakan'
    },
    'phone-oppo-a': {
      image: 'https://images.unsplash.com/photo-1699796990081-f8eade0b84d9?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Beberapa smartphone OPPO'
    },
    'phone-vivo-y': {
      image: 'https://images.unsplash.com/photo-1755318535396-cdb062dc60bd?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Smartphone vivo berwarna putih'
    },
    'grocery-rice': {
      image: 'https://images.unsplash.com/photo-1704916029292-ec7b5976204c?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Semangkuk beras putih'
    },
    'grocery-cooking-oil': {
      image: 'https://images.unsplash.com/photo-1552592074-ea7a91b851b3?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Botol minyak untuk memasak'
    },
    'grocery-eggs': {
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Telur ayam dalam wadah karton'
    },
    'beauty-toner': {
      image: 'https://images.unsplash.com/photo-1599847987657-881f11b92a75?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Perawatan wajah dengan semprotan toner'
    },
    'beauty-mask': {
      image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Masker lembar dan produk perawatan wajah'
    },
    'beauty-lip-balm': {
      image: 'https://images.unsplash.com/photo-1771232217622-5f267b1f46df?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Pelembap bibir bersama krim perawatan tangan'
    },
    'beauty-body-lotion': {
      image: 'https://images.unsplash.com/photo-1703174323653-0455deaf7f11?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Losion tubuh dalam kemasan tube'
    },
    'beauty-shampoo': {
      image: 'https://images.unsplash.com/photo-1701992678972-d5a053ad0fb0?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Botol sampo pada latar putih'
    },
    'electronics-mouse': {
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Mouse komputer nirkabel'
    },
    'electronics-powerbank': {
      image: 'https://images.unsplash.com/photo-1566554738544-d962991c3fee?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Power bank portabel di samping smartphone'
    },
    'electronics-earbuds': {
      image: 'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Earbuds putih bersama wadah pengisi daya'
    },
    'electronics-monitor': {
      image: 'https://images.unsplash.com/photo-1547658718-1cdaa0852790?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Monitor komputer layar datar'
    },
    'electronics-router': {
      image: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Router Wi-Fi dengan beberapa lampu indikator'
    },
    'home-organizer': {
      image: 'https://images.unsplash.com/photo-1659729752087-98d8fef7b50c?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Kotak penyimpanan abu-abu berjajar'
    },
    'home-clock': {
      image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Jam dinding analog bulat'
    },
    'home-mug': {
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Cangkir keramik putih'
    },
    'home-bed-linen': {
      image: 'https://images.unsplash.com/photo-1598535746036-87d13382f6a6?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Seprai dan tekstil putih di atas tempat tidur'
    },
    'home-desk': {
      image: 'https://images.unsplash.com/photo-1658835618313-9d425e9ca7de?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Rak meja dengan tanaman hias'
    },
    'watch-smart': {
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Jam pintar dengan tali hitam'
    },
    'watch-sport-band': {
      image: 'https://images.unsplash.com/photo-1599318110381-64cf912a8f54?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Jam digital sport berwarna hitam'
    },
    'watch-minimal': {
      image: 'https://images.unsplash.com/photo-1616928231359-fc8b7e244c3b?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Jam analog minimalis dengan tali kulit'
    },
    'watch-leather': {
      image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Jam tangan dengan tali kulit cokelat'
    },
    'accessory-cardholder': {
      image: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Dompet kulit cokelat untuk kartu dan uang'
    },
    'accessory-cap': {
      image: 'https://images.unsplash.com/photo-1519079754742-f83afaef6d35?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Topi kasual hitam'
    },
    'grocery-milk': {
      image: 'https://images.unsplash.com/photo-1553301803-768cd4a59b9c?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Kemasan karton susu'
    }
  };

  additionalProducts.forEach(function (product) {
    var imageSource = additionalProductAssets[product.id];
    if (!imageSource) throw new Error('Sumber gambar tidak ditemukan untuk produk ' + product.id + '.');
    products.push(Object.assign({}, product, {
      image: imageSource.image,
      imageAlt: imageSource.imageAlt
    }));
  });

  var categories = [
    { id: 'smartphones', key: 'smartphone', label: 'Smartphone' },
    { id: 'beauty', key: 'beauty', label: 'Kecantikan' },
    { id: 'electronics', key: 'electronics', label: 'Elektronik' },
    { id: 'home', key: 'home', label: 'Rumah tangga' },
    { id: 'watches', key: 'watch', label: 'Jam tangan' },
    { id: 'essentials', key: 'grocery', label: 'Groceries' },
    { id: 'accessories', key: 'accessories', label: 'Aksesori' }
  ];
  var storageKey = 'megamart-cart';

  function readCart() {
    try {
      var parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (entry) {
        return entry && products.some(function (product) { return product.id === entry.id; })
          && Number.isInteger(entry.quantity) && entry.quantity > 0 && entry.quantity <= 99;
      }).map(function (entry) { return { id: entry.id, quantity: entry.quantity }; });
    } catch (error) {
      console.warn('Data keranjang tidak dapat dibaca dan akan dimulai ulang.', error);
      return [];
    }
  }

  function writeCart(cart) {
    localStorage.setItem(storageKey, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('megamart:cartchange'));
  }

  function setQuantity(id, quantity) {
    if (!products.some(function (product) { return product.id === id; })) {
      throw new Error('Produk tidak dikenal.');
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new RangeError('Jumlah produk harus berupa bilangan bulat nol atau lebih.');
    }
    var cart = readCart().filter(function (item) { return item.id !== id; });
    if (quantity > 0) cart.push({ id: id, quantity: Math.min(99, quantity) });
    writeCart(cart);
    return cart;
  }

  function add(id, quantity) {
    if (quantity === undefined) quantity = 1;
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new RangeError('Jumlah produk yang ditambahkan harus berupa bilangan bulat positif.');
    }
    var item = readCart().find(function (entry) { return entry.id === id; });
    return setQuantity(id, (item ? item.quantity : 0) + quantity);
  }

  function remove(id) {
    writeCart(readCart().filter(function (item) { return item.id !== id; }));
  }

  function clear() {
    writeCart([]);
  }

  function getItems() {
    return readCart().map(function (item) {
      var product = products.find(function (entry) { return entry.id === item.id; });
      return { product: product, quantity: item.quantity };
    });
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  }

  function getCategoryLabel(key) {
    var category = categories.find(function (entry) { return entry.key === key; });
    return category ? category.label : 'Produk';
  }

  function getProductsByCategory(key) {
    return products.filter(function (product) { return product.category === key; });
  }

  function getRelatedProducts(productId, limit) {
    var product = products.find(function (entry) { return entry.id === productId; });
    if (!product) return [];
    return getProductsByCategory(product.category)
      .filter(function (entry) { return entry.id !== productId; })
      .slice(0, limit || 4);
  }

  function createProductCard(product) {
    var card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    card.dataset.category = product.category;
    card.dataset.name = product.name;

    var productHref = 'product.html?id=' + encodeURIComponent(product.id);
    var imageLink = document.createElement('a');
    imageLink.className = 'product-image';
    imageLink.href = productHref;
    imageLink.setAttribute('aria-label', 'Lihat detail ' + product.name);
    var image = document.createElement('img');
    image.src = product.image;
    image.alt = product.imageAlt;
    image.loading = 'lazy';
    var discount = document.createElement('span');
    discount.className = 'discount';
    discount.innerHTML = Math.round((1 - product.price / product.originalPrice) * 100) + '%<br>OFF';
    imageLink.append(image, discount);

    var info = document.createElement('div');
    info.className = 'product-info';
    var title = document.createElement('h3');
    var titleLink = document.createElement('a');
    titleLink.href = productHref;
    titleLink.textContent = product.name;
    title.appendChild(titleLink);
    var price = document.createElement('p');
    price.className = 'price';
    price.append(document.createTextNode(formatPrice(product.price) + ' '));
    var originalPrice = document.createElement('del');
    originalPrice.textContent = formatPrice(product.originalPrice);
    price.appendChild(originalPrice);
    var saving = document.createElement('p');
    saving.className = 'saving';
    saving.textContent = 'Hemat ' + formatPrice(product.originalPrice - product.price);
    var addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.type = 'button';
    addButton.dataset.productId = product.id;
    addButton.dataset.cartBound = '';
    addButton.textContent = 'Tambah ke keranjang';
    addButton.addEventListener('click', function () {
      try {
        add(product.id, 1);
        var status = document.getElementById('liveStatus');
        if (status) status.textContent = product.name + ' ditambahkan ke keranjang.';
      } catch (error) {
        var liveStatus = document.getElementById('liveStatus');
        if (liveStatus) liveStatus.textContent = 'Produk tidak dapat ditambahkan. Periksa penyimpanan browser lalu coba lagi.';
        console.error('Gagal menambahkan produk ke keranjang.', error);
      }
    });
    info.append(title, price, saving, addButton);
    card.append(imageLink, info);
    return card;
  }

  function syncCartBadges() {
    var quantity = readCart().reduce(function (sum, item) { return sum + item.quantity; }, 0);
    document.querySelectorAll('[data-cart-count]').forEach(function (badge) {
      badge.textContent = String(quantity);
      badge.setAttribute('aria-label', quantity + ' produk di keranjang');
    });
  }

  window.MegaMartStore = {
    products: products,
    categories: categories,
    getProduct: function (id) { return products.find(function (product) { return product.id === id; }); },
    getCategoryLabel: getCategoryLabel,
    getProductsByCategory: getProductsByCategory,
    getRelatedProducts: getRelatedProducts,
    createProductCard: createProductCard,
    readCart: readCart,
    getItems: getItems,
    setQuantity: setQuantity,
    add: add,
    remove: remove,
    clear: clear,
    formatPrice: formatPrice,
    syncCartBadges: syncCartBadges
  };

  syncCartBadges();
  window.addEventListener('storage', syncCartBadges);
  window.addEventListener('megamart:cartchange', syncCartBadges);
})();
