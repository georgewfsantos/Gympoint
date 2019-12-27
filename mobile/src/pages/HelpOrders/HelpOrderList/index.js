import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import api from '~/services/api';

import HelpOrederInfo from '~/components/HelpOrderInfo';

import {Container, NewHelpOrderButton, List} from './styles';

export default function HelpOrderList({navigation}) {
  const studentId = useSelector(state => state.user.profile.id);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${studentId}/questions`);

      setHelpOrders(response.data);
    }
    loadHelpOrders();
  }, []);

  function handleNewHelpOrder() {
    navigation.navigate('NewHelpOrder');
  }
  return (
    <Container>
      <NewHelpOrderButton onPress={handleNewHelpOrder}>
        Novo pedido de auxílio
      </NewHelpOrderButton>
      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <HelpOrederInfo data={item} />}
      />
    </Container>
  );
}
