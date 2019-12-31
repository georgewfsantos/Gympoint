import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: solid 1px #dddddd;
`;
export const Info = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 5px;
`;
export const Title = styled.Text`
  color: #444444;
  font-size: 16px;
  font-weight: 700;
  line-height: 17px;
`;
export const Time = styled.Text`
  color: #666666;
  font-size: 16px;
  font-weight: 400;
  line-height: 17px;
`;
