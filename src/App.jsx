import React, { useState } from 'react';
import IrabBuilder from './components/IrabBuilder';
import ManualEditor from './components/ManualEditor';
import { clsx } from 'clsx';
import { Cpu, FileEdit } from 'lucide-react';

const tabs = [
  { id: 'auto',   label: "I'rab Otomatis", icon: Cpu,      desc: "Susun i'rab langkah demi langkah lewat dropdown kondisional." },
  { id: 'manual', label: 'Template Manual', icon: FileEdit, desc: "Pilih template kasus khusus, edit bebas, lalu salin." },
];

function App() {
  const [activeTab, setActiveTab] = useState('auto');

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
            {activeTab === 'auto'   && <IrabBuilder />}
            {activeTab === 'manual' && <ManualEditor />}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-5">
          Erab · Based on standard Arabic Nahwu rules · v2
        </p>
      </div>
    </div>
  );
}

export default App;
