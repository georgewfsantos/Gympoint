import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

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
