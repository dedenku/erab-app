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
  { value: 'madhi',   label: 'Madhi (ماض)' },
  { value: 'mudhari', label: "Mudhari' (مضارع)" },
  { value: 'amr',     label: 'Amr (أمر)' },
];

// ─── Kategori Huruf ───────────────────────────────────────────────────────────
export const hurufCategories = [
  { value: 'jar',        arabic: 'جَرٍّ',          label: 'Jar / Qasm (جر وقسم)' },
  { value: 'nashab',     arabic: 'نَصْبٍ',         label: 'Nashab (نصب)' },
  { value: 'jazm',       arabic: 'جَزْمٍ',         label: 'Jazm (جزم)' },
  { value: 'nafi',       arabic: 'نَفْيٍ',         label: "Nafi' (نفي)" },
  { value: 'taukid',     arabic: 'تَوْكِيدٍ',      label: 'Taukid (توكيد)' },
  { value: 'athaf',      arabic: 'عَطْفٍ',         label: "Athaf / 'Atf (عطف)" },
  { value: 'nida',       arabic: 'نِدَاءٍ',        label: "Nida' (نداء)" },
  { value: 'istifham',   arabic: 'اسْتِفْهَامٍ',  label: 'Istifham (استفهام)' },
  { value: 'syarat',     arabic: 'شَرْطٍ',         label: 'Syarat (شرط)' },
  { value: 'masdariyah', arabic: 'مَصْدَرِيَّةٍ', label: 'Masdariyah (مصدرية)' },
  { value: 'tanfis',     arabic: 'تَنْفِيسٍ',     label: 'Tanfis / Istiqbal (تنفيس)' },
  { value: 'tarji',      arabic: 'تَرَجٍّ',        label: "Taraji (ترجٍّي)" },
  { value: 'istidrak',   arabic: 'اسْتِدْرَاكٍ',  label: 'Istidrak (استدراك)' },
];

// ─── Jenis I'rab (Mu'rab) ─────────────────────────────────────────────────────
export const irabTypes = {
  rafa:  { value: 'rafa',   arabic: 'مَرْفُوعٌ', label: "Marfu' (مرفوع)",  harakat: 'رَفْعِهِ',  harakat2: 'رَفْعِهَا' },
  nashab:{ value: 'nashab', arabic: 'مَنْصُوبٌ', label: 'Manshub (منصوب)', harakat: 'نَصْبِهِ',  harakat2: 'نَصْبِهَا' },
  jar:   { value: 'jar',    arabic: 'مَجْرُورٌ', label: 'Majrur (مجرور)',  harakat: 'جَرِّهِ',   harakat2: 'جَرِّهَا'  },
  jazm:  { value: 'jazm',   arabic: 'مَجْزُومٌ', label: 'Majzum (مجزوم)', harakat: 'جَزْمِهِ',  harakat2: 'جَزْمِهَا' },
};

// ─── Mabni 'ala ───────────────────────────────────────────────────────────────
export const mabniSigns = [
  { value: 'fathah',      arabic: 'الْفَتْحِ',          label: "Fathah / Fath (الفتح)" },
  { value: 'sukun',       arabic: 'السُّكُونِ',          label: 'Sukun (السكون)' },
  { value: 'dhammah',     arabic: 'الضَّمِّ',            label: "Dhammah / Dhomm (الضم)" },
  { value: 'kasrah',      arabic: 'الْكَسْرِ',           label: 'Kasrah (الكسر)' },
  { value: 'hadzf_nun',   arabic: 'حَذْفِ النُّونِ',     label: 'Hadzfun Nun (حذف النون)' },
  { value: 'hadzf_illah', arabic: 'حَذْفِ حَرْفِ الْعِلَّةِ', label: "Hadzf Harfil Illah (حذف حرف العلة)" },
];

