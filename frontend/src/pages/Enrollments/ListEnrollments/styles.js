import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
`;

export const DashHeader = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 30px;

  strong {
    font-size: 24px;
  }

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
`;
export const EnrollmentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  background: #ffffff;
  padding: 30px;
  margin-top: 15px;

  strong#no-content {
    text-align: center;
    font-size: 16px;
    color: #666666;
  }
`;
export const ListHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  div {
    width: 16%;
    text-align: center;

    strong {
      color: #444444;
      font-size: 16px;
    }
  }

  div.student {
    text-align: left;
  }
`;

export const EnrollmentInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  padding: 15px 0px;
  line-height: 24px;
  &:last-child {
    border: none;
  }

  div {
    width: 16%;
    text-align: center;
    align-items: center;
  }

  div.student {
    text-align: left;
  }

  div#action {
    text-align: end;

    button {
      background: none;
      border: none;
    }

    #edit {
      color: #4d85ee;
    }

    #delete {
      color: #de3b3b;
      margin-left: 8px;
    }
  }

  span {
    color: #666666;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
`;
