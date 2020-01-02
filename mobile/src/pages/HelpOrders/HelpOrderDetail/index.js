import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {Container, Info, Header, Title, Time, InfoBody} from './styles';

export default function HelpOrderDetail({navigation}) {
  const helpOrderInfo = navigation.getParam('data');
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(helpOrderInfo.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [helpOrderInfo.createdAt]);

  return (
    <Container>
      <Info>
        <Header>
          <Title>PERGUNTA</Title>
          <Time>{parsedDate}</Time>
        </Header>
        <InfoBody>{helpOrderInfo.question}</InfoBody>

        <Header>
          <Title>RESPOSTA</Title>
        </Header>
        <InfoBody>{helpOrderInfo.answer}</InfoBody>
      </Info>
    </Container>
  );
}

HelpOrderDetail.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrderList');
      }}>
      <Icon name="chevron-left" size={20} />
    </TouchableOpacity>
  ),
});

HelpOrderDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func,
  }).isRequired,
};
