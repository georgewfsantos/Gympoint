import React, { useState, useEffect } from 'react';

import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function SelectStudent({ defaultValue }) {
  const [student, setStudent] = useState([]);

  async function filterOptions(inputValue) {
    const response = api.get(`/students?${student.name}`);

    const options = response.data.map(r => ({
      label: r.name,
      value: r.id,
    }));

    return options.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterOptions(inputValue));
    });
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      value={value}
    />
  );
}