// ─── Mahal I'rab (untuk Mabni) ────────────────────────────────────────────────
export const mahalIrab = [
  // Rafa'
  { value: 'rafa_mubtada',          arabic: 'فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ',              label: "Rafa' - Mubtada'" },
  { value: 'rafa_mubtada_muakhkhar',arabic: 'فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ مُؤَخَّرٌ',   label: "Rafa' - Mubtada' Muakhkhar" },
  { value: 'rafa_fail',             arabic: 'فِي مَحَلِّ رَفْعٍ فَاعِلٌ',                label: "Rafa' - Fa'il" },
  { value: 'rafa_naib_fail',        arabic: 'فِي مَحَلِّ رَفْعٍ نَائِبُ الْفَاعِلِ',     label: "Rafa' - Naibul Fa'il" },
  { value: 'rafa_khabar',           arabic: 'فِي مَحَلِّ رَفْعٍ خَبَرٌ',                 label: "Rafa' - Khabar" },
  { value: 'rafa_khabar_muqaddam',  arabic: 'فِي مَحَلِّ رَفْعٍ خَبَرٌ مُقَدَّمٌ',       label: "Rafa' - Khabar Muqaddam" },
  { value: 'rafa_khabar_inna',      arabic: 'فِي مَحَلِّ رَفْعٍ خَبَرُ إِنَّ',           label: "Rafa' - Khabar Inna" },
  { value: 'rafa_khabar_la',        arabic: 'فِي مَحَلِّ رَفْعٍ خَبَرُ لَا النَّافِيَةِ', label: "Rafa' - Khabar La Nafiyah" },
  { value: 'rafa_isim_kana',        arabic: 'فِي مَحَلِّ رَفْعٍ اسْمُ كَانَ',            label: "Rafa' - Isim Kana" },
  // Nashab
  { value: 'nashab_maful',          arabic: 'فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهِ',         label: "Nashab - Maf'ul Bih" },
  { value: 'nashab_maful_mutlaq',   arabic: 'فِي مَحَلِّ نَصْبٍ مَفْعُولٌ مُطْلَقٌ',     label: "Nashab - Maf'ul Mutlaq" },
  { value: 'nashab_maful_fih',      arabic: 'فِي مَحَلِّ نَصْبٍ مَفْعُولٌ فِيهِ',        label: "Nashab - Maf'ul Fih (Zharaf)" },
  { value: 'nashab_maful_lajlih',   arabic: 'فِي مَحَلِّ نَصْبٍ مَفْعُولٌ لِأَجْلِهِ',  label: "Nashab - Maf'ul Liajlih" },
  { value: 'nashab_maful_maah',     arabic: 'فِي مَحَلِّ نَصْبٍ مَفْعُولٌ مَعَهُ',       label: "Nashab - Maf'ul Ma'ah" },
  { value: 'nashab_isim_inna',      arabic: 'فِي مَحَلِّ نَصْبٍ اسْمُ إِنَّ',            label: 'Nashab - Isim Inna' },
  { value: 'nashab_isim_la',        arabic: 'فِي مَحَلِّ نَصْبٍ اسْمُ لَا',             label: 'Nashab - Isim La Nafiyah' },
  { value: 'nashab_khabar_kana',    arabic: 'فِي مَحَلِّ نَصْبٍ خَبَرُ كَانَ',           label: 'Nashab - Khabar Kana' },
  { value: 'nashab_haal',           arabic: 'فِي مَحَلِّ نَصْبٍ حَالٌ',                  label: 'Nashab - Haal' },
  { value: 'nashab_tamyiz',         arabic: 'فِي مَحَلِّ نَصْبٍ تَمْيِيزٌ',             label: 'Nashab - Tamyiz' },
  { value: 'nashab_mustatsna',      arabic: 'فِي مَحَلِّ نَصْبٍ مُسْتَثْنًى',           label: 'Nashab - Mustatsna' },
  { value: 'nashab_munada',         arabic: 'فِي مَحَلِّ نَصْبٍ مُنَادًى',              label: 'Nashab - Munada' },
  // Jar & Jazm
  { value: 'jar_jar',               arabic: 'فِي مَحَلِّ جَرٍّ',                         label: 'Jar - Majrur' },
  { value: 'jar_mudhaf_ilaih',      arabic: 'فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ',        label: 'Jar - Mudhaf Ilaih' },
  { value: 'jazm',                  arabic: 'فِي مَحَلِّ جَزْمٍ',                        label: 'Jazm' },
  { value: 'la_mahal',              arabic: 'لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ',       label: 'Tidak punya mahal' },
];

