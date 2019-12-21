import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DashHeader = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 24px;
    color: #444444;
  }

  #manage {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 142px;
      height: 36px;
      border: 0;
      border-radius: 4px;
      background: #f94d6a;
      color: #fff;
      font-weight: 600;
      margin-right: 5px;
      text-transform: uppercase;

      svg {
        margin-right: 0.8em;
      }
    }

    #back {
      background: #cccccc;
    }
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  form {

     span {
      color: #f94d6a;
      margin-bottom: 20px;

    }

    .short span {
      display: block;
    }

    label {
      color: #444444;
      font-size: 14px;
      font-weight: 700;
      line-height: 17px;
    }

    input {
      height: 45px;
      border-radius: 4px;
      border: solid 1px #dddddd
      background: #ffffff;
      margin-top : 5px;
      margin-bottom: 25px;
      padding: 10px;
      color: #666666;
      font-size: 16px;
    }

    div#line {
      label {
        display: block;
      }

      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  background: #ffffff;
  margin-top: 15px;
`;
