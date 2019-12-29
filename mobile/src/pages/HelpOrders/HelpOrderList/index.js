import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';

import HelpOrderInfo from '~/components/HelpOrderInfo';

import {Container, NewHelpOrderButton, List} from './styles';

function HelpOrderList({navigation, isFocused}) {
  const studentId = useSelector(state => state.user.profile.id);
  const [helpOrders, setHelpOrders] = useState([]);

  async function loadHelpOrders() {
    const response = await api.get(`students/${studentId}/questions`);

    setHelpOrders(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused]);

  function handleNewHelpOrder() {
    navigation.navigate('NewHelpOrder');
  }

  function handleDetail() {
    navigation.navigate('NewHelpOrder');
    console.tron.log('hi');
  }
  return (
    <Container>
      <NewHelpOrderButton onPress={handleNewHelpOrder}>
        Novo pedido de auxílio
      </NewHelpOrderButton>
      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <HelpOrderInfo
            data={item}
            onPress={handleDetail}
            navigation={navigation}
          />
        )}
      />
    </Container>
  );
}

export default withNavigationFocus(HelpOrderList);
