import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { toast } from 'react-toastify';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DashHeader,
  EnrollmentList,
  ListHeader,
  EnrollmentInfo,
} from './styles';

export default function ListEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  async function loadEnrollments() {
    const response = await api.get('/enrollments');
    setEnrollments(response.data);
  }

  useEffect(() => {
    loadEnrollments(enrollments);
    // eslint-disable-next-line
  }, []);

  function handleEdit(enrollment) {
    history.push(`/enrollments/${enrollment.id}/edit`);
  }

  function handleNew() {
    history.push('enrollments/new');
  }

  async function handleDelete(enrollment) {
    const permition = window.confirm(
      'Tem certeza de que deseja excluir esta matrícula ?'
    );

    if (permition) {
      try {
        await api.delete(`/enrollments/${enrollment.id}/delete`);
        loadEnrollments(enrollments);
        toast.success('Matrícula excluída com sucesso');
        loadEnrollments();
      } catch (err) {
        if (err.response) {
          toast.error(
            `${err.response.data.error}. Nenhuma matrícula com essa ID foi encontrada`
          );
        }
      }
    }
  }

  return (
    <Container>
      <DashHeader>
        <strong>Gerenciando matrículas</strong>
        <button type="button" onClick={handleNew}>
          <MdAdd size={20} color="#FFF" />
          Cadastrar
        </button>
      </DashHeader>
      {enrollments.length > 0 ? (
        <EnrollmentList>
          <ListHeader>
            <div className="student">
              <strong>ALUNO</strong>
            </div>
            <div>
              <strong>PLANO</strong>
            </div>
            <div>
              <strong>INÍCIO</strong>
            </div>
            <div>
              <strong>TÉRMINO</strong>
            </div>
            <div>
              <strong>ATIVA</strong>
            </div>
            <div>
              <strong />
            </div>
          </ListHeader>
          {enrollments.map(enrollment => (
            <EnrollmentInfo key={enrollment.id}>
              <div className="student">
                <span>{enrollment.student.name}</span>
              </div>
              <div>
                <span>{enrollment.plan.title}</span>
              </div>
              <div>
                <span>
                  {format(
                    parseISO(enrollment.start_date),
                    "dd' de 'MMMM' de 'yyyy",
                    {
                      locale: pt,
                    }
                  )}
                </span>
              </div>
              <div>
                <span>
                  {format(
                    parseISO(enrollment.end_date),
                    "dd' de 'MMMM' de 'yyyy",
                    {
                      locale: pt,
                    }
                  )}
                </span>
              </div>
              <div>
                <span>
                  {enrollment.active ? (
                    <MdCheckCircle size={20} color="#42cb59" />
                  ) : (
                    <MdCheckCircle size={20} color="#dddddd" />
                  )}
                </span>
              </div>
              <div id="action">
                <button
                  type="button"
                  id="edit"
                  onClick={() => handleEdit(enrollment)}
                >
                  editar
                </button>
                <button
                  type="button"
                  id="delete"
                  onClick={() => handleDelete(enrollment)}
                >
                  apagar
                </button>
              </div>
            </EnrollmentInfo>
          ))}
        </EnrollmentList>
      ) : (
        <EnrollmentList>
          <strong id="no-content">Não há matrículas cadastradas.</strong>
        </EnrollmentList>
      )}
    </Container>
  );
}
