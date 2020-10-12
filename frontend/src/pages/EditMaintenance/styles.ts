import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  animation: ${appearFromRight} 1s;

  form {
    margin: 20px 0;
    width: 100%;
    display: grid;
    text-align: center;

    a {
      color: #ff9000;
      display: block;
      text-decoration: none;
      transition: color 0.2s;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
      }

      &:hover {
        color: ${shade(0.2, '#ff9000')};
      }
    }

    div {
      height: 56px;
      margin: 0;
      & + div {
        margin-left: 8px;
      }
    }

    table {
      width: 100%;
    }
  }
`;

export const Header = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

export const Body = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;
