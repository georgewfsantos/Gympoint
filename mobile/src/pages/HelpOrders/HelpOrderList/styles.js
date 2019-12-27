import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ffffff;
  align-items: center;
  background: #f5f5f5;
`;

export const NewHelpOrderButton = styled(Button)`
  width: 88%;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 20},
})``;
