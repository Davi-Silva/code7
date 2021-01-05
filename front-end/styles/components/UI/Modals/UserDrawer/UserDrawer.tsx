import styled, { css } from 'styled-components';
import { shade } from 'polished';

import {
  SlideDrawerClose,
  SlideDrawerOpen,
  ShowBackground,
  HideBackground
} from '../../../../animations/Animations';

interface userModelProps {
  openUserModal: boolean;
}

const openDrawer = css`
  animation: ${SlideDrawerOpen} 0.2s ease-in-out forwards;
`;

const closeDrawer = css`
  animation: ${SlideDrawerClose} 0.2s ease-in-out forwards;
`;

const showBackground = css`
  animation: ${ShowBackground} 0.2s ease-in-out forwards;
`;

const hideBackground = css`
  animation: ${HideBackground} 0.2s ease-in-out forwards;
`;

export const Background = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.15);
  /* ${(props: userModelProps) =>
    props.openUserModal ? hideBackground : showBackground}; */
`;

export const DrawerDiv = styled.div`
  width: 200px;
  left: 0;
  top: 0px;
  height: 100%;
  position: fixed;
  border-right: 1px solid #000;
  background: ${(props) => props.theme.primary};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  overflow: hidden;
  z-index: 9999;
  @media (max-height: 225px) {
    overflow-y: scroll;
  }
`;

export const List = styled.div`
  width: 100%;
`;

export const ListItem = styled.a`
  width: 100%;
  font-size: 16px;
  color: #000;
  -webkit-text-decoration: none;
  text-decoration: none;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    background: ${(props) => shade(0.15, props.theme.primary)};
  }
  &:active {
    background: ${(props) => shade(0.2, props.theme.primary)};
  }
`;

export const ListItemAdmin = styled.p`
  width: 100%;
  font-size: 16px;
  color: #000;
  -webkit-text-decoration: none;
  text-decoration: none;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    background: ${(props) => shade(0.15, props.theme.primary)};
  }
  &:active {
    background: ${(props) => shade(0.2, props.theme.primary)};
  }
`;

export const LogoutButton = styled.button`
  font-size: 16px;
  border-radius: 6px;
  padding: 7px;
  background: ${(props) => shade(0.1, props.theme.primary)};
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.text};
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${(props) => shade(0.15, props.theme.primary)};
  }
  &:active {
    background: ${(props) => shade(0.2, props.theme.primary)};
  }
`;

export const LoginButton = styled.button`
  font-size: 16px;
  margin: 12px 0 12px 15px;
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
