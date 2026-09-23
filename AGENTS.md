# Global Project Rules

### Prioritas
* Kejelasan kode > kepintaran kode.
* Konsistensi dengan project yang sudah ada > preferensi pribadi agent.
* Fungsional, stabil, dan aman > cepat selesai.
* Perubahan terarah (*surgical edits*) > merombak file secara masal.

### Komunikasi & Kontrol Eksekusi
* Jelaskan keputusan teknis penting secara singkat (kenapa pilih approach X, bukan Y) saat berdampak signifikan — tidak perlu untuk perubahan kecil/trivial.
* Kalau menemukan bug atau code smell di luar scope task saat bekerja, laporkan saja tapi jangan otomatis diperbaiki kecuali diminta.
* Kalau task ternyata butuh keputusan arsitektur besar (ganti library utama, restrukturisasi folder, rombak skema database), berhenti dan tanya dulu sebelum eksekusi.
* **Perintah Terminal:** Dilarang mengeksekusi perintah yang bersifat destruktif atau mengubah riwayat/remote (misal: `git push`, `git reset --hard`, drop database/tabel, penghapusan file masal) tanpa konfirmasi eksplisit dari user.
* **Pesan Git:** Jika diminta melakukan commit, wajib gunakan format *Conventional Commits* (misal: `feat: ...`, `fix: ...`, `refactor: ...`). Dilarang menggunakan pesan ambigu seperti "update" atau "fix bug".

### Scope Kerja & Arsitektur
* Kerjakan sesuai apa yang diminta plus hal-hal yang jelas dibutuhkan agar fitur berfungsi utuh (state kosong, error state, loading state) tanpa menambah fitur sampingan yang tidak diminta.
* **Maksimalkan Library yang Ada:** Utamakan fungsi bawaan (*native*) atau paket yang sudah terpasang di proyek. Dilarang menambah dependensi/package baru (`npm install`, `composer require`, dll.) tanpa izin.
* **Integritas Kode:** Lakukan perubahan secara bedah (*surgical change*) pada baris/fungsi yang relevan saja. Jangan menulis ulang file besar secara utuh tanpa alasan kuat, dan dilarang menggunakan *placeholder* malas (seperti `// ... rest of the code remains the same ...`) saat memperbarui file.
* **Struktur UI/Frontend:** Terapkan *Separation of Concerns*. Pisahkan logika bisnis/API dari tampilan (UI). Buat elemen UI menjadi komponen *reusable* jika berpotensi dipakai berulang, jangan di-*hardcode* menjadi satu file panjang.
* Kalau ada beberapa cara valid mengerjakan sesuatu, pilih yang paling konsisten dengan pola yang sudah dipakai di project.

### Kualitas, Keamanan & Database
* Validasi input di boundary (form, API request, URL params) — jangan percaya data dari luar begitu saja.
* Jangan hardcode secret/API key/token di kode — selalu gunakan environment variable.
* Perhatikan performa untuk operasi berat (list besar, query berulang, re-render tidak perlu), tapi jangan micro-optimize prematur di kode yang belum jadi bottleneck.
* **Database & ORM:** Prioritaskan penggunaan ORM / Query Builder bawaan framework daripada *raw SQL*, kecuali untuk query laporan yang sangat spesifik/kompleks. Selalu waspadai *N+1 query problem* dengan menggunakan *eager loading* saat mengambil data berelasi.

### Definisi "Selesai"
Sebuah task dianggap selesai kalau:

- [ ] Kode berjalan fungsional tanpa runtime/logic error yang diketahui
- [ ] Lolos verifikasi build, type-check, atau linter proyek tanpa menghasilkan error/warning baru
- [ ] Tidak merusak fungsi atau file lain yang sudah berjalan sebelumnya (anti-regresi)
- [ ] Mengikuti konvensi project (naming, struktur folder, code style)
- [ ] Edge case dasar (data kosong, error network/input, loading state) sudah ditangani
- [ ] Tidak ada kode sisa debug (`console.log`, `var_dump`, komentar "TODO" yang tak dijelaskan)
- [ ] Tidak ada baris kode yang hilang akibat terpotong *placeholder*
- [ ] Perubahan sudah dijelaskan singkat ke user, termasuk jika ada hal yang belum sempurna