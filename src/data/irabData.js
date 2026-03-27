// ─── Jenis Kata ───────────────────────────────────────────────────────────────
export const wordTypes = [
  { value: 'isim', label: 'Isim (اسم)' },
  { value: 'fiil', label: "Fi'il (فعل)" },
  { value: 'huruf', label: 'Huruf (حرف)' },
];

// ─── Kategori Isim ────────────────────────────────────────────────────────────
export const isimCategories = [
  { value: 'murab', label: "Mu'rab (معرب)" },
  { value: 'mabni', label: 'Mabni (مبني)' },
];

// ─── Bentuk / Kategori Fi'il ──────────────────────────────────────────────────
export const fiilCategories = [
  { value: 'madhi', label: 'Madhi (ماض)' },
  { value: 'mudhari', label: "Mudhari' (مضارع)" },
  { value: 'amr', label: 'Amr (أمر)' },
];

// ─── Kategori Huruf ───────────────────────────────────────────────────────────
export const hurufCategories = [
  { value: 'jar',       arabic: 'جر',         label: 'Jar / Qasm (جر وقسم)' },
  { value: 'nashab',    arabic: 'نصب',        label: 'Nashab (نصب)' },
  { value: 'jazm',      arabic: 'جزم',        label: 'Jazm (جزم)' },
  { value: 'nafi',      arabic: 'نفي',        label: "Nafi' (نفي)" },
  { value: 'taukid',    arabic: 'توكيد',      label: 'Taukid (توكيد)' },
  { value: 'athaf',     arabic: 'عطف',        label: "Athaf / 'Atf (عطف)" },
  { value: 'nida',      arabic: 'نداء',       label: "Nida' (نداء)" },
  { value: 'istifham',  arabic: 'استفهام',    label: 'Istifham (استفهام)' },
  { value: 'syarat',    arabic: 'شرط',        label: 'Syarat (شرط)' },
  { value: 'masdariyah',arabic: 'مصدرية',    label: 'Masdariyah (مصدرية)' },
  { value: 'tanfis',    arabic: 'تنفيس',      label: 'Tanfis / Istiqbal (تنفيس)' },
  { value: 'tarji',     arabic: 'ترجٍّي',     label: "Taraji (ترجٍّي)" },
  { value: 'istidrak',  arabic: 'استدراك',   label: 'Istidrak (استدراك)' },
];

// ─── Jenis I'rab (Mu'rab) ─────────────────────────────────────────────────────
export const irabTypes = {
  rafa:  { value: 'rafa',  arabic: 'مرفوع',  label: "Marfu' (مرفوع)",  harakat: 'رفعه',  harakat2: 'رفعها' },
  nashab:{ value: 'nashab',arabic: 'منصوب',  label: 'Manshub (منصوب)', harakat: 'نصبه',  harakat2: 'نصبها' },
  jar:   { value: 'jar',   arabic: 'مجرور',  label: 'Majrur (مجرور)',  harakat: 'جره',   harakat2: 'جرها'  },
  jazm:  { value: 'jazm',  arabic: 'مجزوم',  label: 'Majzum (مجزوم)',  harakat: 'جزمه',  harakat2: 'جزمها' },
};

// ─── Mabni 'ala ───────────────────────────────────────────────────────────────
export const mabniSigns = [
  { value: 'fathah',     arabic: 'الفتح',           label: "Fathah / Fath (الفتح)" },
  { value: 'sukun',      arabic: 'السكون',           label: 'Sukun (السكون)' },
  { value: 'dhammah',    arabic: 'الضم',             label: "Dhammah / Dhomm (الضم)" },
  { value: 'kasrah',     arabic: 'الكسر',            label: 'Kasrah (الكسر)' },
  { value: 'hadzf_nun',  arabic: 'حذف النون',        label: 'Hadzfun Nun (حذف النون)' },
  { value: 'hadzf_illah',arabic: 'حذف حرف العلة',   label: "Hadzf Harfil Illah (حذف حرف العلة)" },
];

