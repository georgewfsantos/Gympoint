import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Alert} from 'react-native';
import api from '~/services/api';

import LogoTitle from '~/components/LogoTitle';

import CheckinInfo from '~/components/CheckinInfo';
import {Container, CheckinList, NewCheckinButton} from './styles';

export default function Checkin({navigation}) {
  const studentId = useSelector(state => state.user.profile.id);
  const [checkIns, setCheckIns] = useState([]);

  async function loadCheckIns() {
    const response = await api.get(`checkins/${studentId}`);

    setCheckIns(response.data);
  }

  useEffect(() => {
    loadCheckIns();
  }, []);

  async function handleNewCheckin() {
    try {
      await api.post(`checkins/${studentId}`);
      Alert.alert('Checkin realizado com sucesso');
      loadCheckIns();
    } catch (error) {
      Alert.alert('Erro ao realizar checkin');
    }
  }

  return (
    <Container>
      <LogoTitle />
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

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({tintColor}) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
