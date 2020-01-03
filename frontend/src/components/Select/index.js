import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import api from '~/services/api';

export default function Select() {
  const [students, setStudents] = useState([]);
  console.tron.log(students);

  async function getStudents() {
    const response = await api.get('students');
    setStudents(response.data);
  }

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={students}
      loadOptions={getStudents}
      isSearchable
    />
  );
}