// ─── Mahal I'rab (untuk Mabni) ────────────────────────────────────────────────
export const mahalIrab = [
  { value: 'rafa_mubtada',   arabic: 'في محل رفع مبتدأ',     label: "Rafa' - Mubtada'" },
  { value: 'rafa_fail',      arabic: 'في محل رفع فاعل',      label: "Rafa' - Fa'il" },
  { value: 'rafa_naib_fail', arabic: 'في محل رفع نائب الفاعل',label: "Rafa' - Naibul Fa'il" },
  { value: 'rafa_khabar',    arabic: 'في محل رفع خبر',       label: "Rafa' - Khabar" },
  { value: 'rafa_khabar_inna',arabic:'في محل رفع خبر إن',    label: "Rafa' - Khabar Inna" },
  { value: 'rafa_isim_kana', arabic: 'في محل رفع اسم كان',   label: "Rafa' - Isim Kana" },
  { value: 'nashab_maful',   arabic: 'في محل نصب مفعول به',  label: "Nashab - Maf'ul Bih" },
  { value: 'nashab_isim_inna',arabic:'في محل نصب اسم إن',    label: 'Nashab - Isim Inna' },
  { value: 'nashab_khabar_kana',arabic:'في محل نصب خبر كان', label: 'Nashab - Khabar Kana' },
  { value: 'nashab_haal',    arabic: 'في محل نصب حال',       label: 'Nashab - Haal' },
  { value: 'jar_jar',        arabic: 'في محل جر',            label: 'Jar - Majrur' },
  { value: 'jazm',           arabic: 'في محل جزم',           label: 'Jazm' },
  { value: 'la_mahal',       arabic: 'لا محل له من الإعراب', label: 'Tidak punya mahal' },
];

// ─── Peran Isim Mu'rab dalam Kalimat ─────────────────────────────────────────
export const isimMurabRoles = [
  // Rafa'
  { value: 'mubtada',      arabic: 'مبتدأ',              label: "Mubtada' (مبتدأ)",                    irab: 'rafa' },
  { value: 'khabar',       arabic: 'خبر',                label: 'Khabar (خبر)',                         irab: 'rafa' },
  { value: 'fail',         arabic: 'فاعل',               label: "Fa'il (فاعل)",                         irab: 'rafa' },
  { value: 'naibul_fail',  arabic: 'نائب الفاعل',        label: "Naibul Fa'il (نائب الفاعل)",           irab: 'rafa' },
  { value: 'isim_kana',    arabic: 'اسم كان',            label: 'Isim Kana (اسم كان)',                  irab: 'rafa' },
  { value: 'khabar_inna',  arabic: 'خبر إنَّ',           label: "Khabar Inna (خبر إن)",                 irab: 'rafa' },
  { value: 'khabar_la',    arabic: 'خبر لا',             label: "Khabar La Nafiyah (خبر لا)",           irab: 'rafa' },
  // Nashab
  { value: 'maful_bih',   arabic: 'مفعول به',            label: "Maf'ul Bih (مفعول به)",                irab: 'nashab' },
  { value: 'maful_mutlaq',arabic: 'مفعول مطلق',          label: "Maf'ul Mutlaq (مفعول مطلق)",           irab: 'nashab' },
  { value: 'maful_fih',   arabic: 'مفعول فيه',           label: "Maf'ul Fih / Zharaf (مفعول فيه)",     irab: 'nashab' },
  { value: 'maful_lajlih',arabic: 'مفعول لأجله',         label: "Maf'ul Liajlih (مفعول لأجله)",        irab: 'nashab' },
  { value: 'maful_maah',  arabic: 'مفعول معه',           label: "Maf'ul Ma'ah (مفعول معه)",             irab: 'nashab' },
  { value: 'haal',        arabic: 'حال',                 label: 'Haal (حال)',                            irab: 'nashab' },
  { value: 'tamyiz',      arabic: 'تمييز',               label: 'Tamyiz (تمييز)',                        irab: 'nashab' },
  { value: 'mustatsna',   arabic: 'مستثنى',              label: 'Mustatsna (مستثنى)',                    irab: 'nashab' },
  { value: 'munada',      arabic: 'منادى',               label: "Munada (منادى)",                        irab: 'nashab' },
  { value: 'khabar_kana', arabic: 'خبر كان',             label: 'Khabar Kana (خبر كان)',                irab: 'nashab' },
  { value: 'isim_inna',   arabic: 'اسم إنَّ',            label: 'Isim Inna (اسم إن)',                   irab: 'nashab' },
  { value: 'isim_la',     arabic: 'اسم لا',              label: "Isim La Nafiyah (اسم لا)",             irab: 'nashab' },
  { value: 'khabar_muqaddam', arabic: 'خبر مقدم',        label: 'Khabar Muqaddam (خبر مقدم)',           irab: 'nashab' },
  // Jar
  { value: 'majrur_jar',  arabic: 'مجرور',               label: "Majrur bil Harfil Jar (مجرور بحرف الجر)", irab: 'jar' },
  { value: 'mudhaf_ilaih',arabic: 'مضاف إليه',           label: 'Mudhaf Ilaih (مضاف إليه)',             irab: 'jar' },
  // Tabi' / Mengikut (bisa semua i'rab)
  { value: 'naat',        arabic: 'نعت',                 label: "Na'at / Sifat (نعت)",                  irab: 'all' },
  { value: 'athaf',       arabic: 'معطوف',               label: "Ma'thuf (معطوف)",                       irab: 'all' },
  { value: 'taukid',      arabic: 'توكيد',               label: 'Taukid (توكيد)',                        irab: 'all' },
  { value: 'badal',       arabic: 'بدل',                 label: 'Badal (بدل)',                           irab: 'all' },
];

