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

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 210px;
  align-items: center;
`;

export const MenuItem = styled.a`
  font-size: 14px;
  padding: 5px 7px;
  color: ${(props) => props.theme.text};
  background: ${(props) => shade(0.1, props.theme.primary)};
  border-radius: 4px;
  -webkit-text-decoration: none;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.borderColor};
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.15s ease-in-out;
  user-select: none;
  &:hover {
    background: ${(props) => shade(0.15, props.theme.primary)};
  }
  &:active {
    background: ${(props) => shade(0.2, props.theme.primary)};
  }
`;

export const LoginButton = styled.button`
  font-size: 16px;
  margin-left: 20px;
  padding: 7px 9px;
  color: ${(props) => props.theme.text};
  background: ${(props) => shade(0.1, props.theme.primary)};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 6px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
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

export const LoadingDiv = styled.div`
  font-size: 16px;
  margin-left: 20px;
  padding: 7px 9px;
  color: ${(props) => props.theme.text};
  background: ${(props) => shade(0.1, props.theme.primary)};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 6px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
  &:focus {
    outline: none;
  }
`;

export const AdminButton = styled.button`
  font-size: 16px;
  margin-left: 20px;
  padding: 7px 9px;
  color: ${(props) => props.theme.text};
  background: ${(props) => shade(0.1, props.theme.primary)};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 6px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
  &:focus {
    outline: none;
  }
`;

export const DrawerButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  svg {
    font-size: 21px;
  }
  &:focus {
    outline: none;
  }
`;
