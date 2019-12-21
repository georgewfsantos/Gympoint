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
  name: Yup.string().required('o campo nome é obrigatório'),
  email: Yup.string()
    .email('Digite um formato válido de email')
    .required('o campo email é obrigatório'),
  age: Yup.number().required('o campo idade é obrigatório'),
  weight: Yup.number().required('o campo peso é obrigatório'),
  height: Yup.number().required('o campo altura é obrigatório'),
});

export default function EditStudent({ match }) {
  const [student, setStudent] = useState({});

  async function loadStudent() {
    const response = await api.get(`/students/${match.params.id}`);

    const studentInfo = response.data;

    setStudent(studentInfo);
  }

  useEffect(() => {
    loadStudent(match.params.id); // eslint-disable-next-line
  }, [match.params.id]);

  async function handleSubmit(data) {
    try {
      await api.put(`/students/${match.params.id}/edit`, data);

      toast.success('Dados atualizados com sucesso');

      loadStudent(match.params.id);
    } catch (error) {
      toast.error(
        'Ocorreu um erro e não foi possível atualizar as informações. Verifique os dados'
      );
    }
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <Container>
      <Wrapper>
        <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
          <DashHeader>
            <strong> Edição de aluno</strong>
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
            <label htmlFor="name">NOME</label>
            <Input id="name" name="name" placeholder="Nome" />
            <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
            <Input id="email" name="email" placeholder="Email" />
            <div id="line">
              <div>
                <label htmlFor="age">IDADE</label>
                <Input
                  className="short"
                  id="age"
                  name="age"
                  placeholder="Idade"
                />
              </div>
              <div>
                <label htmlFor="weight">PESO (em Kg)</label>
                <Input
                  className="short"
                  id="weight"
                  name="weight"
                  placeholder="Peso"
                />
              </div>
              <div>
                <label htmlFor="height">ALTURA (em m)</label>
                <Input
                  className="short"
                  id="height"
                  name="height"
                  placeholder="Altura"
                />
              </div>
            </div>
          </FormWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
}

EditStudent.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.node,
    }).isRequired,
  }).isRequired,
};
