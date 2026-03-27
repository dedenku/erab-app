import React, { useState, useMemo, useCallback } from 'react';
import DropdownStep from './DropdownStep';
import OutputBox from './OutputBox';
import {
  buildIsimMurabText,
  buildIsimMabniText,
  buildFiilMadhiText,
  buildFiilAmrText,
  buildFiilMudhariText,
  buildHurufText
} from '../utils/irabEngine';
import {
  wordTypes,
  isimCategories,
  fiilCategories,
  hurufCategories,
  irabTypes,
  mahalIrab,
  mabniSigns,
  isimMurabRoles,
  isimMabniTypes,
  signsByIrab,
  reasons,
  fiilMadhiMabniOptions,
  fiilAmrMabniOptions,
} from '../data/irabData';

// ─── Component ────────────────────────────────────────────────────────────────

export default function IrabBuilder({ onBookmark }) {
  const [wordText,  setWordText]  = useState('');
  const [wordType,  setWordType]  = useState(null);
  const [category,  setCategory]  = useState(null);
  const [kedudukan, setKedudukan] = useState(null);
  const [irabType,  setIrabType]  = useState(null);
  const [sign,      setSign]      = useState(null);
  const [reason,    setReason]    = useState(null);
  const [mabniSign, setMabniSign] = useState(null);
  const [mahal,     setMahal]     = useState(null);

  // ── Computed option lists ──────────────────────────────────────────────────
  const categoryOptions = useMemo(() => {
    if (!wordType) return [];
    if (wordType.value === 'isim')  return isimCategories;
    if (wordType.value === 'fiil')  return fiilCategories;
    if (wordType.value === 'huruf') return hurufCategories;
    return [];
  }, [wordType]);

  const kedudukanOptions = useMemo(() => {
    if (wordType?.value === 'isim' && category?.value === 'murab') return isimMurabRoles;
    if (wordType?.value === 'isim' && category?.value === 'mabni') return isimMabniTypes;
    return [];
  }, [wordType, category]);

  const irabTypeOptions = useMemo(() => {
    if (wordType?.value === 'isim' && category?.value === 'murab' && kedudukan) {
      if (kedudukan.irab === 'all') return [irabTypes.rafa, irabTypes.nashab, irabTypes.jar];
      return kedudukan.irab ? [irabTypes[kedudukan.irab]] : [];
    }
    if (wordType?.value === 'fiil' && category?.value === 'mudhari') {
      return [irabTypes.rafa, irabTypes.nashab, irabTypes.jazm];
    }
    return [];
  }, [wordType, category, kedudukan]);

  const signOptions = useMemo(() => {
    if (!irabType) return [];
    return signsByIrab[irabType.value] ?? [];
  }, [irabType]);

  const reasonOptions = useMemo(() => {
    if (!sign) return [];
    return (sign.reasons ?? []).map(key => ({ value: key, label: reasons[key]?.label ?? key }));
  }, [sign]);

  const mabniOptions = useMemo(() => {
    if (wordType?.value === 'fiil' && category?.value === 'madhi') return fiilMadhiMabniOptions;
    if (wordType?.value === 'fiil' && category?.value === 'amr')   return fiilAmrMabniOptions;
    return mabniSigns;
  }, [wordType, category]);

  // ── Cascade resets ─────────────────────────────────────────────────────────
  const reset = useCallback((fields) => {
    if (fields.includes('category'))  { setCategory(null);  }
    if (fields.includes('kedudukan')) { setKedudukan(null); }
    if (fields.includes('irabType'))  { setIrabType(null);  }
    if (fields.includes('sign'))      { setSign(null);      }
    if (fields.includes('reason'))    { setReason(null);    }
    if (fields.includes('mabniSign')) { setMabniSign(null); }
    if (fields.includes('mahal'))     { setMahal(null);     }
  }, []);

  const handleWordTypeChange = (val) => {
    setWordType(val);
    reset(['category','kedudukan','irabType','sign','reason','mabniSign','mahal']);
  };
  const handleCategoryChange = (val) => {
    setCategory(val);
    reset(['kedudukan','irabType','sign','reason','mabniSign','mahal']);
  };
  const handleKedudukanChange = (val) => {
    setKedudukan(val);
    reset(['irabType','sign','reason','mabniSign','mahal']);
    // Auto-select irab type when there is only one possibility
    if (wordType?.value === 'isim' && category?.value === 'murab' && val && val.irab !== 'all') {
      setIrabType(irabTypes[val.irab]);
    }
  };
  const handleIrabTypeChange = (val) => {
    setIrabType(val);
    reset(['sign','reason']);
  };
  const handleSignChange = (val) => {
    setSign(val);
    reset(['reason']);
  };
  const handleMabniSignChange = (val) => {
    setMabniSign(val);
    reset(['mahal']);
  };

  const handleReset = useCallback(() => {
    setWordText('');
    setWordType(null);
    reset(['category','kedudukan','irabType','sign','reason','mabniSign','mahal']);
  }, [reset]);

  // ── Arabic Sentence Builder ────────────────────────────────────────────────
  const resultText = useMemo(() => {
    let body = null;

    if (wordType?.value === 'isim') {
      if (category?.value === 'murab') {
        body = buildIsimMurabText(kedudukan, irabType, sign, reason);
      } else if (category?.value === 'mabni') {
        body = buildIsimMabniText(kedudukan, mabniSign, mahal);
      }
    } else if (wordType?.value === 'fiil') {
      if (category?.value === 'madhi') body = buildFiilMadhiText(mabniSign);
      else if (category?.value === 'amr')  body = buildFiilAmrText(mabniSign);
      else if (category?.value === 'mudhari') body = buildFiilMudhariText(irabType, sign, reason);
    } else if (wordType?.value === 'huruf') {
      body = buildHurufText(category, mabniSign);
    }

    if (!body) return null;
    return wordText ? `${wordText} : ${body}` : body;
  }, [wordText, wordType, category, kedudukan, irabType, sign, reason, mabniSign, mahal]);

  // ── Render ─────────────────────────────────────────────────────────────────
  const showKedudukan = wordType?.value === 'isim' && category;
  const showIrabType  = showKedudukan && category?.value === 'murab' && kedudukan;
  const isIrabTypeLocked = showIrabType && kedudukan.irab !== 'all';
  const showSign      = showIrabType && irabType;
  const showReason    = showSign && sign;

  const showMabniSign =
    (wordType?.value === 'isim' && category?.value === 'mabni' && kedudukan) ||
    (wordType?.value === 'fiil' && (category?.value === 'madhi' || category?.value === 'amr')) ||
    (wordType?.value === 'huruf' && category);
  const showMahal = wordType?.value === 'isim' && category?.value === 'mabni' && mabniSign;

  const showFiilMudhariSigns = wordType?.value === 'fiil' && category?.value === 'mudhari';

  return (
    <div className="w-full">
      {/* Word Input */}
      <div className="flex flex-col gap-2 mb-5 w-full">
        <label className="text-sm font-semibold text-slate-700">
          Kata <span className="text-slate-400 font-normal">(الكلمة — opsional)</span>
        </label>
        <input
          dir="rtl"
          type="text"
          className="w-full border border-slate-200 rounded-xl py-3 px-4 text-2xl font-arabic focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 bg-slate-50"
          placeholder="أدخل الكلمة هنا..."
          value={wordText}
          onChange={(e) => setWordText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <DropdownStep
          label="Jenis Kata"
          options={wordTypes}
          value={wordType}
          onChange={handleWordTypeChange}
        />

        {wordType && (
          <DropdownStep
            label={
              wordType.value === 'huruf' ? 'Kategori Huruf' :
              wordType.value === 'fiil'  ? "Bentuk Fi'il" :
              "Mu'rab / Mabni"
            }
            options={categoryOptions}
            value={category}
            onChange={handleCategoryChange}
          />
        )}

        {/* Isim Mu'rab */}
        {showKedudukan && category.value === 'murab' && (
          <DropdownStep
            label="Kedudukan / Peran Kata"
            options={kedudukanOptions}
            value={kedudukan}
            onChange={handleKedudukanChange}
          />
        )}
        {showIrabType && (
          <DropdownStep
            label="Jenis I'rab"
            options={irabTypeOptions}
            value={irabType}
            onChange={handleIrabTypeChange}
            isDisabled={isIrabTypeLocked}
          />
        )}
        {showSign && (
          <DropdownStep
            label="Tanda I'rab (Alamat)"
            options={signOptions}
            value={sign}
            onChange={handleSignChange}
          />
        )}
        {showReason && (
          <DropdownStep
            label="Alasan Tanda"
            options={reasonOptions}
            value={reason}
            onChange={setReason}
          />
        )}

        {/* Isim Mabni */}
        {showKedudukan && category.value === 'mabni' && (
          <DropdownStep
            label="Jenis Isim Mabni"
            options={kedudukanOptions}
            value={kedudukan}
            onChange={handleKedudukanChange}
          />
        )}

        {/* Mabni Sign (shared for isim mabni, fi'il madhi/amr, huruf) */}
        {showMabniSign && (
          <DropdownStep
            label="Mabni 'ala (Harakat Bina')"
            options={mabniOptions}
            value={mabniSign}
            onChange={handleMabniSignChange}
          />
        )}
        {showMahal && (
          <DropdownStep
            label="Mahal / Kedudukan I'rab"
            options={mahalIrab}
            value={mahal}
            onChange={setMahal}
          />
        )}

        {/* Fi'il Mudhari */}
        {showFiilMudhariSigns && (
          <>
            <DropdownStep
              label="Jenis I'rab"
              options={irabTypeOptions}
              value={irabType}
              onChange={handleIrabTypeChange}
            />
            {irabType && (
              <DropdownStep
                label="Tanda I'rab (Alamat)"
                options={signOptions}
                value={sign}
                onChange={handleSignChange}
              />
            )}
            {sign && (
              <DropdownStep
                label="Alasan Tanda"
                options={reasonOptions}
                value={reason}
                onChange={setReason}
              />
            )}
          </>
        )}
      </div>

      <OutputBox resultText={resultText} onReset={handleReset} isComplete={!!resultText} onBookmark={onBookmark} />
    </div>
  );
}
