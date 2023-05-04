import React from 'react';

import { Container } from '../../styles/GlobalStyles';

export default function Home() {
  return (
    <Container className="mt-4 mt-lg-5 mx-3 mx-lg-auto">
      <h2>
        Bem-vindo ao <span className="bg-primary text-white p-2 px-4 rounded">MyMoney</span>
      </h2>
      <p className="mt-4 fs-4">Este é um projeto pessoal que iniciei com intuito de controlar meu financeiro.</p>
      <p className="fs-4">
        A ideia do <span className="text-secondary fw-bold">MyMoney</span> é ser um app de controle financeiro aonde você pode lançar
        seus gastos, filtrar gastos por periodo, por tipo e ter uma dashboard mostrando sobre seus custos e quanto você ainda pode
        gastar.
      </p>
      <p className="fs-4">
        Eu, desenvolvedor da <span className="text-secondary fw-bold">MyMoney</span> tenho como ideia futura, implementar uma dashboard
        bem mais avançada com metas de gasto para cada centro de custo e ter um painel para controel de investimento.
      </p>
      <p className="fs-4">
        Solicite seu acesso no email: <span className="fw-bold">correa.l@icloud.com</span>
      </p>
    </Container>
  );
}
