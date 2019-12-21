import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Proptypes from 'prop-types';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DashHeader, Wrapper, FormWrapper } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('o campo título é obrigatório'),
  duration: Yup.number().required('o campo duração é obrigatório'),
  price: Yup.number().required('o campo preço é obrigatório'),
});

export default function EditPlan({ match }) {
  const [plan, setPlan] = useState({});

  async function loadPlan() {
    const response = await api.get(`/plans/${match.params.id}`);

    const planInfo = response.data;

    setPlan(planInfo);
  }

  useEffect(() => {
    loadPlan(match.params.id); // eslint-disable-next-line
  }, [match.params.id]);

  async function handleSubmit(data) {
    try {
      await api.put(`/plans/${match.params.id}/edit`, data);

      toast.success('Dados atualizados com sucesso');

      loadPlan(match.params.id);
    } catch (error) {
      toast.error(
        'Ocorreu um erro e não foi possível atualizar as informações. Verifique os dados'
      );
    }
  }

  function handleBack() {
    history.push('/plans');
  }

  return (
    <Container>
      <Wrapper>
        <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
          <DashHeader>
            <strong> Edição de plano</strong>
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
                <Input className="short" id="duration" name="duration" />
              </div>
              <div>
                <label htmlFor="price">PREÇO MENSAL (em R$)</label>
                <Input className="short" id="price" name="price" />
              </div>
              <div>
                <label htmlFor="total-price">PREÇO TOTAL (em R$)</label>
                <Input
                  className="short"
                  id="total-price"
                  name="total-price"
                  value={`R$ ${plan.duration * plan.price}`}
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

EditPlan.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.node,
    }).isRequired,
  }).isRequired,
};
