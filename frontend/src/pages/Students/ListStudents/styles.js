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

      svg {
        margin-right: 0.8em;
      }
    }

    input {
      width: 237px;
      height: 36px;
      border-radius: 4px;
      border: solid 1px #dddddd;
      background: #ffffff;
      padding: 8px;
    }
  }
`;
export const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
  padding: 20px;
  background: #ffffff;
  border-radius: 4px;
`;
export const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  .name,
  .email,
  .age,
  .blank {
    display: flex;
    flex-direction: row;
    width: 30%;
  }

  .blank {
    width: 10%;
  }

  strong {
    font-size: 16px;
    color: #444444;
  }
`;
export const StudentInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 0px;
  line-height: 24px;
  &:last-child {
    border: none;
  }

  .name,
  .email,
  .age,
  .blank {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 30%;
  }

  .blank {
    width: 10%;
    justify-content: flex-end;
  }

  span {
    color: #666666;
    font-size: 16px;
  }

  span#age {
    margin-left: 15px;
  }

  #action {
    justify-content: flex-end;

    button {
      background: none;
      border: none;
      margin: 5px;
      font-size: 15px;
    }

    #edit {
      color: #4d85ee;
    }

    #delete {
      color: #de3b3b;
    }
  }
`;