// ─── Peran Isim Mu'rab dalam Kalimat (dengan Amil Baku Turats) ────────────────
export const isimMurabRoles = [
  // Rafa'
  { value: 'mubtada',           arabic: 'مُبْتَدَأٌ',              amilArabic: 'بِالِابْتِدَاءِ',      label: "Mubtada' (مبتدأ)",                       irab: 'rafa' },
  { value: 'mubtada_muakhkhar', arabic: 'مُبْتَدَأٌ مُؤَخَّرٌ',   amilArabic: 'بِالِابْتِدَاءِ',      label: "Mubtada' Muakhkhar (مبتدأ مؤخر)",        irab: 'rafa' },
  { value: 'khabar',            arabic: 'خَبَرُ الْمُبْتَدَإِ',   amilArabic: 'بِالْمُبْتَدَإِ',      label: 'Khabar (خبر)',                            irab: 'rafa' },
  { value: 'khabar_muqaddam',   arabic: 'خَبَرٌ مُقَدَّمٌ',        amilArabic: 'بِالْمُبْتَدَإِ',      label: 'Khabar Muqaddam (خبر مقدم)',              irab: 'rafa' },
  { value: 'fail',              arabic: 'فَاعِلٌ',                 amilArabic: 'بِفِعْلِهِ',          label: "Fa'il (فاعل)",                            irab: 'rafa' },
  { value: 'naibul_fail',       arabic: 'نَائِبُ الْفَاعِلِ',     amilArabic: 'بِفِعْلِهِ',          label: "Naibul Fa'il (نائب الفاعل)",              irab: 'rafa' },
  { value: 'isim_kana',         arabic: 'اسْمُ كَانَ',             amilArabic: 'بِكَانَ',             label: 'Isim Kana (اسم كان وأخواتها)',            irab: 'rafa' },
  { value: 'khabar_inna',       arabic: 'خَبَرُ إِنَّ',            amilArabic: 'بِإِنَّ',             label: "Khabar Inna (خبر إن وأخواتها)",           irab: 'rafa' },
  { value: 'khabar_la',         arabic: 'خَبَرُ لَا',              amilArabic: 'بِلَا',               label: "Khabar La Nafiyah Lil-Jins (خبر لا)",     irab: 'rafa' },
  // Nashab
  { value: 'maful_bih',         arabic: 'مَفْعُولٌ بِهِ',          amilArabic: 'بِفِعْلِهِ',          label: "Maf'ul Bih (مفعول به)",                   irab: 'nashab' },
  { value: 'maful_mutlaq',      arabic: 'مَفْعُولٌ مُطْلَقٌ',      amilArabic: 'بِفِعْلِهِ',          label: "Maf'ul Mutlaq (مفعول مطلق)",              irab: 'nashab' },
  { value: 'maful_fih',         arabic: 'مَفْعُولٌ فِيهِ',         amilArabic: 'بِفِعْلِهِ',          label: "Maf'ul Fih / Zharaf (مفعول فيه)",        irab: 'nashab' },
  { value: 'maful_lajlih',      arabic: 'مَفْعُولٌ لِأَجْلِهِ',   amilArabic: 'بِفِعْلِهِ',          label: "Maf'ul Liajlih (مفعول لأجله)",           irab: 'nashab' },
  { value: 'maful_maah',        arabic: 'مَفْعُولٌ مَعَهُ',        amilArabic: 'بِفِعْلِهِ',          label: "Maf'ul Ma'ah (مفعول معه)",                irab: 'nashab' },
  { value: 'haal',              arabic: 'حَالٌ',                   amilArabic: 'بِفِعْلِهِ',          label: 'Haal (حال)',                               irab: 'nashab' },
  { value: 'tamyiz',            arabic: 'تَمْيِيزٌ',               amilArabic: 'بِفِعْلِهِ',          label: 'Tamyiz (تمييز)',                           irab: 'nashab' },
  { value: 'mustatsna',         arabic: 'مُسْتَثْنًى',             amilArabic: 'بِإِلَّا',             label: 'Mustatsna (مستثنى)',                       irab: 'nashab' },
  { value: 'munada',            arabic: 'مُنَادًى',                amilArabic: 'بِحَرْفِ النِّدَاءِ', label: "Munada Mu'rab (منادى معرب)",              irab: 'nashab' },
  { value: 'khabar_kana',       arabic: 'خَبَرُ كَانَ',            amilArabic: 'بِكَانَ',             label: 'Khabar Kana (خبر كان وأخواتها)',          irab: 'nashab' },
  { value: 'isim_inna',         arabic: 'اسْمُ إِنَّ',             amilArabic: 'بِإِنَّ',             label: 'Isim Inna (اسم إن وأخواتها)',             irab: 'nashab' },
  { value: 'isim_la',           arabic: 'اسْمُ لَا',               amilArabic: 'بِلَا',               label: "Isim La Nafiyah Mudhaf / Syibhuh (اسم لا)", irab: 'nashab' },
  // Jar
  { value: 'majrur_jar',        arabic: 'اسْمٌ',                   amilArabic: 'بِحَرْفِ الْجَرِّ',    label: "Majrur bil Harfil Jar (اسم مجرور بحرف الجر)",  irab: 'jar' },
  { value: 'mudhaf_ilaih',      arabic: 'مُضَافٌ إِلَيْهِ',        amilArabic: 'بِالْمُضَافِ',        label: 'Mudhaf Ilaih (مضاف إليه)',                irab: 'jar' },
  // Tabi' (bisa semua i'rab)
  { value: 'naat',              arabic: 'نَعْتٌ',                  amilArabic: 'لِلْمَنْعُوتِ',       label: "Na'at / Sifat (نعت)",                     irab: 'all' },
  { value: 'athaf',             arabic: 'مَعْطُوفٌ',               amilArabic: 'عَلَى الْمَتْبُوعِ',  label: "Ma'thuf (معطوف)",                          irab: 'all' },
  { value: 'taukid',            arabic: 'تَوْكِيدٌ',               amilArabic: 'لِلْمُؤَكَّدِ',       label: 'Taukid (توكيد)',                           irab: 'all' },
  { value: 'badal',             arabic: 'بَدَلٌ',                  amilArabic: 'مِنَ الْمُبْدَلِ مِنْهُ', label: 'Badal (بدل)',                              irab: 'all' },
];

