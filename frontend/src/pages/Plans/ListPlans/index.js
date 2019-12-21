import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DashHeader,
  PlanList,
  ListHeader,
  PlanInfo,
} from './styles';

export default function ListPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      setPlans(response.data);
    }

    loadPlans(plans);
  }, [plans]);

  function handleEdit(plan) {
    history.push(`/plans/${plan.id}/edit`);
  }

  function handleNew() {
    history.push('plans/new');
  }

  async function handleDelete(plan) {
    const permition = window.confirm(
      'Tem certeza de que deseja excluir este plano ?'
    );

    if (permition) {
      try {
        await api.delete(`/plans/${plan.id}/delete`);
        toast.success('Plano excluído com sucesso');
      } catch (err) {
        if (err.response) {
          toast.error(
            `${err.response.data.error}. Nenhum plano com este título foi encontrado`
          );
        }
      }
    }
  }

  return (
    <Container>
      <DashHeader>
        <strong> Gerenciando planos</strong>
        <div id="manage">
          <button type="button" onClick={handleNew}>
            <MdAdd size={20} color="#FFF" /> Cadastrar
          </button>
        </div>
      </DashHeader>
      {plans.length > 0 ? (
        <PlanList>
          <ListHeader>
            <div className="title">
              <strong>TÍTULO</strong>
            </div>
            <div className="duration">
              <strong>DURAÇÃO</strong>
            </div>
            <div className="price">
              <strong>VALOR p/ MÊS</strong>
            </div>
            <div className="blank">
              <strong />
            </div>
          </ListHeader>
          {plans.map(plan => (
            <PlanInfo key={plan.id}>
              <div className="title">
                <span>{plan.title}</span>
              </div>
              <div className="duration">
                <span>
                  {plan.duration}
                  {plan.duration === 1 ? ' mês' : ' meses'}
                </span>
              </div>
              <div className="price">
                <span id="price">{`R$${plan.price}`}</span>
              </div>
              <div id="action" className="blank">
                <button
                  type="button"
                  id="edit"
                  onClick={() => handleEdit(plan)}
                >
                  editar
                </button>
                <button
                  type="button"
                  id="delete"
                  onClick={() => handleDelete(plan)}
                >
                  apagar
                </button>
              </div>
            </PlanInfo>
          ))}
        </PlanList>
      ) : (
        <PlanList>
          <strong id="no-content">
            Nenhum plano cadastrado. Clique no botão para cadastrar.
          </strong>
        </PlanList>
      )}
    </Container>
  );
}
