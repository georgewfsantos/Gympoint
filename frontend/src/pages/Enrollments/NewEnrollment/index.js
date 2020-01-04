import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { toast } from 'react-toastify';

import DatePicker from '~/components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DashHeader, Wrapper, FormWrapper } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number().required('o campo id do aluno é obrigatório'),
  plan_id: Yup.number().required('o campo id do plano é obrigatório'),
  start_date: Yup.date().required('o campo data de início é obrigatório'),
});

export default function NewEnrollment() {
  async function handleSubmit(data) {
    try {
      await api.post('/enrollments', data);

      toast.success('Matrícula cadastrada com sucesso');
      history.push('/enrollments');
    } catch (err) {
      if (err.response) {
        toast.error(
          `${err.response.data.error}. Ocorreu um erro e não foi possível realizar o cadastro. Verifique os dados.`
        );
      }
    }
  }

  function handleBack() {
    history.push('/enrollments');
  }

  return (
    <Container>
      <Wrapper>
        <Form schema={schema} onSubmit={handleSubmit}>
          <DashHeader>
            <strong> Cadastro de matrícula</strong>
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
            <label htmlFor="student_id">ID DO ALUNO</label>
            <Input id="student_id" name="student_id" />

            <div id="line">
              <div>
                <label htmlFor="plan_id">ID DO PLANO </label>
                <Input className="short" id="plan_id" name="plan_id" />
              </div>
              <div>
                <label htmlFor="start_date">DATA DE INÍCIO</label>
                <DatePicker
                  className="short"
                  id="start_date"
                  name="start_date"
                />
              </div>
              <div>
                <label htmlFor="end_date">DATA DE TÉRMINO</label>
                <Input
                  className="short"
                  id="end_date"
                  name="end_date"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="total-price">VALOR FINAL (em R$)</label>
                <Input
                  className="short"
                  id="total-price"
                  name="total-price"
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
