import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Info,
  Header,
  Title,
  Left,
  Right,
  Time,
  Wrapper,
  InfoBody,
} from './styles';

export default function HelpOrderInfo({data, navigation}) {
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Info
        onPress={() => {
          navigation.navigate('HelpOrderDetail', {data});
        }}>
        <Header>
          <Left>
            <Icon
              name="check-circle"
              size={20}
              color={data.answer !== null ? '#42cb59' : '#999999'}
            />
            <Title answered={data.answer}>
              {data.answer !== null ? 'Respondido' : 'Sem Resposta'}
            </Title>
          </Left>

          <Right>
            <Time>{parsedDate}</Time>
          </Right>
        </Header>
        <Wrapper>
          <InfoBody>{data.question}</InfoBody>
        </Wrapper>
      </Info>
    </Container>
  );
}

HelpOrderInfo.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
    answer: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func,
  }).isRequired,
};
