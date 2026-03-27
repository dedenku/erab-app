import React, { useState } from 'react';
import { Copy, RefreshCw, AlignLeft, FileText, Check, Baseline, Bookmark, BookmarkCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { stripHarakat, buildCompact } from '../utils/textUtils';

export default function OutputBox({ resultText, onReset, isComplete, onBookmark }) {
  const [mode, setMode] = useState('full');    // 'full' | 'compact'
  const [withHarakat, setWithHarakat] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedC, setCopiedC] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkedC, setBookmarkedC] = useState(false);

  const compactText = buildCompact(resultText);

  // Apply harakat filter
  const displayFull    = withHarakat ? resultText  : stripHarakat(resultText);
  const displayCompact = withHarakat ? compactText : stripHarakat(compactText);
  // Text that will actually be copied
  const copyFull    = displayFull;
  const copyCompact = displayCompact;

  const handleCopy = (text, setter) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 1800);
    });
  };

  const handleBookmark = () => {
    const text = mode === 'full' ? copyFull : copyCompact;
    if (!text || !onBookmark) return;
    
    onBookmark(text);
    if (mode === 'full') {
      setBookmarked(true);
      setTimeout(() => setBookmarked(false), 1500);
    } else {
      setBookmarkedC(true);
      setTimeout(() => setBookmarkedC(false), 1500);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 gap-2 flex-wrap">
        <h3 className="text-slate-700 font-semibold text-sm whitespace-nowrap">نتيجة الإعراب</h3>
        <div className="flex items-center gap-1.5 flex-wrap">
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
            <Baseline size={11} />
            {withHarakat ? 'Dengan Harakat' : 'Tanpa Harakat'}
          </button>
          {/* Mode toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setMode('full')}
              className={clsx(
                'flex items-center gap-1 px-2.5 py-1.5 transition-colors',
                mode === 'full' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
              )}
            >
              <FileText size={11} /> Lengkap
            </button>
            <button
              onClick={() => setMode('compact')}
              className={clsx(
                'flex items-center gap-1 px-2.5 py-1.5 transition-colors border-l border-slate-200',
                mode === 'compact' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
              )}
            >
              <AlignLeft size={11} /> Ringkas
            </button>
          </div>

          {/* Copy active version */}
          <button
            onClick={() => handleCopy(mode === 'full' ? copyFull : copyCompact, mode === 'full' ? setCopied : setCopiedC)}
            disabled={!isComplete}
            className={clsx(
              'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              isComplete
                ? (copied || copiedC)
                  ? 'bg-green-500 text-white'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            {(copied && mode === 'full') || (copiedC && mode === 'compact')
              ? <><Check size={13} /> Tersalin</>
              : <><Copy size={13} /> Salin</>}
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            disabled={!isComplete}
            title="Simpan ke Bookmark"
            className={clsx(
              'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              isComplete
                ? (bookmarked || bookmarkedC)
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            {(bookmarked && mode === 'full') || (bookmarkedC && mode === 'compact')
              ? <><BookmarkCheck size={13}/> Disimpan</>
              : <><Bookmark size={13}/> Simpan</>}
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <RefreshCw size={12} /> Ulangi
          </button>
        </div>
      </div>

      {/* Full output */}
      {mode === 'full' && (
        <div className="p-5 min-h-[90px] flex items-center justify-center">
          {resultText ? (
            <p dir="rtl" className="font-arabic text-xl sm:text-2xl leading-loose text-slate-800 text-center w-full">
              {displayFull}
            </p>
          ) : (
            <p className="text-slate-400 text-sm text-center">Isi form di atas untuk menghasilkan I'rab.</p>
          )}
        </div>
      )}

      {/* Compact output */}
      {mode === 'compact' && (
        <div className="p-5 min-h-[90px] flex flex-col items-center justify-center gap-3">
          {compactText ? (
            <>
              <p dir="rtl" className="font-arabic text-xl sm:text-2xl leading-loose text-slate-800 text-center w-full">
              {displayCompact}
              </p>
              {/* Also show compact copy separately */}

            </>
          ) : (
            <p className="text-slate-400 text-sm text-center">Isi form di atas untuk menghasilkan I'rab.</p>
          )}
        </div>
      )}
    </div>
  );
}