// ─── Jenis Isim Mabni ─────────────────────────────────────────────────────────
export const isimMabniTypes = [
  { value: 'dhamir_munfasil', arabic: 'ضَمِيرٌ بَارِزٌ مُنْفَصِلٌ',   label: 'Dhamir Munfasil (ضمير منفصل)' },
  { value: 'dhamir_muttasil', arabic: 'ضَمِيرٌ بَارِزٌ مُتَّصِلٌ',   label: 'Dhamir Muttasil (ضمير متصل)' },
  { value: 'dhamir_mustatir', arabic: 'ضَمِيرٌ مُسْتَتِرٌ',           label: 'Dhamir Mustatir (ضمير مستتر)' },
  { value: 'isim_isyarah',    arabic: 'اسْمُ إِشَارَةٍ',              label: 'Isim Isyarah (اسم إشارة)' },
  { value: 'isim_maushul',    arabic: 'اسْمٌ مَوْصُولٌ',              label: 'Isim Maushul (اسم موصول)' },
  { value: 'isim_istifham',   arabic: 'اسْمُ اسْتِفْهَامٍ',          label: 'Isim Istifham (اسم استفهام)' },
  { value: 'isim_syarat',     arabic: 'اسْمُ شَرْطٍ جَازِمٌ',         label: 'Isim Syarat (اسم شرط)' },
  { value: 'isim_la',         arabic: 'اسْمُ لَا النَّافِيَةِ لِلْجِنْسِ', label: 'Isim La Nafiyah Lil-Jins (اسم لا)' },
];

