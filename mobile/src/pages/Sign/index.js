import React from 'react';
import {Image} from 'react-native';

import logo from '~/assets/logo.png';

import {Container, Form, FormInput, SubmitButton} from './styles';

export default function Sign() {
  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          name="id"
          placeholder="Informe seu ID de cadastro"
          keyboardType="number-pad"
        />
        <SubmitButton onPress={() => {}}> Entrar no sistema </SubmitButton>
      </Form>
    </Container>
  );
}
