import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ffffff;
  align-items: center;
`;

export const NewHelpOrderButton = styled(Button)`
  width: 90%;
  margin-top: 30px;
`;