// ─── Jenis Isim Mabni ─────────────────────────────────────────────────────────
export const isimMabniTypes = [
  { value: 'dhamir_munfasil',  arabic: 'ضمير منفصل',    label: 'Dhamir Munfasil (ضمير منفصل)' },
  { value: 'dhamir_muttasil',  arabic: 'ضمير متصل',     label: 'Dhamir Muttasil (ضمير متصل)' },
  { value: 'dhamir_mustatiр',  arabic: 'ضمير مستتر',    label: 'Dhamir Mustatir (ضمير مستتر)' },
  { value: 'isim_isyarah',     arabic: 'اسم إشارة',     label: 'Isim Isyarah (اسم إشارة)' },
  { value: 'isim_maushul',     arabic: 'اسم موصول',     label: 'Isim Maushul (اسم موصول)' },
  { value: 'isim_istifham',    arabic: 'اسم استفهام',   label: 'Isim Istifham (اسم استفهام)' },
  { value: 'isim_syarat',      arabic: 'اسم شرط',       label: 'Isim Syarat (اسم شرط)' },
  { value: 'isim_la',          arabic: 'اسم لا',        label: 'Isim La Nafiyah Lil-Jins (اسم لا)' },
];

// ─── Jenis Tanda (Alamat) I'rab ──────────────────────────────────────────────
// Setiap tanda punya: value, arabic (full formulation), label, signCategory, dan contexts
//
// signCategory:
//   zahirah   = ظاهرة (tanda nyata/jelas)
//   muqaddarah = مقدرة (tanda dikira-kirakan)
//   niyabah   = نيابة (tanda digantikan tanda lain)

