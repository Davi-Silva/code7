import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
`;

export const FormDiv = styled.div`
  position: fixed;
  width: 550px;
  max-height: 500px;
  overflow-y: scroll;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.containerBackground};
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

export const LabelInput = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DebtStatement = styled.p`
  font-size: 12px;
  border-bottom: 1px solid ${(props) => props.theme.debtStatament.borderColor};
  padding-bottom: 5px;
  margin: 0.5rem 0 1rem 0;
  color: ${(props) => props.theme.debtStatament.color};
`;

export const NoDebt = styled.p`
  font-size: 16px;
  padding-bottom: 5px;
  margin: 1rem 0;
  color: ${(props) => props.theme.debtStatament.color};
`;

export const DebtsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
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

export const Delete = styled.button`
  background: ${(props) => props.theme.button.delele};
  color: ${(props) => props.theme.button.color};
  border: none;
  border-radius: 3px;
  width: fit-content;
  padding: 6px 7px;
  &:focus {
    outline: none;
  }
`;

export const Update = styled.button`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  font-size: 16px;
  width: fit-content;
  padding: 6px 7px;
  margin-top: 15px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
