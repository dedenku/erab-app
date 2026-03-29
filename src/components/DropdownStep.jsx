import React from 'react';
import Select from 'react-select';

export default function DropdownStep({ label, options, value, onChange, placeholder, isDisabled }) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#10b981' : '#cbd5e1',
      boxShadow: state.isFocused ? '0 0 0 1px #10b981' : 'none',
      padding: '2px',
      borderRadius: '0.5rem',
      backgroundColor: isDisabled ? '#f1f5f9' : 'white',
      '&:hover': {
        borderColor: state.isFocused ? '#10b981' : '#94a3b8'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#ecfdf5' : 'white',
      color: state.isSelected ? 'white' : '#334155',
      cursor: 'pointer',
      padding: '10px 14px',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#0f172a',
    })
  };

  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <Select
        styles={customStyles}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Pilih...'}
        isDisabled={isDisabled}
        isSearchable={false}
        className="text-base"
        isClearable
      />
    </div>
  );
}
