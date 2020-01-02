import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  align-items: center;
`;

export const Info = styled.View`
  display: flex;
  max-width: 350px;
  width: 100%
  max-height: 600px;
  margin-top: 20px;

  background: #ffffff;
  border: solid 1px #dddddd;
  padding: 30px;
  border-radius: 4px;
`;
export const Header = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;
export const Title = styled.Text`
  font-size: 16px;
  color: #444444;
  font-weight: 700;
`;
export const Time = styled.Text`
  font-size: 16px;
  color: #666666;
  font-weight: 400;
`;
export const InfoBody = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  padding: 10px 0;
  margin-bottom: 10px;
`;
