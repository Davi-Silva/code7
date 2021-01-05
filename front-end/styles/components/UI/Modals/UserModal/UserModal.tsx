import styled from 'styled-components';
import { shade } from 'polished';

export const Wrapper = styled.div`
  width: 100px;
  position: absolute;
  top: 67px;
  background: ${(props) => props.theme.primary};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  transform: translateX(106px);
`;

export const FlexList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FlexListItem = styled.a`
  padding: 8px 0;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${(props) => shade(0.15, props.theme.primary)};
  }
  &:active {
    background: ${(props) => shade(0.2, props.theme.primary)};
  }
`;
export const FlexListItemButton = styled.button`
  padding: 8px 0;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  border: none;
  background: transparent;
  border: none;
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
