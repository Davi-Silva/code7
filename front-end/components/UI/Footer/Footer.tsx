import React from 'react';

import {
  FooterDiv,
  Container,
  Statement
} from '../../../styles/components/UI/Footer/Footer';

const Footer = () => {
  return (
    <FooterDiv>
      <Container>
        <Statement>
          Developed by{' '}
          <a
            href="https://github.com/davi-silva"
            target="_blank"
            rel="noreferrer noopener"
          >
            Davi Silva
          </a>
        </Statement>
      </Container>
    </FooterDiv>
  );
};

export default Footer;
