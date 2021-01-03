import styled from 'styled-components';
import { shade } from 'polished';

export const NavigationBarDiv = styled.nav`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  height: 60px;
`;

export const Container = styled.div`
  height: 60px;
  width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1920px) {
    width: 95%;
  }
`;

export const BrandA = styled.a`
  font-size: 22px;
  font-weight: 900;
  cursor: pointer;
`;

export const LoginBtn = styled.button`
  background: ${(props) => props.theme.primary};
  border: none;
  font-size: 16px;
  padding: 7px 10px;
  border-radius: 3px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    background: ${(props) => shade(0.15, props.theme.primary)};
  }
  &:active {
    background: ${(props) => shade(0.2, props.theme.primary)};
  }
  &:focus {
    outline: none;
  }
`;
