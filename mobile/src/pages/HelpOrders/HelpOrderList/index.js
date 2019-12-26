import React from 'react';
import {} from 'react-native';

import {Container, NewHelpOrderButton} from './styles';

export default function HelpOrderList({navigation}) {
  function handleNewHelpOrder() {
    navigation.navigate('NewHelpOrder');
  }
  return (
    <Container>
      <NewHelpOrderButton onPress={handleNewHelpOrder}>
        Novo pedido de auxílio
      </NewHelpOrderButton>
    </Container>
  );
}
