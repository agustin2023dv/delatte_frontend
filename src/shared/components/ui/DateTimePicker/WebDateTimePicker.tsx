// src/shared/components/DateTimePicker/WebDateTimePicker.tsx

import React, { useState } from 'react';
import { DateTimePickerProps } from './types';

export const WebDateTimePicker: React.FC<DateTimePickerProps> = ({
  mode,
  value,
  onChange,
  label = 'Selecciona una fecha/hora',
}) => {
  const [currentValue, setCurrentValue] = useState<string>(
    mode === 'date'
      ? value.toISOString().split('T')[0]
      : value.toTimeString().slice(0, 5)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newDate = new Date(newValue);

    if (!isNaN(newDate.getTime())) {
      setCurrentValue(newValue);
      onChange(newDate);
    }
  };

  return (
    <div className="date-time-picker" style={styles.container}>
      <label style={styles.label}>{label}</label>
      <input
        type={mode}
        value={currentValue}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block' as const,
    fontWeight: 'bold' as const,
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
};