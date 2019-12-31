import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';

import {Alert} from 'react-native';
import api from '~/services/api';

import CheckinInfo from '~/components/CheckinInfo';
import {Container, CheckinList, NewCheckinButton} from './styles';

function CheckIns({navigation, isFocused}) {
  const studentId = useSelector(state => state.user.profile.id);
  const [checkIns, setCheckIns] = useState([]);

  async function loadCheckIns() {
    const response = await api.get(`checkins/${studentId}`);

    setCheckIns(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckIns();
    }
  }, [isFocused]);

  async function handleNewCheckin() {
    try {
      await api.post(`checkins/${studentId}`);
      Alert.alert('Checkin realizado com sucesso');
      loadCheckIns();
    } catch (error) {
      if (error.response) {
        Alert.alert(`${error.response.data.error}`);
      }
    }
  }

  return (
    <Container>
      <NewCheckinButton onPress={handleNewCheckin}>
        Novo check-in
      </NewCheckinButton>
      <CheckinList
        data={checkIns}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <CheckinInfo data={item} checkIns={checkIns} />}
      />
    </Container>
  );
}

export default withNavigationFocus(CheckIns);
