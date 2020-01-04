import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Proptypes from 'prop-types';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DatePicker from '~/components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DashHeader, Wrapper, FormWrapper } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number().required('o campo id do aluno é obrigatório'),
  plan_id: Yup.number().required('o campo id do plano é obrigatório'),
  start_date: Yup.date().required('o campo data de início é obrigatório'),
});

export default function EditEnrollment({ match }) {
  const [enrollment, setEnrollment] = useState({});

  async function loadEnrollment() {
    const response = await api.get(`/enrollments/${match.params.id}`);

    response.data.start_date = parseISO(response.data.start_date);

    response.data.end_date = format(
      parseISO(response.data.end_date),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );

    setEnrollment(response.data);
  }

  useEffect(() => {
    loadEnrollment(match.params.id); // eslint-disable-next-line
  }, [match.params.id]);

  async function handleSubmit(data) {
    try {
      // data.start_date = data.start_date.toISOString();
      await api.put(`/enrollments/${match.params.id}/edit`, data);

      toast.success('Dados atualizados com sucesso');

      loadEnrollment(match.params.id);
    } catch (error) {
      toast.error(
        'Ocorreu um erro e não foi possível atualizar as informações. Verifique os dados'
      );
    }
  }

  function handleBack() {
    history.push('/enrollments');
  }

  return (
    <Container>
      <Wrapper>
        <Form initialData={enrollment} schema={schema} onSubmit={handleSubmit}>
          <DashHeader>
            <strong> Edição de matrícula</strong>
            <div id="manage">
              <button id="back" type="button" onClick={handleBack}>
                <MdKeyboardArrowLeft size={20} color="#FFF" />
                Voltar
              </button>
              <button type="submit">
                <MdCheck size={20} color="#fff" />
                Salvar
              </button>
            </div>
          </DashHeader>
          <FormWrapper>
            <label htmlFor="title">ID DO ALUNO</label>
            <Input id="title" name="student_id" />

            <div id="line">
              <div>
                <label htmlFor="plan_id">ID DO PLANO </label>
                <Input className="short" id="duration" name="plan_id" />
              </div>
              <div>
                <label htmlFor="start_date">DATA DE INÍCIO</label>
                <DatePicker className="short" id="price" name="start_date" />
              </div>
              <div>
                <label htmlFor="price">DATA DE TÉRMINO</label>
                <Input className="short" id="price" name="end_date" readOnly />
              </div>
              <div>
                <label htmlFor="total-price">VALOR FINAL (em R$)</label>
                <Input
                  className="short"
                  id="total-price"
                  name="total-price"
                  value={`R$ ${enrollment.price}`}
                  readOnly
                />
              </div>
            </div>
          </FormWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
}

EditEnrollment.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.node,
    }).isRequired,
  }).isRequired,
};
