import { reasons } from '../data/irabData.js';

/**
 * Helper untuk menambahkan prefiks "bi-" (بِـ) secara alami pada kata Arab mu'rab.
 * misal: "الْفَتْحِ" -> "بِالْفَتْحِ", "حَذْفِ" -> "بِحَذْفِ"
 */
function toBiPrefix(arabicText) {
  if (!arabicText) return '';
  if (arabicText.startsWith('الْ') || arabicText.startsWith('ال')) {
    return 'بِ' + arabicText;
  }
  return 'بِ' + arabicText;
}

export function buildIsimMurabText(kedudukan, irabType, sign, reason, mode = 'formal', depth = 'full') {
  if (!kedudukan || !irabType || !sign || !reason) return null;

  // Tangani kasus peran majrur agar tidak terjadi duplikasi "مَجْرُورٌ مَجْرُورٌ"
  const roleText = kedudukan.value === 'majrur_jar' || kedudukan.arabic === 'مَجْرُورٌ' ? 'اسْمٌ' : kedudukan.arabic;
  const baseTitle = `${roleText} ${irabType.arabic}`;

  // Short depth: Peran + Status
  if (depth === 'short') {
    return `${baseTitle}.`;
  }

  const harakat = sign.harakatOverride ?? irabType.harakat;
  const rsn = reasons[reason.value]?.arabic ?? '';
  const isFarIyyah = sign.isFarIyyah === true;
  const shouldShowReason = mode === 'pedagogical' || isFarIyyah;

  if (depth === 'medium') {
    const signText = sign.shortArabic ?? toBiPrefix(sign.arabic);
    return shouldShowReason
      ? `${baseTitle} ${signText} ${rsn}.`
      : `${baseTitle} ${signText}.`;
  }

  // Full depth: standar kitab Az-Zinah & Al-Madkhal
  const amilPart = kedudukan.amilArabic ? ` ${kedudukan.amilArabic}` : '';
  const reasonPart = shouldShowReason ? ` ${rsn}` : '';

  return `${baseTitle}${amilPart} وَعَلَامَةُ ${harakat} ${sign.arabic}${reasonPart}.`;
}

export function buildIsimMabniText(jenisMabni, mabniSign, mahal, mode = 'formal', depth = 'full') {
  if (!jenisMabni || !mabniSign || !mahal) return null;
  const la_mahal = mahal.value === 'la_mahal';

  if (depth === 'short') {
    if (la_mahal) {
      return `${jenisMabni.arabic}.`;
    }
    return `${jenisMabni.arabic} ${mahal.arabic}.`;
  }

  if (depth === 'medium') {
    if (la_mahal) {
      return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} لَا مَحَلَّ لَهُ.`;
    }
    return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} ${mahal.arabic}.`;
  }

  // Full depth
  if (la_mahal) {
    return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ.`;
  }
  return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} ${mahal.arabic}.`;
}

export function buildFiilMadhiText(fiilCategoryVal, mabniSign, mode = 'formal', depth = 'full') {
  if (!mabniSign) return null;
  const isMajhul = fiilCategoryVal === 'madhi_majhul';
  const prefix = isMajhul ? 'فِعْلٌ مَاضٍ مَبْنِيٌّ لِمَا لَمْ يُسَمَّ فَاعِلُهُ' : 'فِعْلٌ مَاضٍ';
  if (depth === 'short') return `${prefix}.`;
  if (depth === 'medium') return `${prefix} مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
  
  if (isMajhul && depth === 'full') {
    return `${prefix} مَبْنِيٌّ عَلَى ${mabniSign.arabic}، ضُمَّ أَوَّلُهُ وَكُسِرَ مَا قَبْلَ آخِرِهِ.`;
  }
  return `${prefix} مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
}

export function buildFiilAmrText(mabniSign, mode = 'formal', depth = 'full') {
  if (!mabniSign) return null;
  if (depth === 'short') return `فِعْلُ أَمْرٍ.`;
  if (depth === 'medium') return `فِعْلُ أَمْرٍ مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
  return `فِعْلُ أَمْرٍ مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
}

export function buildFiilMudhariText(fiilCategoryVal, irabType, sign, reason, mode = 'formal', depth = 'full') {
  if (!irabType || !sign || !reason) return null;

  const isMajhul = fiilCategoryVal === 'mudhari_majhul';
  const prefix = isMajhul ? 'فِعْلٌ مُضَارِعٌ مَبْنِيٌّ لِمَا لَمْ يُسَمَّ فَاعِلُهُ' : 'فِعْلٌ مُضَارِعٌ';

  if (depth === 'short') {
    return `${prefix} ${irabType.arabic}.`;
  }

  const harakat = sign.harakatOverride ?? irabType.harakat;
  const rsn = reasons[reason.value]?.arabic ?? '';
  const isFarIyyah = sign.isFarIyyah === true;
  const shouldShowReason = mode === 'pedagogical' || isFarIyyah;

  if (depth === 'medium') {
    const signText = sign.shortArabic ?? toBiPrefix(sign.arabic);
    return shouldShowReason
      ? `${prefix} ${irabType.arabic} ${signText} ${rsn}.`
      : `${prefix} ${irabType.arabic} ${signText}.`;
  }

  // Full depth: standar kitab Az-Zinah & Al-Madkhal
  const tajarrudPart = irabType.value === 'rafa' ? ' لِتَجَرُّدِهِ عَنِ النَّاصِبِ وَالْجَازِمِ' : '';
  const majhulFormula = isMajhul ? '، ضُمَّ أَوَّلُهُ وَفُتِحَ مَا قَبْلَ آخِرِهِ' : '';
  const reasonPart = shouldShowReason ? ` ${rsn}` : '';

  return `${prefix} ${irabType.arabic}${tajarrudPart} وَعَلَامَةُ ${harakat} ${sign.arabic}${reasonPart}${majhulFormula}.`;
}

export function buildHurufText(category, mabniSign, mode = 'formal', depth = 'full') {
  if (!category || !mabniSign) return null;

  if (depth === 'short') {
    return `حَرْفُ ${category.arabic}.`;
  }

  if (depth === 'medium') {
    return `حَرْفُ ${category.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
  }

  return `حَرْفُ ${category.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ.`;
}
