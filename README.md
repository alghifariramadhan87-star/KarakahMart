# KarakahMart

Etalase belanja responsif KarakahMart. Dibangun dengan HTML, CSS, dan JavaScript murni tanpa framework atau build step.

## Struktur

```
portfolio/
├── index.html                 # Etalase toko KarakahMart
├── presentation.html          # Slide demo KarakahMart
│
├── assets/
│   ├── css/main.css           # Token, komponen, dan halaman responsif
│   ├── css/presentation.css   # Gaya slide presentasi demo
│   ├── js/main.js             # Interaksi beranda dan banner
│   ├── js/presentation.js     # Navigasi slide presentasi
│   ├── js/store.js            # Katalog dan keranjang bersama
│   ├── js/shop-pages.js       # Detail produk, keranjang, dan checkout
│   ├── js/auth.js             # Login dan registrasi demo lokal
│   ├── favicon.svg
│   └── banners/               # Varian banner
├── product.html               # Detail produk
├── cart.html                  # Keranjang belanja
├── checkout.html              # Checkout simulasi
├── login.html                 # Masuk dan registrasi akun demo
└── order-complete.html        # Konfirmasi pesanan demo
│
├── design-system/             # Dokumentasi dan library komponen
└── DESIGN.md                  # Spesifikasi design system
```

## Fitur

- Menu delapan pilihan tepat di bawah banner, termasuk semua produk dan tujuh kategori
- 60 produk demo dan 15 rekomendasi acak campuran kategori per halaman, dengan empat halaman dan tombol keranjang yang selalu terlihat
- Pencarian produk dengan pesan hasil yang aksesibel
- Slider promo dengan tombol navigasi dan indikator slide
- Halaman detail produk dengan informasi demo, katalog produk terkait, dan tombol beli sekarang
- Keranjang tersimpan di browser dengan kontrol kuantitas dan hapus produk
- Checkout simulasi dengan validasi alamat, struk pemeriksaan, lalu konfirmasi pesanan
- Halaman masuk dan registrasi demo, opsi ingat saya, dan pemulihan kata sandi lokal; akun tersimpan sebagai JSON di browser
- Logo KarakahMart dengan simbol tas belanja berinisial K dan wordmark biru-navy, digunakan pada header, footer, halaman login, dan favicon (`assets/favicon.svg`)
- Halaman konfirmasi demo dengan tombol kembali ke beranda
- Tema terang KarakahMart yang konsisten di semua halaman dan tidak berubah mengikuti preferensi perangkat
- Navigasi keyboard, skip-link, dan status interaksi untuk pembaca layar

## Struktur kode

Gaya dan interaksi toko dipisahkan ke file CSS dan JavaScript di `assets/`.
Halaman presentasi memakai file khusus di folder yang sama. Tidak ada
dependensi npm untuk menjalankan halaman.

## Demo presentasi

Jalankan server lokal seperti di atas, lalu buka `http://localhost:8000/presentation.html`.
Navigasikan slide dengan tombol layar atau tombol panah kiri/kanan. Tekan `F`
untuk layar penuh, lalu pilih **Mulai demo toko** untuk membuka alur belanja.
Demo singkat yang disarankan: cari produk, buka detail, tambahkan ke keranjang,
ubah jumlah, lalu tinjau checkout dan struk. Konfirmasi akhir hanya membuat
ringkasan simulasi; tidak ada pembayaran atau pesanan yang dikirim.

## Catatan

Harga, katalog, ongkir, dan checkout di halaman ini adalah simulasi. Tidak ada
pesanan, akun, atau pembayaran yang dikirim ke server. Foto produk dimuat dari
Unsplash; produk tambahan memakai foto perwakilan yang dipilih berdasarkan
jenis produk.

Akun demo disimpan di `localStorage` browser dengan format JSON yang memuat
`id`, `name`, `email`, `salt`, `passwordHash`, `iterations`, dan `createdAt`.
Kata sandi tidak disimpan sebagai teks biasa; hash demo dibuat dengan PBKDF2
melalui Web Crypto. Data hanya tersedia di browser/perangkat yang digunakan.
Implementasi ini untuk demo lokal, bukan autentikasi produksi. Jalankan melalui
`http://localhost` agar Web Crypto tersedia.
Pemulihan kata sandi demo memperbarui kata sandi langsung di browser dan tidak
mengirim email. Opsi "Ingat saya" menyimpan sesi sampai pengguna keluar atau
data situs dihapus; tanpa opsi tersebut sesi berakhir saat tab browser ditutup.

## Lisensi

ALFARASSTA