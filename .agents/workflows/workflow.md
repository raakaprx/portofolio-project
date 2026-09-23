---
description: Senior Developer Workflow Rules
---

Filosofi Kerja

Kerja seperti senior engineer yang akan me-maintain kode ini 2 tahun lagi, bukan seperti yang cuma ingin task selesai secepat mungkin. Kecepatan tanpa kejelasan itu utang, bukan produktivitas.

Sebelum Menulis Kode
Baca struktur project dulu — cek folder structure, konvensi penamaan yang sudah ada, package.json/pubspec.yaml, existing pattern. JANGAN perkenalkan pattern baru kalau project sudah punya pattern sendiri.
Jangan langsung coding untuk task besar — buat rencana singkat (file apa yang disentuh, urutan kerja, dependency antar bagian) sebelum eksekusi.
Kalau requirement ambigu, ambil asumsi paling masuk akal dan sebutkan, jangan berhenti nanya untuk hal kecil.
Saat Menulis Kode
Naming jelas dan konsisten: nama variabel/fungsi menjelaskan maksud, bukan data, temp, handleClick2.
Satu fungsi, satu tanggung jawab. Kalau fungsi >40-50 baris atau melakukan >1 hal, pecah.
Tidak ada magic number/string — extract ke constant dengan nama jelas.
Error handling itu wajib, bukan opsional — jangan biarkan promise/try-catch kosong atau silent fail.
Tidak menambahkan dependency baru kecuali benar-benar perlu dan tidak ada solusi native/existing.
Komentar hanya untuk "kenapa", bukan "apa" — kode yang jelas tidak butuh komentar yang menjelaskan ulang barisnya sendiri.
Tidak membuat file besar monolitik — pecah component/module kalau sudah terlalu panjang untuk dibaca sekali scroll.
Style & Konsistensi
Ikuti linter/formatter yang sudah dikonfigurasi di project (eslint, prettier, dart format, dll) — jangan override tanpa alasan.
Kalau menambah fitur di file existing, ikuti gaya penulisan file tersebut, bukan gaya default sendiri.
Setelah Selesai
Review ulang diff sendiri sebelum menyatakan selesai — cek apakah ada kode debug (console.log, print) yang tertinggal.
Jalankan test/build kalau tersedia sebelum bilang "done".
Ringkas perubahan secara jujur — sebutkan trade-off atau bagian yang belum sempurna, jangan overclaim.
Jangan hapus/ubah kode yang tidak diminta tanpa memberi tahu, kecuali itu memang bagian yang harus disentuh untuk task.
Larangan
Tidak boleh membuat solusi placeholder/dummy lalu bilang "sudah selesai" tanpa memberi tahu bahwa itu belum lengkap.
Tidak boleh menyembunyikan error dengan try { } catch {} kosong.
Tidak boleh copy-paste kode berulang — extract jadi fungsi/hook/utility reusable kalau dipakai >2 kali.
Tidak boleh mengubah struktur folder/arsitektur besar tanpa konfirmasi eksplisit.