export const signsByIrab = {
  rafa: [
    {
      value: 'dhammah_zahirah',
      label: 'Dhammah Zahirah — الضمة الظاهرة',
      arabic: 'الضمة الظاهرة على آخره',
      signCategory: 'zahirah',
      reasons: ['isim_mufrad', 'jama_taksir', 'fiil_mudhari_shahih'],
    },
    {
      value: 'dhammah_muqaddarah_maqshur',
      label: 'Dhammah Muqaddarah (Maqshur) — الضمة المقدرة على الألف',
      arabic: 'الضمة المقدرة على الألف منع من ظهورها التعذر',
      signCategory: 'muqaddarah',
      reasons: ['isim_maqshur'],
    },
    {
      value: 'dhammah_muqaddarah_manqus',
      label: "Dhammah Muqaddarah (Manqus) — الضمة المقدرة على الياء",
      arabic: 'الضمة المقدرة على الياء منع من ظهورها الثقل',
      signCategory: 'muqaddarah',
      reasons: ['isim_manqus'],
    },
    {
      value: 'wawu_jms',
      label: "Wawu (Niyabah) — الواو نيابة عن الضمة",
      arabic: 'الواو نيابةً عن الضمة',
      signCategory: 'niyabah',
      reasons: ['jama_mudzakkar_salim', 'asmaul_khamsah'],
    },
    {
      value: 'alif_mutsanna',
      label: "Alif (Niyabah) — الألف نيابة عن الضمة",
      arabic: 'الألف نيابةً عن الضمة',
      signCategory: 'niyabah',
      reasons: ['mutsanna'],
    },
    {
      value: 'tsubut_nun',
      label: "Tsubutun Nun (Niyabah) — ثبوت النون",
      arabic: 'ثبوت النون نيابةً عن الضمة',
      signCategory: 'niyabah',
      reasons: ['afalul_khamsah'],
    },
    {
      value: 'dhammah_jama_muannats',
      label: "Dhammah Zahirah — الضمة (Jama' Muannats Salim)",
      arabic: 'الضمة الظاهرة على آخره',
      signCategory: 'zahirah',
      reasons: ['jama_muannats_salim'],
    },
  ],
  nashab: [
    {
      value: 'fathah_zahirah',
      label: 'Fathah Zahirah — الفتحة الظاهرة',
      arabic: 'الفتحة الظاهرة على آخره',
      signCategory: 'zahirah',
      reasons: ['isim_mufrad', 'jama_taksir', 'fiil_mudhari_shahih'],
    },
    {
      value: 'fathah_muqaddarah_maqshur',
      label: 'Fathah Muqaddarah (Maqshur) — الفتحة المقدرة على الألف',
      arabic: 'الفتحة المقدرة على الألف منع من ظهورها التعذر',
      signCategory: 'muqaddarah',
      reasons: ['isim_maqshur'],
    },
    {
      value: 'kasrah_niyabah_jmans',
      label: "Kasrah (Niyabah) — الكسرة نيابة — Jama' Muannats Salim",
      arabic: 'الكسرة نيابةً عن الفتحة',
      signCategory: 'niyabah',
      reasons: ['jama_muannats_salim'],
    },
    {
      value: 'ya_mutsanna',
      label: "Ya' (Niyabah) — الياء نيابة — Mutsanna",
      arabic: 'الياء نيابةً عن الفتحة',
      signCategory: 'niyabah',
      reasons: ['mutsanna'],
    },
    {
      value: 'ya_jms',
      label: "Ya' (Niyabah) — الياء نيابة — Jama' Mudzakkar Salim",
      arabic: 'الياء نيابةً عن الفتحة',
      signCategory: 'niyabah',
      reasons: ['jama_mudzakkar_salim'],
    },
    {
      value: 'alif_asmaul_khamsah',
      label: "Alif (Niyabah) — الألف نيابة — Asmaul Khamsah",
      arabic: 'الألف نيابةً عن الفتحة',
      signCategory: 'niyabah',
      reasons: ['asmaul_khamsah'],
    },
    {
      value: 'fathah_ghairu_munsharif',
      label: "Fathah (Niyabah) — Ghairu Munsharif (بدل الكسرة)",
      arabic: 'الفتحة نيابةً عن الكسرة لأنه اسم لا ينصرف',
      signCategory: 'niyabah',
      reasons: ['ghairu_munsharif_jar'],
    },
    {
      value: 'hadzf_nun_nashab',
      label: "Hadzfun Nun — حذف النون — Af'alul Khamsah",
      arabic: 'حذف النون نيابةً عن الفتحة',
      signCategory: 'niyabah',
      reasons: ['afalul_khamsah'],
    },
  ],
  jar: [
    {
      value: 'kasrah_zahirah',
      label: 'Kasrah Zahirah — الكسرة الظاهرة',
      arabic: 'الكسرة الظاهرة على آخره',
      signCategory: 'zahirah',
      reasons: ['isim_mufrad', 'jama_taksir', 'jama_muannats_salim'],
    },
    {
      value: 'kasrah_muqaddarah_maqshur',
      label: 'Kasrah Muqaddarah (Maqshur)',
      arabic: 'الكسرة المقدرة على الألف منع من ظهورها التعذر',
      signCategory: 'muqaddarah',
      reasons: ['isim_maqshur'],
    },
    {
      value: 'kasrah_muqaddarah_manqus',
      label: 'Kasrah Muqaddarah (Manqus)',
      arabic: 'الكسرة المقدرة على الياء منع من ظهورها الثقل',
      signCategory: 'muqaddarah',
      reasons: ['isim_manqus'],
    },
    {
      value: 'ya_mutsanna_jar',
      label: "Ya' (Niyabah) — Mutsanna",
      arabic: 'الياء نيابةً عن الكسرة',
      signCategory: 'niyabah',
      reasons: ['mutsanna'],
    },
    {
      value: 'ya_jms_jar',
      label: "Ya' (Niyabah) — Jama' Mudzakkar Salim",
      arabic: 'الياء نيابةً عن الكسرة',
      signCategory: 'niyabah',
      reasons: ['jama_mudzakkar_salim'],
    },
    {
      value: 'ya_asmaul_khamsah_jar',
      label: "Ya' (Niyabah) — Asmaul Khamsah",
      arabic: 'الياء نيابةً عن الكسرة',
      signCategory: 'niyabah',
      reasons: ['asmaul_khamsah'],
    },
    {
      value: 'fathah_ghairu_munsharif_jar',
      label: "Fathah (Niyabah, Ghairu Munsharif) — الفتحة بدل الكسرة",
      arabic: 'الفتحة نيابةً عن الكسرة',
      signCategory: 'niyabah',
      reasons: ['ghairu_munsharif_jar'],
    },
  ],
  jazm: [
    {
      value: 'sukun_zahir',
      label: 'Sukun Zahir — السكون',
      arabic: 'السكون',
      signCategory: 'zahirah',
      reasons: ['fiil_mudhari_shahih'],
    },
    {
      value: 'hadzf_illah',
      label: "Hadzf Harfil Illah — حذف حرف العلة",
      arabic: 'حذف حرف العلة',
      signCategory: 'niyabah',
      reasons: ['fiil_mudhari_mutal'],
    },
    {
      value: 'hadzf_nun_jazm',
      label: "Hadzfun Nun — حذف النون — Af'alul Khamsah",
      arabic: 'حذف النون',
      signCategory: 'niyabah',
      reasons: ['afalul_khamsah'],
    },
  ],
};

