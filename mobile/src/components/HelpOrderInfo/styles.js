import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Container = styled.View`
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 150px;

  background: #ffffff;
  border: solid 1px #dddddd;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const Info = styled(TouchableOpacity)``;
export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;
export const Left = styled.View`
  display: flex;
  flex-direction: row;
`;
export const Right = styled.View``;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${props => (props.answered !== null ? '#42cb59' : '#999999')};
  margin-left: 5px;
`;
export const Time = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #666666;
`;

export const Wrapper = styled.View``;

export const InfoBody = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #666666;
`;
