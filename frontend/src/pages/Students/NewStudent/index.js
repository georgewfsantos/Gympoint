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
  name: Yup.string().required('o campo nome é obrigatório'),
  email: Yup.string()
    .email('Digite um formato válido de email')
    .required('o campo email é obrigatório'),
  age: Yup.number('Formato inválido. Digite um valor numérico (32)').required(
    'o campo idade é obrigatório'
  ),
  weight: Yup.number(
    'Digite um formato em número com dois algarismos. Ex.: 35'
  ).required('o campo peso é obrigatório'),
  height: Yup.number('').required('o campo altura é obrigatório'),
});

export default function NewStudent() {
  async function handleSubmit(data) {
    try {
      await api.post('/students', data);

      toast.success('Aluno cadastrado com sucesso');
      history.push('/students');
    } catch (err) {
      if (err.response) {
        toast.error(
          `${err.response.data.error}. Ocorreu um erro e não foi possível realizar o cadastro. Verifique os dados.`
        );
      }
    }
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <Container>
      <Wrapper>
        <Form schema={schema} onSubmit={handleSubmit}>
          <DashHeader>
            <strong> Cadastro de aluno</strong>
            <div id="manage">
              <button id="back" type="button" onClick={handleBack}>
                <MdKeyboardArrowLeft size={20} color="#fff" />
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

NewStudent.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.node,
    }).isRequired,
  }).isRequired,
};
