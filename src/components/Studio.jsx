import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  Copy, ChevronLeft, Layout, Table, BookOpen, Code, Check,
  Plus, Trash2, Download, AlertTriangle, FileText, RotateCcw,
  Eye, EyeOff,
} from 'lucide-react';
import { clsx } from 'clsx';
import * as irabDataModule from '../data/irabData';
import { manualTemplates as initialTemplates, templateCategories } from '../data/manualTemplates';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isEmpty(v) {
  return !v || String(v).trim() === '';
}

// ─── Studio ───────────────────────────────────────────────────────────────────

export default function Studio() {
  const [activeTab, setActiveTab] = useState('roles');
  const [irabData, setIrabData] = useState(() => ({ ...irabDataModule }));
  const [templates, setTemplates] = useState(initialTemplates);

  // Separate copied states (bug fix)
  const [copiedIrab, setCopiedIrab] = useState(false);
  const [copiedTemplates, setCopiedTemplates] = useState(false);

  // Preview toggle for templates tab
  const [showPreview, setShowPreview] = useState(true);

  // Validation: highlight empty arabics
  const [showValidation, setShowValidation] = useState(false);

  // ── Dirty state ─────────────────────────────────────────────────────────────
  const isDirty = useMemo(() => {
    return (
      JSON.stringify(irabData.isimMurabRoles) !== JSON.stringify(irabDataModule.isimMurabRoles) ||
      JSON.stringify(irabData.signsByIrab)     !== JSON.stringify(irabDataModule.signsByIrab)    ||
      JSON.stringify(irabData.reasons)         !== JSON.stringify(irabDataModule.reasons)         ||
      JSON.stringify(templates)                !== JSON.stringify(initialTemplates)
    );
  }, [irabData, templates]);

  // ── Validation: detect empty Arabic fields ───────────────────────────────────
  const validationErrors = useMemo(() => {
    const errors = [];
    irabData.isimMurabRoles.forEach((r, i) => {
      if (isEmpty(r.arabic)) errors.push(`Kedudukan #${i + 1} (${r.label}): field Arabic kosong.`);
    });
    Object.entries(irabData.signsByIrab).forEach(([type, signs]) => {
      signs.forEach((s, i) => {
        if (isEmpty(s.arabic)) errors.push(`Tanda ${type.toUpperCase()} #${i + 1}: field Arabic kosong.`);
      });
    });
    Object.entries(irabData.reasons).forEach(([key, r]) => {
      if (isEmpty(r.arabic)) errors.push(`Alasan "${key}": field Arabic kosong.`);
    });
    templates.forEach(t => {
      if (isEmpty(t.text)) errors.push(`Template "${t.title}": teks i'rab kosong.`);
    });
    return errors;
  }, [irabData, templates]);

  // ── Data update helpers ──────────────────────────────────────────────────────
  const updateData = useCallback((key, value) => {
    setIrabData(prev => ({ ...prev, [key]: value }));
  }, []);

  // ── Kedudukan CRUD ────────────────────────────────────────────────────────────
  const addRole = useCallback(() => {
    updateData('isimMurabRoles', [
      ...irabDataModule.isimMurabRoles.length > 0 ? [] : [],
    ]);
    setIrabData(prev => ({
      ...prev,
      isimMurabRoles: [
        ...prev.isimMurabRoles,
        { value: `role_${Date.now()}`, arabic: '', label: 'Kedudukan Baru', irab: 'rafa' },
      ],
    }));
  }, []);

  const deleteRole = useCallback((idx) => {
    if (!confirm('Hapus kedudukan ini?')) return;
    setIrabData(prev => ({
      ...prev,
      isimMurabRoles: prev.isimMurabRoles.filter((_, i) => i !== idx),
    }));
  }, []);

  // ── Tanda I'rab CRUD ─────────────────────────────────────────────────────────
  const addSign = useCallback((type) => {
    setIrabData(prev => {
      const next = {
        ...prev.signsByIrab,
        [type]: [
          ...prev.signsByIrab[type],
          { value: `sign_${Date.now()}`, label: 'Tanda Baru', arabic: '', signCategory: 'zahirah', reasons: [] },
        ],
      };
      return { ...prev, signsByIrab: next };
    });
  }, []);

  const deleteSign = useCallback((type, idx) => {
    if (!confirm('Hapus tanda ini?')) return;
    setIrabData(prev => {
      const next = {
        ...prev.signsByIrab,
        [type]: prev.signsByIrab[type].filter((_, i) => i !== idx),
      };
      return { ...prev, signsByIrab: next };
    });
  }, []);

  // ── Alasan CRUD ───────────────────────────────────────────────────────────────
  const addReason = useCallback(() => {
    const newKey = `alasan_${Date.now()}`;
    setIrabData(prev => ({
      ...prev,
      reasons: { ...prev.reasons, [newKey]: { label: 'Alasan Baru', arabic: '' } },
    }));
  }, []);

  const deleteReason = useCallback((key) => {
    if (!confirm(`Hapus alasan "${key}"?`)) return;
    setIrabData(prev => {
      const next = { ...prev.reasons };
      delete next[key];
      return { ...prev, reasons: next };
    });
  }, []);

  const renameReasonKey = useCallback((oldKey, newKey) => {
    const trimmed = newKey.trim();
    if (!trimmed || trimmed === oldKey) return;
    setIrabData(prev => {
      if (prev.reasons[trimmed]) { alert('Key sudah ada!'); return prev; }
      const next = {};
      Object.entries(prev.reasons).forEach(([k, v]) => {
        next[k === oldKey ? trimmed : k] = v;
      });
      return { ...prev, reasons: next };
    });
  }, []);

  // ── Templates CRUD ────────────────────────────────────────────────────────────
  const updateTemplate = useCallback((id, field, value) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  }, []);

  const addTemplate = useCallback(() => {
    const newId = `tpl_${Date.now()}`;
    setTemplates(prev => [...prev, {
      id: newId,
      category: templateCategories[0].value,
      title: 'Template Baru',
      hint: '',
      text: '',
    }]);
  }, []);

  const deleteTemplate = useCallback((id) => {
    if (!confirm('Hapus template ini?')) return;
    setTemplates(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    if (!confirm('Reset semua perubahan ke data awal? Perubahan yang belum dieksport/diunduh akan hilang.')) return;
    setIrabData({ ...irabDataModule });
    setTemplates(initialTemplates);
  }, []);

  // ── Code generation ──────────────────────────────────────────────────────────
  const generateIrabDataCode = useCallback(() => {
    const exportKeys = [
      'wordTypes', 'isimCategories', 'fiilCategories', 'hurufCategories',
      'irabTypes', 'mabniSigns', 'mahalIrab', 'isimMurabRoles',
      'isimMabniTypes', 'signsByIrab', 'reasons',
      'fiilMadhiMabniOptions', 'fiilAmrMabniOptions',
    ];
    let code = `// ─── Generated by Erab Studio ────────────────────────────────────────────\n\n`;
    exportKeys.forEach(key => {
      code += `export const ${key} = ${JSON.stringify(irabData[key], null, 2)};\n\n`;
    });
    return code;
  }, [irabData]);

  const generateTemplatesCode = useCallback(() => {
    return `export const templateCategories = ${JSON.stringify(templateCategories, null, 2)};\n\nexport const manualTemplates = ${JSON.stringify(templates, null, 2)};`;
  }, [templates]);

  // ── Download & Copy ──────────────────────────────────────────────────────────
  const downloadFile = useCallback((content, filename) => {
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleCopy = useCallback((code, setter) => {
    navigator.clipboard.writeText(code).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  }, []);

  // ── Tab config ───────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'roles',     label: 'Kedudukan',        icon: Layout   },
    { id: 'signs',     label: 'Tanda I\'rab',      icon: Table    },
    { id: 'reasons',   label: 'Alasan (Reasons)',  icon: BookOpen },
    { id: 'templates', label: 'Templates',         icon: FileText },
    { id: 'export',    label: 'Export / Download', icon: Code     },
  ];

  // ── Input class helper (validation highlight) ────────────────────────────────
  const inputCls = (val, extra = '') =>
    clsx(
      'w-full bg-white border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-colors',
      showValidation && isEmpty(val)
        ? 'border-red-400 bg-red-50 focus:ring-red-400'
        : 'border-slate-200',
      extra,
    );
  const arabicInputCls = (val) =>
    clsx(
      inputCls(val),
      'text-lg font-arabic leading-loose',
    );

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

        {/* ── Header ── */}
        <div className="bg-emerald-700 p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Code size={22} /> Erab Studio
            </h1>
            <p className="text-emerald-100 text-sm mt-0.5">
              Kelola data tata bahasa dan template secara visual.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {isDirty && (
              <span className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/40 text-amber-100 text-xs px-3 py-1.5 rounded-xl font-medium">
                <AlertTriangle size={13} /> Belum dieksport
              </span>
            )}
            <button
              onClick={handleReset}
              title="Reset semua ke data awal"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
            >
              <RotateCcw size={14} /> Reset Default
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 rounded-xl text-sm font-medium transition-all"
            >
              <ChevronLeft size={16} /> Kembali ke App
            </button>
          </div>
        </div>

        {/* ── Dirty Banner ── */}
        {isDirty && (
          <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-center gap-2 text-amber-800 text-sm">
            <AlertTriangle size={15} className="shrink-0 text-amber-500" />
            <span>
              Ada perubahan yang belum disimpan. Buka tab{' '}
              <button
                onClick={() => setActiveTab('export')}
                className="font-bold underline underline-offset-2 hover:text-amber-900"
              >
                Export / Download
              </button>{' '}
              untuk mengunduh atau menyalin kode terbaru.
            </span>
          </div>
        )}

        {/* ── Validation Banner ── */}
        {showValidation && validationErrors.length > 0 && (
          <div className="bg-red-50 border-b border-red-200 px-5 py-3">
            <p className="text-red-700 text-sm font-semibold mb-1">⚠️ {validationErrors.length} field wajib belum diisi:</p>
            <ul className="list-disc list-inside text-red-600 text-xs space-y-0.5">
              {validationErrors.slice(0, 5).map((e, i) => <li key={i}>{e}</li>)}
              {validationErrors.length > 5 && <li>...dan {validationErrors.length - 5} lainnya.</li>}
            </ul>
          </div>
        )}

        {/* ── Body: Sidebar + Content ── */}
        <div className="flex flex-col md:flex-row min-h-[600px]">

          {/* Sidebar Navigation */}
          <div className="w-full md:w-56 bg-slate-50 border-r border-slate-200 p-3 shrink-0">
            <div className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                    activeTab === tab.id
                      ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  )}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-4 px-2">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Validasi</p>
              <button
                onClick={() => setShowValidation(v => !v)}
                className={clsx(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all',
                  showValidation
                    ? 'bg-red-100 text-red-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {showValidation ? <EyeOff size={13} /> : <Eye size={13} />}
                {showValidation ? 'Sembunyikan' : 'Tampilkan'} Error
                {showValidation && validationErrors.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white rounded-full px-1.5 text-[10px] font-bold">
                    {validationErrors.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 p-5 sm:p-6 overflow-x-auto">

            {/* ══ TAB: KEDUDUKAN ══ */}
            {activeTab === 'roles' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">Isim Mu'rab — Kedudukan (Roles)</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{irabData.isimMurabRoles.length} item</span>
                    <button
                      onClick={addRole}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      <Plus size={13} /> Tambah
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  Edit label (tampilan dropdown) dan teks Arab yang muncul dalam kalimat i'rab output.
                </p>
                <div className="grid gap-3">
                  {irabData.isimMurabRoles.map((role, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        'p-4 rounded-2xl border grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end',
                        showValidation && isEmpty(role.arabic)
                          ? 'bg-red-50 border-red-200'
                          : 'bg-slate-50 border-slate-200'
                      )}
                    >
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Label (Dropdown)</label>
                        <input
                          type="text"
                          value={role.label}
                          onChange={e => {
                            const next = [...irabData.isimMurabRoles];
                            next[idx] = { ...next[idx], label: e.target.value };
                            updateData('isimMurabRoles', next);
                          }}
                          className={inputCls(role.label)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                          Teks Arab{showValidation && isEmpty(role.arabic) && <span className="text-red-500 ml-1">⚠ Wajib diisi</span>}
                        </label>
                        <input
                          type="text"
                          dir="rtl"
                          value={role.arabic}
                          onChange={e => {
                            const next = [...irabData.isimMurabRoles];
                            next[idx] = { ...next[idx], arabic: e.target.value };
                            updateData('isimMurabRoles', next);
                          }}
                          className={arabicInputCls(role.arabic)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Jenis I'rab</label>
                        <select
                          value={role.irab}
                          onChange={e => {
                            const next = [...irabData.isimMurabRoles];
                            next[idx] = { ...next[idx], irab: e.target.value };
                            updateData('isimMurabRoles', next);
                          }}
                          className={inputCls(role.irab)}
                        >
                          <option value="rafa">Rafa'</option>
                          <option value="nashab">Nashab</option>
                          <option value="jar">Jar</option>
                          <option value="all">Semua (Na'at/Athaf dll)</option>
                        </select>
                      </div>
                      <button
                        onClick={() => deleteRole(idx)}
                        title="Hapus kedudukan ini"
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors self-end mb-0.5"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addRole}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-emerald-200 text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 text-sm font-medium transition-all"
                >
                  <Plus size={15} /> Tambah Kedudukan Baru
                </button>
              </div>
            )}

            {/* ══ TAB: TANDA I'RAB ══ */}
            {activeTab === 'signs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">Tanda I'rab (Signs)</h2>
                </div>
                <p className="text-sm text-slate-500">
                  Edit label dan teks Arab dari setiap tanda i'rab per kategori (Rafa', Nashab, Jar, Jazm).
                </p>
                {Object.entries(irabData.signsByIrab).map(([type, signs]) => (
                  <div key={type} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <h3 className="font-bold text-emerald-700 uppercase tracking-widest text-xs">
                        {type.toUpperCase()} — {signs.length} tanda
                      </h3>
                      <button
                        onClick={() => addSign(type)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      >
                        <Plus size={11} /> Tambah tanda {type}
                      </button>
                    </div>
                    <div className="grid gap-3">
                      {signs.map((sign, idx) => (
                        <div
                          key={idx}
                          className={clsx(
                            'p-4 rounded-2xl border grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end',
                            showValidation && isEmpty(sign.arabic)
                              ? 'bg-red-50 border-red-200'
                              : 'bg-slate-50 border-slate-100'
                          )}
                        >
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Label</label>
                            <input
                              type="text"
                              value={sign.label}
                              onChange={e => {
                                const next = { ...irabData.signsByIrab };
                                next[type] = [...next[type]];
                                next[type][idx] = { ...next[type][idx], label: e.target.value };
                                updateData('signsByIrab', next);
                              }}
                              className={inputCls(sign.label)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                              Teks Arab{showValidation && isEmpty(sign.arabic) && <span className="text-red-500 ml-1">⚠ Wajib diisi</span>}
                            </label>
                            <input
                              type="text"
                              dir="rtl"
                              value={sign.arabic}
                              onChange={e => {
                                const next = { ...irabData.signsByIrab };
                                next[type] = [...next[type]];
                                next[type][idx] = { ...next[type][idx], arabic: e.target.value };
                                updateData('signsByIrab', next);
                              }}
                              className={arabicInputCls(sign.arabic)}
                            />
                          </div>
                          <button
                            onClick={() => deleteSign(type, idx)}
                            title="Hapus tanda ini"
                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors mb-0.5"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ══ TAB: ALASAN (REASONS) ══ */}
            {activeTab === 'reasons' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">Alasan Tanda (Reasons)</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{Object.keys(irabData.reasons).length} item</span>
                    <button
                      onClick={addReason}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      <Plus size={13} /> Tambah
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  Teks Arab ini muncul di akhir kalimat i'rab sebagai alasan penggunaan tanda, contoh:{' '}
                  <span className="font-arabic text-base text-slate-700">لِأَنَّهُ اسْمٌ مُفْرَدٌ</span>
                </p>
                <div className="grid gap-3">
                  {Object.entries(irabData.reasons).map(([key, r]) => (
                    <div
                      key={key}
                      className={clsx(
                        'p-4 rounded-2xl border grid grid-cols-1 sm:grid-cols-[160px_1fr_1fr_auto] gap-3 items-end',
                        showValidation && isEmpty(r.arabic)
                          ? 'bg-red-50 border-red-200'
                          : 'bg-slate-50 border-slate-200'
                      )}
                    >
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Key (ID Kode)</label>
                        <input
                          type="text"
                          defaultValue={key}
                          onBlur={e => renameReasonKey(key, e.target.value)}
                          className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Label (Indonesia)</label>
                        <input
                          type="text"
                          value={r.label}
                          onChange={e => {
                            const next = { ...irabData.reasons, [key]: { ...r, label: e.target.value } };
                            updateData('reasons', next);
                          }}
                          className={inputCls(r.label)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                          Teks Arab{showValidation && isEmpty(r.arabic) && <span className="text-red-500 ml-1">⚠ Wajib diisi</span>}
                        </label>
                        <input
                          type="text"
                          dir="rtl"
                          value={r.arabic}
                          onChange={e => {
                            const next = { ...irabData.reasons, [key]: { ...r, arabic: e.target.value } };
                            updateData('reasons', next);
                          }}
                          className={arabicInputCls(r.arabic)}
                        />
                      </div>
                      <button
                        onClick={() => deleteReason(key)}
                        title="Hapus alasan ini"
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors mb-0.5"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addReason}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-emerald-200 text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 text-sm font-medium transition-all"
                >
                  <Plus size={15} /> Tambah Alasan Baru
                </button>
              </div>
            )}

            {/* ══ TAB: TEMPLATES ══ */}
            {activeTab === 'templates' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">Manual Templates</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPreview(v => !v)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
                      {showPreview ? 'Sembunyikan' : 'Tampilkan'} Preview
                    </button>
                    <button
                      onClick={addTemplate}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      <Plus size={13} /> Tambah Template
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  Template teks i'rab siap pakai untuk kasus-kasus khusus. Anda bisa menambah, mengedit, atau menghapus template.
                </p>
                <div className="grid gap-5">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      className={clsx(
                        'p-5 rounded-2xl border space-y-3',
                        showValidation && isEmpty(template.text)
                          ? 'bg-red-50 border-red-200'
                          : 'bg-slate-50 border-slate-200'
                      )}
                    >
                      {/* Template Header */}
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={template.title}
                          onChange={e => updateTemplate(template.id, 'title', e.target.value)}
                          placeholder="Judul template..."
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <select
                          value={template.category}
                          onChange={e => updateTemplate(template.id, 'category', e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                          {templateCategories.map(c => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          title="Hapus template ini"
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Teks Arab */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                          Teks I'rab (Arab){showValidation && isEmpty(template.text) && <span className="text-red-500 ml-1">⚠ Wajib diisi</span>}
                        </label>
                        <textarea
                          dir="rtl"
                          rows={3}
                          value={template.text}
                          onChange={e => updateTemplate(template.id, 'text', e.target.value)}
                          placeholder="...اكتب نص الإعراب هنا"
                          className={clsx(
                            'w-full bg-white border rounded-xl px-4 py-3 text-xl font-arabic leading-loose focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-colors',
                            showValidation && isEmpty(template.text)
                              ? 'border-red-400 bg-red-50 focus:ring-red-400'
                              : 'border-slate-200'
                          )}
                        />
                      </div>

                      {/* Live Preview */}
                      {showPreview && template.text && (
                        <div className="bg-white border border-emerald-100 rounded-xl px-4 py-3">
                          <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold mb-1">Preview Tampilan</p>
                          <p dir="rtl" className="font-arabic text-xl leading-loose text-slate-800 text-right">
                            {template.text}
                          </p>
                        </div>
                      )}

                      {/* Hint */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Contoh / Hint (opsional)</label>
                        <input
                          type="text"
                          value={template.hint}
                          onChange={e => updateTemplate(template.id, 'hint', e.target.value)}
                          placeholder="Contoh kata atau kalimat..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-500 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addTemplate}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-emerald-200 text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 text-sm font-medium transition-all"
                >
                  <Plus size={15} /> Tambah Template Baru
                </button>
              </div>
            )}

            {/* ══ TAB: EXPORT / DOWNLOAD ══ */}
            {activeTab === 'export' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-1">Export / Download</h2>
                  <p className="text-sm text-slate-500">
                    Unduh file hasil edit kemudian ganti file asli di folder <code className="bg-slate-100 px-1 rounded">src/data/</code>. Atau, salin kode secara manual.
                  </p>
                </div>

                {/* Validation warning sebelum download */}
                {validationErrors.length > 0 && (
                  <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-amber-800 text-sm">
                    <AlertTriangle size={18} className="text-amber-500 shrink-0" />
                    <span>
                      Terdapat <strong>{validationErrors.length} field kosong</strong>. Aktifkan{' '}
                      <button onClick={() => { setShowValidation(true); }} className="underline font-bold">Tampilkan Error</button>{' '}
                      di sidebar untuk melihat detail sebelum mengeksport.
                    </span>
                  </div>
                )}

                {/* ── Panduan Replace Singkat ── */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-900 text-sm">
                  <h4 className="font-bold mb-3 text-base">📋 Panduan: Cara Menerapkan Perubahan</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Cara A: Download */}
                    <div className="bg-white rounded-xl p-4 border border-emerald-200">
                      <p className="font-bold text-emerald-700 mb-2">⬇️ Cara A — Download (Disarankan)</p>
                      <ol className="list-decimal list-inside space-y-1 text-emerald-800 text-xs leading-relaxed">
                        <li>Klik tombol <strong>Download</strong> di bawah.</li>
                        <li>Buka folder <code className="bg-emerald-100 px-1 rounded">erab-app/src/data/</code></li>
                        <li>Ganti file lama dengan file yang baru diunduh.</li>
                        <li>Simpan → aplikasi otomatis terupdate!</li>
                      </ol>
                    </div>
                    {/* Cara B: Copy-Paste */}
                    <div className="bg-white rounded-xl p-4 border border-emerald-200">
                      <p className="font-bold text-emerald-700 mb-2">📋 Cara B — Copy-Paste Manual</p>
                      <ol className="list-decimal list-inside space-y-1 text-emerald-800 text-xs leading-relaxed">
                        <li>Klik tombol <strong>Salin Kode</strong> di bawah.</li>
                        <li>Buka file tujuan di editor kode (misal VSCode).</li>
                        <li>Pilih semua isi file (<kbd>Ctrl+A</kbd>) lalu paste (<kbd>Ctrl+V</kbd>).</li>
                        <li>Simpan file (<kbd>Ctrl+S</kbd>).</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* ── irabData.js ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-bold text-slate-700">irabData.js</h3>
                      <p className="text-xs text-slate-400">Berisi: Kedudukan, Tanda I'rab, Alasan</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadFile(generateIrabDataCode(), 'irabData.js')}
                        className="flex items-center gap-1.5 text-sm bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all font-semibold shadow-sm"
                      >
                        <Download size={15} /> Download irabData.js
                      </button>
                      <button
                        onClick={() => handleCopy(generateIrabDataCode(), setCopiedIrab)}
                        className="flex items-center gap-1.5 text-sm bg-slate-100 text-slate-700 px-3 py-2 rounded-xl hover:bg-slate-200 transition-all font-medium"
                      >
                        {copiedIrab ? <Check size={14} /> : <Copy size={14} />}
                        {copiedIrab ? 'Tersalin!' : 'Salin Kode'}
                      </button>
                    </div>
                  </div>
                  <pre className="bg-slate-900 text-slate-300 p-5 rounded-2xl text-[10px] sm:text-xs overflow-x-auto max-h-[320px] leading-relaxed">
                    {generateIrabDataCode()}
                  </pre>
                </div>

                {/* ── manualTemplates.js ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-bold text-slate-700">manualTemplates.js</h3>
                      <p className="text-xs text-slate-400">Berisi: daftar template teks i'rab siap pakai</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadFile(generateTemplatesCode(), 'manualTemplates.js')}
                        className="flex items-center gap-1.5 text-sm bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all font-semibold shadow-sm"
                      >
                        <Download size={15} /> Download manualTemplates.js
                      </button>
                      <button
                        onClick={() => handleCopy(generateTemplatesCode(), setCopiedTemplates)}
                        className="flex items-center gap-1.5 text-sm bg-slate-100 text-slate-700 px-3 py-2 rounded-xl hover:bg-slate-200 transition-all font-medium"
                      >
                        {copiedTemplates ? <Check size={14} /> : <Copy size={14} />}
                        {copiedTemplates ? 'Tersalin!' : 'Salin Kode'}
                      </button>
                    </div>
                  </div>
                  <pre className="bg-slate-900 text-slate-300 p-5 rounded-2xl text-[10px] sm:text-xs overflow-x-auto max-h-[240px] leading-relaxed">
                    {generateTemplatesCode()}
                  </pre>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
