import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, NewHelpButton} from './styles';

export default function HelpOrders({navigation}) {
  function handleNew() {
    navigation.push('HelpOrder');
  }
  return (
    <Container>
      <NewHelpButton onPress={() => handleNew}>
        Pedidos de Auxílio
      </NewHelpButton>
    </Container>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda ',
  tabBarIcon: ({tintColor}) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