// ─── Alasan / Sebab Tanda ─────────────────────────────────────────────────────
export const reasons = {
  isim_mufrad:          { label: 'Isim Mufrad',                   arabic: 'لأنه اسم مفرد' },
  jama_taksir:          { label: "Jama' Taksir",                  arabic: 'لأنه جمع تكسير' },
  jama_muannats_salim:  { label: "Jama' Muannats Salim",          arabic: 'لأنه جمع مؤنث سالم' },
  jama_mudzakkar_salim: { label: "Jama' Mudzakkar Salim",         arabic: 'لأنه جمع مذكر سالم' },
  mutsanna:             { label: 'Isim Mutsanna',                  arabic: 'لأنه مثنى' },
  isim_maqshur:         { label: 'Isim Maqshur (berakhir alif)',   arabic: 'لأنه اسم مقصور' },
  isim_manqus:          { label: 'Isim Manqus (berakhir ya)',      arabic: 'لأنه اسم منقوص' },
  asmaul_khamsah:       { label: "Asmaul Khamsah (أب أخ حم فو ذو)",arabic: 'لأنه من الأسماء الخمسة' },
  ghairu_munsharif_jar: { label: "Isim Ghairu Munsharif (لا ينصرف)", arabic: 'لأنه اسم لا ينصرف' },
  afalul_khamsah:       { label: "Af'alul Khamsah",               arabic: 'لأنه من الأفعال الخمسة' },
  fiil_mudhari_shahih:  { label: "Fi'il Mudhari' Shahih Akhir",   arabic: 'لأنه فعل مضارع صحيح الآخر ولم يتصل بآخره شيء' },
  fiil_mudhari_mutal:   { label: "Fi'il Mudhari' Mu'tal Akhir",  arabic: 'لأنه فعل مضارع معتل الآخر' },
};

// ─── Sub-pilihan Mabni Fi'il Madhi ───────────────────────────────────────────
// Fi'il madhi mabni berdasarkan konteks akhirannya
export const fiilMadhiMabniOptions = [
  { value: 'fathah_madhi',      arabic: 'الفتح',   label: "Fathah — asal (فعل + _)",      hint: "Contoh: كَتَبَ، ذَهَبَ" },
  { value: 'sukun_ta_fail',     arabic: 'السكون',  label: "Sukun — bersambung Ta' Fa'il", hint: "Contoh: كَتَبْتَ، ذَهَبْتُ" },
  { value: 'sukun_na_fail',     arabic: 'السكون',  label: "Sukun — bersambung Na Fa'il",  hint: "Contoh: كَتَبْنَا" },
  { value: 'dhammah_wauw_jama', arabic: 'الضم',    label: "Dhammah — bersambung Waw Jama'", hint: "Contoh: كَتَبُوا" },
];

// ─── Sub-pilihan Mabni Fi'il Amr ─────────────────────────────────────────────
export const fiilAmrMabniOptions = [
  { value: 'sukun_amr',         arabic: 'السكون',           label: "Sukun — shahih akhir",         hint: "Contoh: اكْتُبْ、اذْهَبْ" },
  { value: 'hadzf_nun_amr',     arabic: 'حذف النون',         label: "Hadzfun Nun — Af'alul Khamsah", hint: "Contoh: اكْتُبُوا، اكْتُبِي" },
  { value: 'hadzf_illah_amr',   arabic: 'حذف حرف العلة',    label: "Hadzf Harfil Illah — mu'tal",   hint: "Contoh: ادْعُ، ارْمِ، اخْشَ" },
  { value: 'fathah_amr_muakkad',arabic: 'الفتح',            label: "Fathah — bersambung Nun Taukid", hint: "Contoh: اكْتُبَنَّ" },
];
