import styled from 'styled-components/native';

export const Container = styled.View`
margin-bottom: 15px;
width: 100%;
max-height: 150px;
height: 100%
padding: 20px ;
border-radius: 4px;
background: #ffffff;

display: flex;
flex-direction: row;
align-items-center;
justify-content: center;
border: 1px solid #dddddd;
border-radius: 4px;

`;

export const Info = styled.View`
  width: 100%;
  height: 100%;
`;
export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;
export const Left = styled.View`
  display: flex;
  flex-direction: row;
  width: 45%;
`;
export const Right = styled.Text`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #999999;
  font-weight: 700;
  margin-left: 8px;
`;
export const Time = styled.Text`
  align-self: flex-end;
  color: #666666;
  font-size: 16px;
  font-weight: 400;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const InfoBody = styled.Text`
  color: #666666;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
`;
