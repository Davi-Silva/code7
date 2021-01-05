import styled from 'styled-components';
import { shade } from 'polished';

import { Spin } from '../../../../animations/Animations';

export const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

export const FormDiv = styled.div`
  position: fixed;
  width: 250px;
  max-height: 449px;
  overflow-y: scroll;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.primary};
  padding: 20px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  z-index: 9;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-height: 520px) {
    max-height: 85%;
    overflow-y: scroll;
  }
  @media (max-height: 440px) {
    max-height: 80%;
  }
  @media (max-height: 440px) {
    max-height: 75%;
  }
`;

export const Heading = styled.h1`
  color: #000;
  font-size: 17px;
  font-weight: 900;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #000;
  font-weight: 900;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background: #ffffff;
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

export const Submit = styled.button`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px 1px;
  background: ${(props) => shade(0.2, props.theme.primary)};
  color: ${(props) => shade(0.2, props.theme.text)};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #000;
    background: ${(props) => shade(0.25, props.theme.primary)};
  }
  &:active {
    color: #000;
    background: ${(props) => shade(0.3, props.theme.primary)};
  }
`;

export const WarningList = styled.div`
  width: 100%;
  margin: 10px 0;
  h3 {
    font-size: 15px;
    margin-bottom: 0.25rem;
  }
  ul {
    width: 100%;
  }
`;

export const Warning = styled.li`
  list-style: none;
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50px;
    background-color: #000;
    display: block;
    position: absolute;
    margin-top: 6px;
  }
  p {
    color: #000;
    font-size: 14px;
    padding-left: 10px;
  }
`;

export const Button = styled.button`
  display: table;
  margin: 4px auto;
  background: transparent;
  border: none;
  color: #000;
  font-size: 14px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 20px;
    animation: ${Spin} 0.5s linear infinite;
  }
`;
