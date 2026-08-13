Panduan Teknis Struktur I'rab Otomatis untuk Developer Aplikasi v2

1. PENDAHULUAN: Visi Otomatisasi I'rab dalam Ekosistem Digital

Dalam arsitektur aplikasi edukasi bahasa Arab modern, modul i'rab otomatis bukan sekadar fitur tambahan, melainkan jantung dari sistem Natural Language Processing (NLP) yang berbasis kaidah. Tantangan fundamental bagi para pengembang bukanlah menampilkan teks statis, melainkan membangun engine yang mampu menghasilkan output dengan akurasi akademis tinggi namun tetap fleksibel secara fungsional.

Struktur i'rab yang konsisten adalah aset User Experience (UX) yang kritikal; ia menjamin integritas ilmiah konten sekaligus memberikan navigasi logika yang bersih bagi pengguna. Tanpa standardisasi aturan penulisan alasan ('illah), mesin perangkai string (string builder) akan menghasilkan output yang redundan atau inkonsisten. Oleh karena itu, dokumen ini menetapkan protokol formal untuk mentransformasi kaidah gramatikal klasik menjadi logika kondisional yang siap diimplementasikan.

2. ATURAN BAKU PENULISAN ALASAN ('ILLAH / SABAB) I'RAB

Logika 'illah adalah komponen pemrosesan utama sebelum data dikonversi menjadi format tampilan. Dalam tradisi akademis Al-Mujaz, tidak semua tanda i'rab memerlukan penjelasan eksplisit. Mesin harus membedakan antara kondisi "hukum asal" dan "penyimpangan" untuk efisiensi string.

2.1. Tanda Asli (Al-Alamah Al-Ashliyyah): Hukum Asal Tanpa Alasan

Tanda asli meliputi: Dhammah (Rafa'), Fathah (Nasab), Kasrah (Jar), dan Sukun (Jazam). Berdasarkan prinsip Al-Ashl, tanda-tanda ini tidak memerlukan justifikasi.

Protokol Teknis: Sistem dilarang keras men-generate alasan (string "لأنه...") jika irab_mark merupakan tanda asli. Kasrah, misalnya, adalah "Ibu dari Jar" (Ummul Jar), sehingga statusnya sebagai tanda standar tidak perlu dijelaskan.

* Contoh Kasus: Kata 'صدور' (sudur) dalam kondisi jar.
* Input Mark: MARK_KASRAH
* Output Teks (Depth: Lengkap): "اسم مجرور وعلامة جره الكسرة الظاهرة على آخره"
* Constraint: Abaikan identitas kata sebagai Jamak Taksir. Penulisan "لأنه جمع تكسير" dianggap redundan secara akademis dalam mode standar.

2.2. Tanda Cabang (Al-Alamah Al-Far'iyyah): Kewajiban Justifikasi

Setiap penyimpangan dari tanda asli wajib disertai alasan menggunakan konjungsi "لأنه...". Berikut adalah pemetaan kategori yang wajib memicu fungsi generate_illah():

1. Waw/Alif/Yaa: Pada Isim Muthanna, Jamak Mudzakkar Salim, dan Asma'ul Khamsah.
2. Kasrah pada Nasab: Khusus Jamak Mu'annats Salim.
3. Fathah pada Jar: Khusus Isim Mamnu' minash Sharf.
4. State of Nun: Thubutun Nun atau Hadzfun Nun pada Af'alul Khamsah.
5. Deletion: Hadzfu harfil 'illah pada Fi'il Mudhari' Mu'tal Akhir (kondisi jazam).

Contoh Kontras Implementasi:

* Isim Mamnu' minash Sharf: "وعلامة جره الفتحة نيابة عن الكسرة لأنه ممنوع من الصرف"
* Af'alul Khamsah: "وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة" (Catatan: Mark di sini adalah status huruf, bukan vokal).

2.3. Desain Logika Kondisional (Toggle Mode)

Untuk memfasilitasi segmentasi pengguna, sistem harus mendukung dua mode operasional:

Mode	Logika Algoritma	Deskripsi
Formal/Akademis	IF is_far_iyyah == true THEN append(reason_string) ELSE null	Alasan hanya muncul untuk tanda cabang.
Pedagogis/Pemula	IF mode == 'Pedagogical' THEN append(reason_string)	Alasan selalu dimunculkan untuk semua kategori (Isim Mufrad, dll).

System Architect Insight: Logika 'illah di atas adalah "otak" dari String Builder. Keberhasilan sistem ditentukan oleh presisi pemetaan is_far_iyyah terhadap kategori kata sebelum menyentuh lapisan UI.

3. FORMULA DAN CONTOH STRUKTUR I'RAB 3 TINGKAT KEDALAMAN

Sistem harus menghasilkan varian kedalaman string untuk mendukung responsive UI (Lengkap untuk desktop, Singkat untuk mobile tooltip).

3.1. Isim Mu'rab dan Isim Mabni

Pembedaan tajam dilakukan antara i'rab langsung (Mu'rab) dan i'rab posisi (Mabni/Fii Mahalli).

Tipe	Depth	Contoh Formula Output
Mu'rab	Lengkap	[Role] + [Status] + [وعلامة رفعه/..] + [Mark] + [Reason]
	Singkat	[Role] + [Status] (Contoh: مبتدأ مرفوع)
Mabni	Lengkap	[Type] + [Mabni 'ala] + [Mark] + [في محل] + [Status] + [Role]
	Singkat	[Type] + [في محل] + [Status] (Contoh: اسم إشارة في محل رفع)

3.2. Verba (Fi'il): Madhi, Amr, dan Mudhari'

Penulisan formula untuk Fi'il harus mengikuti aturan rigid berikut:

* Fi'il Mabni (Madhi/Amr): Formula: فعل [Type] مبني على [Mark]
* Fi'il Mudhari' Mu'rab: Formula: فعل مضارع [Status] وعلامة [Status_Name] [Mark] + [Reason]
* Fi'il Mudhari' Mu'tal Akhir (Kondisi Jazam): Formula Khusus: وعلامة جزمه حذف حرف العلة
* Af'alul Khamsah: Peringatan Developer: Mark bukan vokal, melainkan keberadaan/ketiadaan huruf Nun.

3.3. Partikel (Huruf)

Partikel tidak memiliki posisi gramatikal (laa mahalla lahu).

* Formula: حرف [Name] مبني على [Mark] لا محل له من الإعراب
* Data Constraint: Dalam JSON Schema, properti irab_status untuk kategori Huruf harus selalu bernilai null atau N/A.

4. IMPLEMENTASI DATA & ALGORITMA (JSON SCHEMA)

Untuk menjamin skalabilitas, gunakan penamaan enum pada irab_mark (misal: MARK_WAW, MARK_DHAMMAH) untuk menghindari hard-coded strings yang rentan kesalahan.

{
  "word_text": "المسلمون",
  "word_type": "Isim",
  "naming_convention": "Jam' Mudzakkar Salim",
  "irab_status": "Rafa'",
  "irab_mark": "MARK_WAW",
  "is_far_iyyah": true,
  "reason_string": "لأنه جمع مذكر سالم",
  "depth_variants": {
    "lengkap": "مبتدأ مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم",
    "sedang": "مبتدأ مرفوع بالواو لأنه جمع مذكر سالم",
    "singkat": "مبتدأ مرفوع" 
  }
}


Panduan Final Implementasi String Builder:

1. Validasi Depth: Pada varian singkat, sistem harus memotong reason_string secara otomatis, terlepas dari apakah tanda tersebut is_far_iyyah atau tidak. Ini krusial untuk efisiensi ruang pada layar perangkat.
2. Mapping Enum: Konversi irab_mark (seperti MARK_WAW) menjadi string bahasa Arab di sisi klien hanya saat proses rendering akhir.
3. Human-Readable Logic: Pastikan penggabungan string memperhatikan spasi dan konjungsi (seperti niyabatan 'an) secara dinamis berdasarkan nilai is_far_iyyah.

Dengan arsitektur ini, aplikasi Anda tidak hanya menampilkan data, tetapi juga merepresentasikan logika linguistik seorang pakar Nahwu dalam setiap baris kode.
