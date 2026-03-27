import React, { useState } from 'react';
import { Trash2, Copy, Check, BookmarkX, ChevronUp, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export default function BookmarkPanel({ bookmarks, onRemove, onClear }) {
  const [copiedId, setCopiedId]   = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.text).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1800);
    });
  };

  if (bookmarks.length === 0) return null;

  return (
    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-amber-100/70 border-b border-amber-200">
        <button
          onClick={() => setCollapsed(v => !v)}
          className="flex items-center gap-2 text-amber-800 font-semibold text-sm"
        >
          {collapsed ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
          📌 Bookmark ({bookmarks.length})
        </button>
        <button
          onClick={onClear}
          title="Hapus semua bookmark"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-600 hover:text-red-600 hover:bg-amber-100/50 transition-all"
        >
          <BookmarkX size={16} />
        </button>
      </div>

      {/* List */}
      {!collapsed && (
        <ul className="divide-y divide-amber-100 max-h-72 overflow-y-auto">
          {bookmarks.map(item => (
            <li key={item.id} className="flex items-start gap-2 px-4 py-3 hover:bg-amber-50 transition-colors">
              {/* Text */}
              <p
                dir="rtl"
                className="flex-1 font-arabic text-base leading-loose text-slate-800 text-right"
              >
                {item.text}
              </p>
              {/* Actions */}
              <div className="flex flex-col gap-1 flex-shrink-0 pt-1">
                <button
                  onClick={() => handleCopy(item)}
                  title="Salin"
                  className={clsx(
                    'p-1.5 rounded-lg transition-colors',
                    copiedId === item.id
                      ? 'bg-green-100 text-green-600'
                      : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                  )}
                >
                  {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  title="Hapus bookmark ini"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
