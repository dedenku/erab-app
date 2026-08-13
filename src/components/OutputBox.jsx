import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Baseline, Bookmark, BookmarkCheck, GraduationCap, BookOpen, FileText, AlignLeft, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { stripHarakat } from '../utils/textUtils';

export default function OutputBox({
  resultText,
  onReset,
  isComplete,
  onBookmark,
  explanationMode = 'formal',
  setExplanationMode,
  depth = 'full',
  setDepth,
}) {
  const [withHarakat, setWithHarakat] = useState(true);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Apply harakat filter
  const displayText = withHarakat ? resultText : stripHarakat(resultText);

  const handleCopy = () => {
    if (!displayText) return;
    navigator.clipboard.writeText(displayText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const handleBookmark = () => {
    if (!displayText || !onBookmark) return;
    onBookmark(displayText);
    setBookmarked(true);
    setTimeout(() => setBookmarked(false), 1500);
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
      {/* Top Header Controls */}
      <div className="flex flex-col gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
        
        {/* Row 1: Title & Main Action Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-slate-700 font-semibold text-sm whitespace-nowrap flex items-center gap-1.5">
            <span>نتيجة الإعراب</span>
            <span className="text-[11px] text-slate-400 font-normal">(Hasil I'rab)</span>
          </h3>

          <div className="flex items-center gap-1.5">
            {/* Harakat toggle */}
            <button
              onClick={() => setWithHarakat(v => !v)}
              title={withHarakat ? 'Klik untuk hapus harakat' : 'Klik untuk tampilkan harakat'}
              className={clsx(
                'flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                withHarakat
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              )}
            >
              <Baseline size={12} />
              {withHarakat ? 'Dengan Harakat' : 'Tanpa Harakat'}
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              disabled={!isComplete}
              title={copied ? 'Tersalin!' : 'Salin ke Clipboard'}
              className={clsx(
                'flex items-center justify-center w-9 h-9 rounded-xl transition-all',
                isComplete
                  ? copied
                    ? 'bg-green-500 text-white'
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>

            {/* Bookmark button */}
            <button
              onClick={handleBookmark}
              disabled={!isComplete}
              title="Simpan ke Bookmark"
              className={clsx(
                'flex items-center justify-center w-9 h-9 rounded-xl transition-all',
                isComplete
                  ? bookmarked
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              {bookmarked ? <BookmarkCheck size={18}/> : <Bookmark size={18}/>}
            </button>

            {/* Reset button */}
            <button
              onClick={onReset}
              title="Ulangi / Reset"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Row 2: Mode Penjelasan ('Illah) & Depth Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200/60">
          {/* Mode Switcher: Akademis vs Pemula */}
          {setExplanationMode && (
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Aturan 'Illah:</span>
              <div className="flex rounded-lg overflow-hidden border border-slate-200 text-xs font-medium bg-white">
                <button
                  onClick={() => setExplanationMode('formal')}
                  title="Akademis / Formal: Alasan 'لأنه...' hanya muncul untuk tanda cabang"
                  className={clsx(
                    'flex items-center gap-1 px-2.5 py-1 transition-colors',
                    explanationMode === 'formal'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <GraduationCap size={12} /> Akademis
                </button>
                <button
                  onClick={() => setExplanationMode('pedagogical')}
                  title="Pemula / Pedagogis: Alasan 'لأنه...' selalu muncul untuk semua kata"
                  className={clsx(
                    'flex items-center gap-1 px-2.5 py-1 transition-colors border-l border-slate-200',
                    explanationMode === 'pedagogical'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <BookOpen size={12} /> Pemula
                </button>
              </div>
            </div>
          )}

          {/* Depth Selector: Lengkap, Sedang, Singkat */}
          {setDepth && (
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Kedalaman:</span>
              <div className="flex rounded-lg overflow-hidden border border-slate-200 text-xs font-medium bg-white">
                <button
                  onClick={() => setDepth('full')}
                  title="Lengkap: Rumus i'rab baku utuh"
                  className={clsx(
                    'flex items-center gap-1 px-2.5 py-1 transition-colors',
                    depth === 'full'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <FileText size={11} /> Lengkap
                </button>
                <button
                  onClick={() => setDepth('medium')}
                  title="Sedang: Format ringkas ber-alasan"
                  className={clsx(
                    'flex items-center gap-1 px-2.5 py-1 transition-colors border-l border-slate-200',
                    depth === 'medium'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <AlignLeft size={11} /> Sedang
                </button>
                <button
                  onClick={() => setDepth('short')}
                  title="Singkat: Peran & status gramatikal utama saja"
                  className={clsx(
                    'flex items-center gap-1 px-2.5 py-1 transition-colors border-l border-slate-200',
                    depth === 'short'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <Zap size={11} /> Singkat
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Output Content Area */}
      <div className="p-5 min-h-[90px] flex flex-col items-center justify-center">
        {resultText ? (
          <p dir="rtl" className="font-arabic text-xl sm:text-2xl leading-loose text-slate-800 text-center w-full">
            {displayText}
          </p>
        ) : (
          <p className="text-slate-400 text-sm text-center">Isi form di atas untuk menghasilkan I'rab.</p>
        )}
      </div>
    </div>
  );
}

