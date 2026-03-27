import React, { useState, useEffect } from 'react';
import IrabBuilder from './components/IrabBuilder';
import ManualEditor from './components/ManualEditor';
import BookmarkPanel from './components/BookmarkPanel';
import Studio from './components/Studio';
import { useBookmarks } from './hooks/useBookmarks';
import { clsx } from 'clsx';
import { Cpu, FileEdit, Heart } from 'lucide-react';

const tabs = [
  { id: 'auto',   label: "I'rab Otomatis", icon: Cpu,      desc: "Susun i'rab langkah demi langkah lewat dropdown kondisional." },
  { id: 'manual', label: 'Template Manual', icon: FileEdit, desc: "Pilih template kasus khusus, edit bebas, lalu salin." },
];

function App() {
  const [activeTab, setActiveTab] = useState('auto');
  const [showStudio, setShowStudio] = useState(window.location.pathname === '/studio');
  const { bookmarks, save, remove, clear } = useBookmarks();

  useEffect(() => {
    const handleLocationChange = () => {
      setShowStudio(window.location.pathname === '/studio');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (showStudio) {
    return <Studio />;
  }

  const handleSaveBookmark = (text) => {
    save({
      id: Date.now().toString(),
      text,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 flex flex-col items-center justify-start py-8 px-4 sm:py-12">
      <div className="w-full max-w-xl">

        {/* ── Header ── */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 rounded-2xl mb-3 shadow-lg shadow-emerald-200">
            <span className="text-white text-xl sm:text-2xl font-arabic font-bold">إع</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Erab
          </h1>
          <p className="mt-1 text-slate-500 text-xs sm:text-sm">
            أداة تركيب الإعراب التفاعلية
          </p>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-100">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs sm:text-sm font-semibold transition-colors relative',
                    activeTab === tab.id
                      ? 'text-emerald-700 bg-emerald-50/60'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab description */}
          <div className="px-4 sm:px-6 pt-3 pb-1">
            <p className="text-xs text-slate-400">
              {tabs.find(t => t.id === activeTab)?.desc}
            </p>
          </div>

          {/* Tab Content */}
          <div className="px-4 sm:px-6 pb-6 pt-2">
            {activeTab === 'auto'   && <IrabBuilder onBookmark={handleSaveBookmark} />}
            {activeTab === 'manual' && <ManualEditor />}
          </div>
        </div>

        {/* Bookmark Panel */}
        {activeTab === 'auto' && (
          <BookmarkPanel 
            bookmarks={bookmarks} 
            onRemove={remove} 
            onClear={clear} 
          />
        )}

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8 bg-slate-200" />
            <span className="text-emerald-600 font-arabic font-bold text-lg">إع</span>
            <div className="h-px w-8 bg-slate-200" />
          </div>
          <p className="text-slate-500 text-sm font-semibold">
            Erab <span className="text-slate-300 font-normal mx-1">|</span> Penyusun I'rab Digital
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-slate-400 text-xs">
            <span>Dibuat dengan</span>
            <Heart size={10} className="text-red-400 fill-current" />
            <span>berdasarkan kaidah Nahwu baku</span>
          </div>
          <p className="text-slate-300 text-[10px] uppercase tracking-widest mt-4 mt-6">
            &copy; {new Date().getFullYear()} Erab Tool
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
