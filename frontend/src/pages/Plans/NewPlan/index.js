import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Proptypes from 'prop-types';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DashHeader, Wrapper, FormWrapper } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('o campo título é obrigatório'),
  duration: Yup.number().required('o campo duração é obrigatório'),
  price: Yup.number().required('o campo preço é obrigatório'),
});

export default function NewPlan() {
  async function handleSubmit(data) {
    try {
      await api.post('/plans', data);

      toast.success('Plano cadastrado com sucesso');
      history.push('/plans');
    } catch (err) {
      if (err.response) {
        toast.error(
          `${err.response.data.error}. Ocorreu um erro e não foi possível realizar o cadastro. Verifique os dados.`
        );
      }
    }
  }

  function handleBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <Wrapper>
        <Form schema={schema} onSubmit={handleSubmit}>
          <DashHeader>
            <strong> Cadastro de plano</strong>
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
            <label htmlFor="title">TÍTULO</label>
            <Input id="title" name="title" />
            <div id="line">
              <div>
                <label htmlFor="duration">DURAÇÃO (em meses)</label>
                <Input
                  className="short"
                  id="duration"
                  name="duration"
                  placeholder="ex.: 5"
                />
              </div>
              <div>
                <label htmlFor="price">PREÇO MENSAL (em R$)</label>
                <Input
                  className="short"
                  id="price"
                  name="price"
                  placeholder="ex.: 98.00"
                />
              </div>
              <div>
                <label htmlFor="total-price">PREÇO TOTAL (em R$)</label>
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

NewPlan.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.node,
    }).isRequired,
  }).isRequired,
};
