import styled from 'styled-components';
import { Spin } from '../../animations/Animations';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.background};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 400px;
  border-radius: 4px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.containerBackground};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const LabelInput = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 900;
  color: ${(props) => props.theme.text};
`;

export const Input = styled.input`
  height: 40px;
  width: ${(props) => props.width};
  font-size: 16px;
  display: block;
  margin-top: 5px;
  margin-bottom: 0.5rem;
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

export const Select = styled.select`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  margin-bottom: 0.5rem;
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

export const BtnsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
`;

export const Delete = styled.button`
  background: ${(props) => props.theme.button.delele};
  border: none;
  border-radius: 4px;
  color: ${(props) => props.theme.button.text};
  padding: 4px 6px;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Save = styled.button`
  background: ${(props) => props.theme.primary};
  border: none;
  border-radius: 4px;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 8px 6px;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Loading = styled.div`
  animation: ${Spin} 1s linear infinite;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  svg {
    font-size: 20px;
  }
`;
