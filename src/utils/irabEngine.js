import { reasons } from '../data/irabData';

// harakatOverride: beberapa sign punya gender khusus (mis. JMS → رَفْعِهَا bukan رَفْعِهِ)
// Engine mendukung penulisan harakat feminin ketika sign menetapkan harakatOverride.

export function buildIsimMurabText(kedudukan, irabType, sign, reason) {
  if (!kedudukan || !irabType || !sign || !reason) return null;
  // Gunakan harakatOverride jika ada (misal: Jama' Muannats Salim → رَفْعِهَا)
  const harakat = sign.harakatOverride ?? irabType.harakat;
  const rsn = reasons[reason.value]?.arabic ?? '';
  // Template: [kedudukan] [irab] وَعَلَامَةُ [harakat] [tanda] [alasan].
  return `${kedudukan.arabic} ${irabType.arabic} وَعَلَامَةُ ${harakat} ${sign.arabic} ${rsn}.`;
}

export function buildIsimMabniText(jenisMabni, mabniSign, mahal) {
  if (!jenisMabni || !mabniSign || !mahal) return null;
  const la_mahal = mahal.value === 'la_mahal';
  if (la_mahal) {
    return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ.`;
  }
  return `${jenisMabni.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} ${mahal.arabic}.`;
}

export function buildFiilMadhiText(mabniSign) {
  if (!mabniSign) return null;
  return `فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
}

export function buildFiilAmrText(mabniSign) {
  if (!mabniSign) return null;
  return `فِعْلُ أَمْرٍ مَبْنِيٌّ عَلَى ${mabniSign.arabic}.`;
}

export function buildFiilMudhariText(irabType, sign, reason) {
  if (!irabType || !sign || !reason) return null;
  // Fi'il Mudhari' tidak punya kasus gender, tapi tetap dukung harakatOverride untuk konsistensi
  const harakat = sign.harakatOverride ?? irabType.harakat;
  const rsn = reasons[reason.value]?.arabic ?? '';
  return `فِعْلٌ مُضَارِعٌ ${irabType.arabic} وَعَلَامَةُ ${harakat} ${sign.arabic} ${rsn}.`;
}

export function buildHurufText(category, mabniSign) {
  if (!category || !mabniSign) return null;
  return `حَرْفُ ${category.arabic} مَبْنِيٌّ عَلَى ${mabniSign.arabic} لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ.`;
}