// ─── Tanda I'rab per Jenis I'rab ─────────────────────────────────────────────
export const signsByIrab = {
  rafa: [
    {
      value: 'dhammah_zahirah',
      label: 'Dhammah Zahirah — ضمة ظاهرة في آخره',
      arabic: 'ضَمَّةٌ ظَاهِرَةٌ فِي آخِرِهِ',
      shortArabic: 'بِالضَّمَّةِ الظَّاهِرَةِ',
      signCategory: 'zahirah',
      isFarIyyah: false,
      reasons: ['isim_mufrad', 'jama_taksir', 'fiil_mudhari_shahih'],
    },
    {
      value: 'dhammah_muqaddarah_maqshur',
      label: 'Dhammah Muqaddarah (Maqshur) — الضمة المقدرة على الألف',
      arabic: 'الضَّمَّةُ الْمُقَدَّرَةُ عَلَى الْأَلِفِ مَنَعَ مِنْ ظُهُورِهَا التَّعَذُّرُ',
      shortArabic: 'بِالضَّمَّةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['isim_maqshur'],
    },
    {
      value: 'dhammah_muqaddarah_manqus',
      label: "Dhammah Muqaddarah (Manqus) — الضمة المقدرة على الياء",
      arabic: 'الضَّمَّةُ الْمُقَدَّرَةُ عَلَى الْيَاءِ مَنَعَ مِنْ ظُهُورِهَا الثِّقَلُ',
      shortArabic: 'بِالضَّمَّةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['isim_manqus'],
    },
    {
      value: 'wawu_jms',
      label: "Wawu (Niyabah) — الواو نيابة عن الضمة",
      arabic: 'الْوَاوُ نِيَابَةً عَنِ الضَّمَّةِ',
      shortArabic: 'بِالْوَاوِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['jama_mudzakkar_salim', 'asmaul_khamsah'],
    },
    {
      value: 'alif_mutsanna',
      label: "Alif (Niyabah) — الألف نيابة عن الضمة",
      arabic: 'الْأَلِفُ نِيَابَةً عَنِ الضَّمَّةِ',
      shortArabic: 'بِالْأَلِفِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['mutsanna'],
    },
    {
      value: 'tsubut_nun',
      label: "Tsubutun Nun (Niyabah) — ثبوت النون",
      arabic: 'ثُبُوتُ النُّونِ نِيَابَةً عَنِ الضَّمَّةِ',
      shortArabic: 'بِثُبُوتِ النُّونِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['afalul_khamsah'],
    },
    {
      value: 'dhammah_jama_muannats',
      label: "Dhammah Zahirah — ضمة ظاهرة في آخرها (Jama' Muannats)",
      arabic: 'ضَمَّةٌ ظَاهِرَةٌ فِي آخِرِهَا',
      shortArabic: 'بِالضَّمَّةِ الظَّاهِرَةِ',
      signCategory: 'zahirah',
      isFarIyyah: false,
      harakatOverride: 'رَفْعِهَا',
      reasons: ['jama_muannats_salim'],
    },
    {
      value: 'dhammah_muqaddarah_munasabah',
      label: "Dhammah Muqaddarah (Munasabah) — المقدرة للمناسبة",
      arabic: 'الضَّمَّةُ الْمُقَدَّرَةُ عَلَى مَا قَبْلَ الْيَاءِ مَنَعَ مِنْ ظُهُورِهَا اشْتِغَالُ الْمَحَلِّ بِحَرَكَةِ الْمُنَاسَبَةِ',
      shortArabic: 'بِالضَّمَّةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['mutassil_ya_mutakallim'],
    },
  ],
  nashab: [
    {
      value: 'fathah_zahirah',
      label: 'Fathah Zahirah — فتحة ظاهرة في آخره',
      arabic: 'فَتْحَةٌ ظَاهِرَةٌ فِي آخِرِهِ',
      shortArabic: 'بِالْفَتْحَةِ الظَّاهِرَةِ',
      signCategory: 'zahirah',
      isFarIyyah: false,
      reasons: ['isim_mufrad', 'jama_taksir', 'fiil_mudhari_shahih', 'ghairu_munsharif'],
    },
    {
      value: 'fathah_zahirah_manqus',
      label: "Fathah Zahirah (Manqus) — الفتحة الظاهرة على الياء",
      arabic: 'الْفَتْحَةُ الظَّاهِرَةُ عَلَى الْيَاءِ',
      shortArabic: 'بِالْفَتْحَةِ الظَّاهِرَةِ',
      signCategory: 'zahirah',
      isFarIyyah: false,
      reasons: ['isim_manqus'],
    },
    {
      value: 'fathah_muqaddarah_maqshur',
      label: "Fathah Muqaddarah (Maqshur) — المقدرة على الألف (Ta'azzur)",
      arabic: 'الْفَتْحَةُ الْمُقَدَّرَةُ عَلَى الْأَلِفِ مَنَعَ مِنْ ظُهُورِهَا التَّعَذُّرُ',
      shortArabic: 'بِالْفَتْحَةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['isim_maqshur'],
    },
    {
      value: 'fathah_muqaddarah_munasabah',
      label: "Fathah Muqaddarah (Munasabah) — المقدرة للمناسبة",
      arabic: 'الْفَتْحَةُ الْمُقَدَّرَةُ عَلَى مَا قَبْلَ الْيَاءِ مَنَعَ مِنْ ظُهُورِهَا اشْتِغَالُ الْمَحَلِّ بِحَرَكَةِ الْمُنَاسَبَةِ',
      shortArabic: 'بِالْفَتْحَةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['mutassil_ya_mutakallim'],
    },
    {
      value: 'kasrah_niyabah_jmans',
      label: "Kasrah (Niyabah) — Jama' Muannats Salim",
      arabic: 'الْكَسْرَةُ نِيَابَةً عَنِ الْفَتْحَةِ',
      shortArabic: 'بِالْكَسْرَةِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      harakatOverride: 'نَصْبِهَا',
      reasons: ['jama_muannats_salim'],
    },
    {
      value: 'ya_mutsanna',
      label: "Ya' (Niyabah) — Mutsanna",
      arabic: 'الْيَاءُ الْمَفْتُوحُ مَا قَبْلَهَا وَالْمَكْسُورُ مَا بَعْدَهَا نِيَابَةً عَنِ الْفَتْحَةِ',
      shortArabic: 'بِالْيَاءِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['mutsanna'],
    },
    {
      value: 'ya_jms',
      label: "Ya' (Niyabah) — Jama' Mudzakkar Salim",
      arabic: 'الْيَاءُ الْمَكْسُورُ مَا قَبْلَهَا وَالْمَفْتُوحُ مَا بَعْدَهَا نِيَابَةً عَنِ الْفَتْحَةِ',
      shortArabic: 'بِالْيَاءِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['jama_mudzakkar_salim'],
    },
    {
      value: 'alif_asmaul_khamsah',
      label: "Alif (Niyabah) — Asmaul Khamsah",
      arabic: 'الْأَلِفُ نِيَابَةً عَنِ الْفَتْحَةِ',
      shortArabic: 'بِالْأَلِفِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['asmaul_khamsah'],
    },
    {
      value: 'hadzf_nun_nashab',
      label: "Hadzfun Nun (Niyabah) — Af'alul Khamsah",
      arabic: 'حَذْفُ النُّونِ نِيَابَةً عَنِ الْفَتْحَةِ',
      shortArabic: 'بِحَذْفِ النُّونِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['afalul_khamsah'],
    },
  ],
  jar: [
    {
      value: 'kasrah_zahirah',
      label: "Kasrah Zahirah — كسرة ظاهرة في آخره",
      arabic: 'كَسْرَةٌ ظَاهِرَةٌ فِي آخِرِهِ',
      shortArabic: 'بِالْكَسْرَةِ الظَّاهِرَةِ',
      signCategory: 'zahirah',
      isFarIyyah: false,
      reasons: ['isim_mufrad', 'jama_taksir'],
    },
    {
      value: 'kasrah_zahirah_jmans',
      label: "Kasrah Zahirah — كسرة ظاهرة في آخرها (Jama' Muannats)",
      arabic: 'كَسْرَةٌ ظَاهِرَةٌ فِي آخِرِهَا',
      shortArabic: 'بِالْكَسْرَةِ الظَّاهِرَةِ',
      signCategory: 'zahirah',
      isFarIyyah: false,
      harakatOverride: 'جَرِّهَا',
      reasons: ['jama_muannats_salim'],
    },
    {
      value: 'kasrah_muqaddarah_maqshur',
      label: "Kasrah Muqaddarah (Maqshur) — المقدرة على الألف (Ta'azzur)",
      arabic: 'الْكَسْرَةُ الْمُقَدَّرَةُ عَلَى الْأَلِفِ مَنَعَ مِنْ ظُهُورِهَا التَّعَذُّرُ',
      shortArabic: 'بِالْكَسْرَةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['isim_maqshur'],
    },
    {
      value: 'kasrah_muqaddarah_manqus',
      label: "Kasrah Muqaddarah (Manqus) — المقدرة على الياء (Thiql)",
      arabic: 'الْكَسْرَةُ الْمُقَدَّرَةُ عَلَى الْيَاءِ مَنَعَ مِنْ ظُهُورِهَا الثِّقَلُ',
      shortArabic: 'بِالْكَسْرَةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['isim_manqus'],
    },
    {
      value: 'kasrah_muqaddarah_munasabah',
      label: "Kasrah Muqaddarah (Munasabah) — المقدرة للمناسبة",
      arabic: 'الْكَسْرَةُ الْمُقَدَّرَةُ عَلَى مَا قَبْلَ الْيَاءِ مَنَعَ مِنْ ظُهُورِهَا اشْتِغَالُ الْمَحَلِّ بِحَرَكَةِ الْمُنَاسَبَةِ',
      shortArabic: 'بِالْكَسْرَةِ الْمُقَدَّرَةِ',
      signCategory: 'muqaddarah',
      isFarIyyah: false,
      reasons: ['mutassil_ya_mutakallim'],
    },
    {
      value: 'ya_mutsanna_jar',
      label: "Ya' (Niyabah) — Mutsanna",
      arabic: 'الْيَاءُ الْمَفْتُوحُ مَا قَبْلَهَا وَالْمَكْسُورُ مَا بَعْدَهَا نِيَابَةً عَنِ الْكَسْرَةِ',
      shortArabic: 'بِالْيَاءِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['mutsanna'],
    },
    {
      value: 'ya_jms_jar',
      label: "Ya' (Niyabah) — Jama' Mudzakkar Salim",
      arabic: 'الْيَاءُ الْمَكْسُورُ مَا قَبْلَهَا وَالْمَفْتُوحُ مَا بَعْدَهَا نِيَابَةً عَنِ الْكَسْرَةِ',
      shortArabic: 'بِالْيَاءِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['jama_mudzakkar_salim'],
    },
    {
      value: 'ya_asmaul_khamsah_jar',
      label: "Ya' (Niyabah) — Asmaul Khamsah",
      arabic: 'الْيَاءُ نِيَابَةً عَنِ الْكَسْرَةِ',
      shortArabic: 'بِالْيَاءِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['asmaul_khamsah'],
    },
    {
      value: 'fathah_ghairu_munsharif_jar',
      label: "Fathah (Niyabah) — Ghairu Munsharif — الفتحة نيابة عن الكسرة",
      arabic: 'الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ',
      shortArabic: 'بِالْفَتْحَةِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['ghairu_munsharif'],
    },
  ],
  jazm: [
    {
      value: 'sukun_zahir',
      label: 'Sukun Zahir — السكون',
      arabic: 'السُّكُونُ',
      shortArabic: 'بِالسُّكُونِ',
      signCategory: 'zahirah',
      isFarIyyah: false,
      reasons: ['fiil_mudhari_shahih'],
    },
    {
      value: 'hadzf_illah',
      label: "Hadzf Harfil Illah — حذف حرف العلة",
      arabic: 'حَذْفُ حَرْفِ الْعِلَّةِ نِيَابَةً عَنِ السُّكُونِ',
      shortArabic: 'بِحَذْفِ حَرْفِ الْعِلَّةِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['fiil_mudhari_mutal'],
    },
    {
      value: 'hadzf_nun_jazm',
      label: "Hadzfun Nun — Af'alul Khamsah",
      arabic: 'حَذْفُ النُّونِ نِيَابَةً عَنِ السُّكُونِ',
      shortArabic: 'بِحَذْفِ النُّونِ',
      signCategory: 'niyabah',
      isFarIyyah: true,
      reasons: ['afalul_khamsah'],
    },
  ],
};

