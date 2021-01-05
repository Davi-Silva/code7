import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.background};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
`;

export const ClientsList = styled.div`
  width: 1920px;
  margin-top: 15px;
  padding: 10px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${(props) => `repeat(${props.clientsLength}, 115px)`};
  grid-gap: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1920px) {
    width: 90%;
  }
  @media (max-width: 670px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const NoClients = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

export const ClientDiv = styled.div`
  border-radius: 2px;
  padding: 5px 8px;
  width: 97%;
  height: 100px;
  background: ${(props) => props.theme.containerBackground};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
`;

export const ClientNameSettingsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ClientNameDiv = styled.div`
  span {
    font-size: 14px;
    font-weight: 900;
  }
  p {
    font-size: 16px;
  }
`;

export const Settings = styled.button`
  background: transparent;
  border: none;
  &:focus {
    outline: none;
  }
  svg {
    font-size: 18px;
    color: ${(props) => props.theme.settings.color};
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.button.delele};
    }
  }
`;

export const DebtReasonSelect = styled.select`
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

export const FlexDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DebtBtn = styled.button`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  font-size: 16px;
  border-radius: 3px;
  padding: 5px 8px;
  width: fit-content;
  &:focus {
    outline: none;
  }
`;
