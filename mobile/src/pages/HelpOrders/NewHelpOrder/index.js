import React, {useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';

import api from '~/services/api';

import {Container, Form, FormInput, SubmitButton} from './styles';

export default function NewHelpOrder({navigation}) {
  const [question, setQuestion] = useState('');
  const loading = useSelector(state => state.auth.loading);
  const studentId = useSelector(state => state.user.profile.id);

  async function handleSubmit() {
    try {
      await api.post(`/students/${studentId}/questions`, {
        question,
        studentId,
      });

      Alert.alert('Seu pedido de auxílio foi enviado com sucesso');

      navigation.navigate('HelpOrderList');
    } catch (error) {
      Alert.alert(
        'Não foi possível cadastrar seu pedido de auxílio. Por favor verifique os dados',
      );
    }
  }
  return (
    <Container>
      <Form>
        <FormInput
          multiline
          name="helpOrder"
          placeholder="Inclua seu pedido de auxílio"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={question}
          onChangeText={setQuestion}
          style={{textAlignVertical: 'top'}}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Enviar pedido
        </SubmitButton>
      </Form>
    </Container>
  );
}

NewHelpOrder.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrderList');
      }}>
      <Icon name="chevron-left" size={20} />
    </TouchableOpacity>
  ),
});

NewHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
