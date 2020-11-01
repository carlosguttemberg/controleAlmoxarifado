import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
`;

export const ContainerGrid = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px !important;
  align-items: center;
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
    display: block;
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

export const ContainerList = styled.div`
  background: #232129;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 200px;
  height: 110px;
  font-weight: 500;
  margin-top: 16px;
  transition: border-color 0.2s;
  border: 2px solid #232129;
  color: #666360;
  margin-right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    border-color: ${shade(0.2, '#ff9000')};
  }
`;
