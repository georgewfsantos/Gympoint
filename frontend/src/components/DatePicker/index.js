import React, { useRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prop-types
export default function Datepicker({ name }) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    // eslint-disable-next-line
  }, [fieldName, ref.current]);

  useEffect(() => {
    if (!defaultValue) {
      setSelected(new Date());
    } else {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <DatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
