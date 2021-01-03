import styled from 'styled-components';

export const FooterDiv = styled.footer`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
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

export const Statement = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.text};
  a {
    color: ${(props) => props.theme.text};
    text-decoration: none;
  }
`;