// ─── Alasan / Sebab Tanda ('Illah Turats) ─────────────────────────────────────
export const reasons = {
  isim_mufrad:             { label: 'Isim Mufrad',                           arabic: 'لِأَنَّهُ اسْمٌ مُفْرَدٌ' },
  jama_taksir:             { label: "Jama' Taksir",                          arabic: 'لِأَنَّهُ جَمْعُ تَكْسِيرٍ' },
  jama_muannats_salim:     { label: "Jama' Muannats Salim",                  arabic: 'لِأَنَّهُ جَمْعٌ مُؤَنَّثٌ سَالِمٌ' },
  jama_mudzakkar_salim:    { label: "Jama' Mudzakkar Salim",                 arabic: 'لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٌ، وَالنُّونُ عِوَضٌ عَنِ التَّنْوِينِ فِي الِاسْمِ الْمُفْرَدِ' },
  mutsanna:                { label: 'Isim Mutsanna',                          arabic: 'لِأَنَّهُ مُثَنًّى، وَالنُّونُ عِوَضٌ عَنِ التَّنْوِينِ فِي الِاسْمِ الْمُفْرَدِ' },
  isim_maqshur:            { label: 'Isim Maqshur (berakhir alif lazimah)',   arabic: 'لِأَنَّهُ اسْمٌ مَقْصُورٌ' },
  isim_manqus:             { label: 'Isim Manqus (berakhir ya lazimah)',      arabic: 'لِأَنَّهُ اسْمٌ مَنْقُوصٌ' },
  asmaul_khamsah:          { label: "Asmaul Khamsah (أب أخ حم فو ذو)",       arabic: 'لِأَنَّهُ مِنَ الْأَسْمَاءِ الْخَمْسَةِ وَهُوَ مُضَافٌ' },
  ghairu_munsharif:        { label: "Isim Ghairu Munsharif / Diptote (لا ينصرف)", arabic: 'لِأَنَّهُ اسْمٌ لَا يَنْصَرِفُ' },
  afalul_khamsah:          { label: "Af'alul Khamsah",                        arabic: 'لِأَنَّهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ' },
  fiil_mudhari_shahih:     { label: "Fi'il Mudhari' Shahih Akhir",            arabic: 'لِأَنَّهُ فِعْلٌ مُضَارِعٌ صَحِيحُ الْآخِرِ وَلَمْ يَتَّصِلْ بِآخِرِهِ شَيْءٌ' },
  fiil_mudhari_mutal:      { label: "Fi'il Mudhari' Mu'tal Akhir",            arabic: 'لِأَنَّهُ فِعْلٌ مُضَارِعٌ مُعْتَلُّ الْآخِرِ' },
  mutassil_ya_mutakallim:  { label: "Mudhaf ke Ya' Mutakallim (المضاف إلى ياء المتكلم)", arabic: 'لِاشْتِغَالِ الْمَحَلِّ بِحَرَكَةِ الْمُنَاسَبَةِ' },
};

