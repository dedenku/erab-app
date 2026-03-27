// ─── Strip harakat (tanda baca Arab) ─────────────────────────────────────────
// Menghapus semua harakat KECUALI shadda/tasydid (U+0651 = ّ )
export function stripHarakat(text) {
  if (!text) return text;
  return text.replace(/[\u064B-\u0650\u0652-\u065F\u0670]/g, '');
}

// ─── Build Compact / Ringkas version ─────────────────────────────────────────
export function buildCompact(resultText) {
  if (!resultText) return null;
  let text = resultText;

  // Helper untuk menyesuaikan harakat tanda (Dhammah -> Dhammati) jika didahului "bi-"
  const fixMajrurSign = (match, p1) => {
    const adjustedSign = p1.replace(/\u064F(?=\s|$)/g, '\u0650');
    return 'بِـ' + adjustedSign;
  };

  const fixMajrurPlain = (match, p1) => {
    let sign = p1;
    sign = sign
      .replace(/^الضمة/, 'الضمةِ')
      .replace(/^الفتحة/, 'الفتحةِ')
      .replace(/^الكسرة/, 'الكسرةِ')
      .replace(/^الواو/, 'الواوِ')
      .replace(/^الألف/, 'الألفِ')
      .replace(/^ثبوت/, 'ثبوتِ')
      .replace(/^حذف/, 'حذفِ')
      .replace(/ الظاهرة/g, ' الظاهرةِ')
      .replace(/ المقدرة/g, ' المقدرةِ');
    return 'بـ' + sign;
  };

  // 1. Handle Mu'rab: وَعَلَامَةُ رَفْعِهِ/نَصْبِهِ/جَرِّهِ/جَزْمِهِ -> بِـ (dengan koreksi p1)
  text = text.replace(/وَعَلَامَةُ (?:رَفْعِهِ|نَصْبِهِ|جَرِّهِ|جَزْمِهِ) ([\u0600-\u06FF\s]+?)(?= لِأَنَّهُ| مَنَعَ| \.)/g, fixMajrurSign);
  text = text.replace(/وعلامة (?:رفعه|نصبه|جره|جزمه) ([\u0600-\u06FF\s]+?)(?= لأنه| منع| \.)/g, fixMajrurPlain);

  // 2. Handle Mabni: مَبْنِيٌّ عَلَى -> بـ
  text = text.replace(/ مَبْنِيٌّ عَلَى ([\u0600-\u06FF\s]+?)(?= لَا مَحَلَّ| فِي مَحَلِّ| \.)/g, ' مَبْنِيٌّ بِـ$1');
  text = text.replace(/ مبني على ([\u0600-\u06FF\s]+?)(?= لا محل| في محل| \.)/g, ' مبني بـ$1');

  // 3. Remove excess clauses
  text = text.replace(/ (لِأَنَّهُ|نِيَابَةً|مَنَعَ)[^.]+\./g, '.');
  text = text.replace(/ (لأنه|نيابةً|منع)[^.]+\./g, '.');
  text = text.replace(/ لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ\.?/g, '.');
  text = text.replace(/ لا محل له من الإعراب\.?/g, '.');

  return text.trim();
}
