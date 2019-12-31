import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #f5f5f5;
`;

export const Form = styled.View`
  max-width: 350px;
  width: 100%;
`;
export const FormInput = styled.TextInput`
  width: 100%
  height: 400px;
  margin-top: 20px;


  background: #ffffff;
  border: solid 1px #dddddd;
  padding: 30px;
  border-radius: 4px;`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
