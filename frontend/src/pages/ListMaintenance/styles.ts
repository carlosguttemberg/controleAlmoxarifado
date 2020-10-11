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
    width: 340px;
    display: flex;
    text-align: center;

    a {
      color: #f4ede8;
      display: block;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    div {
      height: 56px;
      margin: 0;
      & + div {
        margin-left: 8px;
      }
    }
  }

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
`;

export const Header = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;
