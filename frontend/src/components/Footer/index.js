import React from 'react';

import Logo from '../../assets/img/logo.png';

import { Container } from './styled';

export default function Footer() {
  return (
    <Container>
      <section>
        <p>
          Todos direitos reservados a @MyMoney - Since 2023 <img src={Logo} alt="Logotipo MyMoney" width="22px" />
        </p>
      </section>
    </Container>
  );
}