// ─── Sub-pilihan Mabni Fi'il Madhi ───────────────────────────────────────────
export const fiilMadhiMabniOptions = [
  { value: 'fathah_madhi',      arabic: 'الْفَتْحِ الظَّاهِرِ فِي آخِرِهِ',   label: "Fathah Zahir — asal (فعل + _)",        hint: "Contoh: كَتَبَ، ذَهَبَ" },
  { value: 'fathah_muqaddarah',  arabic: 'الْفَتْحِ الْمُقَدَّرِ عَلَى الْأَلِفِ لِلتَّعَذُّرِ', label: "Fathah Muqaddarah — mu'tal alif", hint: "Contoh: دَعَا، رَمَى" },
  { value: 'sukun_ta_fail',     arabic: 'السُّكُونِ لِاتِّصَالِهِ بِضَمِيرِ رَفْعٍ مُتَحَرِّكٍ',  label: "Sukun — bersambung Ta' / Dhomir Fa'il",   hint: "Contoh: كَتَبْتَ، كَتَبْتُ" },
  { value: 'sukun_na_fail',     arabic: 'السُّكُونِ لِاتِّصَالِهِ بِنَا الْفَاعِلِينَ',    label: "Sukun — bersambung Na Fa'il",    hint: "Contoh: كَتَبْنَا" },
  { value: 'sukun_nun_niswah',  arabic: 'السُّكُونِ لِاتِّصَالِهِ بِنُونِ النِّسْوَةِ',    label: "Sukun — bersambung Nun Niswah",  hint: "Contoh: كَتَبْنَ" },
  { value: 'dhammah_wauw_jama', arabic: 'الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ',    label: "Dhammah — bersambung Waw Jama'", hint: "Contoh: كَتَبُوا" },
];

// ─── Sub-pilihan Mabni Fi'il Amr ─────────────────────────────────────────────
export const fiilAmrMabniOptions = [
  { value: 'sukun_amr',          arabic: 'السُّكُونِ الظَّاهِرِ فِي آخِرِهِ',       label: "Sukun — shahih akhir",          hint: "Contoh: اكْتُبْ، اذْهَبْ" },
  { value: 'hadzf_nun_amr',      arabic: 'حَذْفِ النُّونِ لِأَنَّ مُضَارِعَهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ', label: "Hadzfun Nun — Af'alul Khamsah", hint: "Contoh: اكْتُبُوا، اكْتُبَا، اكْتُبِي" },
  { value: 'hadzf_illah_amr',    arabic: 'حَذْفِ حَرْفِ الْعِلَّةِ مِنْ آخِرِهِ',    label: "Hadzf Harfil Illah — mu'tal",   hint: "Contoh: ادْعُ، ارْمِ، اخْشَ" },
  { value: 'fathah_amr_muakkad', arabic: 'الْفَتْحِ لِاتِّصَالِهِ بِنُونِ التَّوْكِيدِ', label: "Fathah — bersambung Nun Taukid", hint: "Contoh: اكْتُبَنَّ" },
];
