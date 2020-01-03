import React, { useState, useEffect } from 'react';

import AsyncSelect from 'react-select/async';
import Proptypes from 'prop-types';

import api from '~/services/api';

export default function SelectStudent({ defaultValue }) {
  async function filterOptions(inputValue) {
    const response = await api.get(`/students?${inputValue}`);

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

SelectStudent.propTypes = {
  defaultValue: Proptypes.string.isRequired,
};
