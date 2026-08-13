import { reasons } from '../data/irabData';

/**
 * Helper untuk menambahkan prefiks "bi-" (بِـ) secara alami pada kata Arab.
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

  // Short depth: Peran + Status
  if (depth === 'short') {
    return `${kedudukan.arabic} ${irabType.arabic}.`;
  }

  const harakat = sign.harakatOverride ?? irabType.harakat;
  const rsn = reasons[reason.value]?.arabic ?? '';
  const isFarIyyah = sign.isFarIyyah === true;
  const shouldShowReason = mode === 'pedagogical' || isFarIyyah;

  if (depth === 'medium') {
    const signText = sign.shortArabic ?? toBiPrefix(sign.arabic);
    return shouldShowReason
      ? `${kedudukan.arabic} ${irabType.arabic} ${signText} ${rsn}.`
      : `${kedudukan.arabic} ${irabType.arabic} ${signText}.`;
  }

  // Full depth
  return shouldShowReason
    ? `${kedudukan.arabic} ${irabType.arabic} وَعَلَامَةُ ${harakat} ${sign.arabic} ${rsn}.`
    : `${kedudukan.arabic} ${irabType.arabic} وَعَلَامَةُ ${harakat} ${sign.arabic}.`;
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
    const mabniBi = toBiPrefix(mabniSign.arabic);
    if (la_mahal) {
      return `${jenisMabni.arabic} مَبْنِيٌّ ${mabniBi} لَا مَحَلَّ لَهُ.`;
    }
    return `${jenisMabni.arabic} مَبْنِيٌّ ${mabniBi} ${mahal.arabic}.`;
  }

  // Full depth
  if (la_mahal) {
    return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ.`;
  }
  return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} ${mahal.arabic}.`;
}

export function buildFiilMadhiText(mabniSign, mode = 'formal', depth = 'full') {
  if (!mabniSign) return null;
  if (depth === 'short') return `فِعْلٌ مَاضٍ.`;
  if (depth === 'medium') return `فِعْلٌ مَاضٍ مَبْنِيٌّ ${toBiPrefix(mabniSign.arabic)}.`;
  return `فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
}

export function buildFiilAmrText(mabniSign, mode = 'formal', depth = 'full') {
  if (!mabniSign) return null;
  if (depth === 'short') return `فِعْلُ أَمْرٍ.`;
  if (depth === 'medium') return `فِعْلُ أَمْرٍ مَبْنِيٌّ ${toBiPrefix(mabniSign.arabic)}.`;
  return `فِعْلُ أَمْرٍ مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
}

export function buildFiilMudhariText(irabType, sign, reason, mode = 'formal', depth = 'full') {
  if (!irabType || !sign || !reason) return null;

  if (depth === 'short') {
    return `فِعْلٌ مُضَارِعٌ ${irabType.arabic}.`;
  }

  const harakat = sign.harakatOverride ?? irabType.harakat;
  const rsn = reasons[reason.value]?.arabic ?? '';
  const isFarIyyah = sign.isFarIyyah === true;
  const shouldShowReason = mode === 'pedagogical' || isFarIyyah;

  if (depth === 'medium') {
    const signText = sign.shortArabic ?? toBiPrefix(sign.arabic);
    return shouldShowReason
      ? `فِعْلٌ مُضَارِعٌ ${irabType.arabic} ${signText} ${rsn}.`
      : `فِعْلٌ مُضَارِعٌ ${irabType.arabic} ${signText}.`;
  }

  // Full depth
  return shouldShowReason
    ? `فِعْلٌ مُضَارِعٌ ${irabType.arabic} وَعَلَامَةُ ${harakat} ${sign.arabic} ${rsn}.`
    : `فِعْلٌ مُضَارِعٌ ${irabType.arabic} وَعَلَامَةُ ${harakat} ${sign.arabic}.`;
}

export function buildHurufText(category, mabniSign, mode = 'formal', depth = 'full') {
  if (!category || !mabniSign) return null;

  if (depth === 'short') {
    return `حَرْفُ ${category.arabic}.`;
  }

  if (depth === 'medium') {
    return `حَرْفُ ${category.arabic} مَبْنِيٌّ ${toBiPrefix(mabniSign.arabic)}.`;
  }

  return `حَرْفُ ${category.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ.`;
}

