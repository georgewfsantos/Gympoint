import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #ee4d64;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  max-width: 360px;
  heigh: 448px;
  text-align: center;
  paddin: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  img {
    margin-top: 25px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 25px;

    input {
      background: #fff;
      border: solid 1px #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #99999;
      margin: 0 0 10px;

      &:: placeholder {
        color: #999999;
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
