import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
  align-items: center;
`;

export const NewCheckinButton = styled(Button)`
  margin-top: 30px;
  width: 350px;
`;

export const CheckinList = styled.FlatList.attrs({
  ShowsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})``;
