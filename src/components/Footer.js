import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  text-align: center;
  padding: 1rem 0;
  position: relative;
  width: 100%;
`;

const Footer = () => (
  <FooterContainer>
    <Container>
      <p className="mb-0">&copy; 2024 Event Calendar. All rights reserved.</p>
    </Container>
  </FooterContainer>
);

export default Footer;
