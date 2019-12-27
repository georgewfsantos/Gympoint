import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

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

import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HelpOrderInfo({data}) {
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);
  return (
    <Container>
      <TouchableOpacity onPress={() => {}}>
        <Info>
          <Header>
            <Left>
              <Icon name="check-circle" size={20} color="gray" />
              <Title>
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
      </TouchableOpacity>
    </Container>
  );
}
