import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, BookOpen, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { templateCategories, manualTemplates } from '../data/manualTemplates';

const HISTORY_KEY = 'irab_manual_history';

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 10)));
}

export default function ManualEditor() {
  const [selectedCategory, setSelectedCategory] = useState('isim_khusus');
  const [editText, setEditText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(loadHistory);

  const filteredTemplates = manualTemplates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (tpl) => {
    setEditText(tpl.text);
  };

  const handleCopy = () => {
    if (!editText.trim()) return;
    navigator.clipboard.writeText(editText).then(() => {
      // Save to history
      const entry = { text: editText, time: Date.now() };
      const next = [entry, ...history.filter(h => h.text !== editText)];
      setHistory(next);
      saveHistory(next);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLoadHistory = (item) => {
    setEditText(item.text);
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <div className="w-full">
      <p className="text-slate-500 text-sm mb-5">
        Pilih template i'rab siap pakai untuk kasus-kasus khusus, edit sesuai kebutuhan, lalu salin.
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {templateCategories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              selectedCategory === cat.value
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5 max-h-60 overflow-y-auto pr-1">
        {filteredTemplates.map(tpl => (
          <button
            key={tpl.id}
            onClick={() => handleSelectTemplate(tpl)}
            className={clsx(
              'text-left p-3 rounded-xl border transition-all',
              editText === tpl.text
                ? 'border-emerald-400 bg-emerald-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
            )}
          >
            <div className="flex items-start gap-2">
              <BookOpen size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-700 text-xs">{tpl.title}</div>
                {tpl.hint && <div className="text-slate-400 text-xs mt-0.5">{tpl.hint}</div>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Editable Text Area */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">
            Teks I'rab — bisa diedit bebas
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={clsx(
                'flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                showHistory ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              <Clock size={12} /> Riwayat ({history.length})
            </button>
            <button
              onClick={() => setEditText('')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <RotateCcw size={12} /> Bersihkan
            </button>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1.5 max-h-48 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-2">Belum ada riwayat.</p>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500 font-medium">10 terakhir disalin</span>
                  <button onClick={handleClearHistory} className="text-xs text-red-400 hover:text-red-600">
                    Hapus semua
                  </button>
                </div>
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handleLoadHistory(h)}
                    dir="rtl"
                    className="w-full text-right text-sm font-arabic text-slate-700 p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 transition-colors truncate block"
                  >
                    {h.text}
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        <textarea
          dir="rtl"
          rows={4}
          className="w-full border border-slate-200 rounded-xl py-3 px-4 text-xl font-arabic leading-loose focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none bg-slate-50 placeholder:text-slate-300"
          placeholder="...اختر قالباً من فوق أو اكتب نصك هنا"
          value={editText}
          onChange={e => setEditText(e.target.value)}
        />
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        disabled={!editText.trim()}
        className={clsx(
          'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
          editText.trim()
            ? copied
              ? 'bg-green-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-100'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        )}
      >
        <Copy size={16} />
        {copied ? 'Tersalin! ✓' : 'Salin ke Clipboard'}
      </button>
    </div>
  );
}
