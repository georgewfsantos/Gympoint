import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DashHeader,
  StudentList,
  ListHeader,
  StudentInfo,
} from './styles';

export default function ListStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }
    loadStudents(students);
  }, [students]);

  async function handleSubmit(data) {
    try {
      const response = await api.get(`/students?name=${data.searchInput}`);

      setStudents(response.data);
    } catch (err) {
      toast.error('Nenhum estudante com este nome foi encontrado');
    }
  }

  function handleEdit(student) {
    history.push(`/students/${student.id}/edit`);
  }

  function handleNew() {
    history.push('/students/new');
  }

  async function handleDelete(student) {
    const permition = window.confirm(
      'Tem certeza de que deseja excluir este aluno ?'
    );

    if (permition) {
      try {
        await api.delete(`/students/${student.id}/delete`);
        toast.success('Aluno excluído com sucesso');
      } catch (err) {
        if (err.response) {
          toast.error(
            `${err.response.data.error}. Nenhum estudante com este nome foi encontrado`
          );
        }
      }
    }
  }

  return (
    <Container>
      <DashHeader>
        <strong> Gerenciando alunos</strong>
        <div id="manage">
          <button type="button" onClick={handleNew}>
            <MdAdd size={20} color="#FFF" /> Cadastrar
          </button>
          <Form onSubmit={handleSubmit}>
            <Input type="text" name="searchInput" placeholder="Buscar aluno" />
          </Form>
        </div>
      </DashHeader>
      {students.length > 0 && (
        <StudentList>
          <ListHeader>
            <div className="name">
              <strong>NOME</strong>
            </div>
            <div className="email">
              <strong>EMAIL</strong>
            </div>
            <div className="age">
              <strong>IDADE</strong>
            </div>
            <div className="blank">
              <strong />
            </div>
          </ListHeader>
          {students.map(student => (
            <StudentInfo key={student.id}>
              <div className="name">
                <span>{student.name}</span>
              </div>
              <div className="email">
                <span>{student.email}</span>
              </div>
              <div className="age">
                <span id="age">{student.age}</span>
              </div>
              <div id="action" className="blank">
                <button
                  type="button"
                  id="edit"
                  onClick={() => handleEdit(student)}
                >
                  editar
                </button>
                <button
                  type="button"
                  id="delete"
                  onClick={() => handleDelete(student)}
                >
                  apagar
                </button>
              </div>
            </StudentInfo>
          ))}
        </StudentList>
      )}
    </Container>
  );
}
