import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import Title from '../../components/Title';
import Input from '../../components/Input';

export default function ExpensePeriod() {
  const [accounts, setAccounts] = useState([]);
  const [startPeriod, setStartPeriod] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endPeriod, setEndPeriod] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
  const [valueExpense, setValueExpense] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`accounts/myaccounts/${startPeriod}/${endPeriod}`);
        setAccounts(response.data);
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        const status = get(err, 'response.status', 0);

        if (status === 401) {
          toast.error('Você precisa fazer login novamente.');
          navigate('/login');
          dispatch(actions.loginFailure());
        }

        errors.map((error) => toast.error(error));
      }
    }
    getData();
  }, [startPeriod, endPeriod, dispatch, navigate]);

  useEffect(() => {
    setValueExpense(accounts.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0));
  }, [accounts]);

  return (
    <Container className="mt-4 mt-lg-5 mx-3 mx-lg-auto">
      <Title text="Despesas p/ Periodo" />
      <div className="mt-4 h3 d-block d-md-flex align-items-center bg-secondary text-white ps-3 p-3 ps-md-3 p-md-2 rounded responsive">
        <p className="mb-0 mb-3 mb-md-0">Selecione o periodo</p>
        <div className="d-flex align-items-center ms-auto">
          <Input className="w-100" text="Inicial" type="date" onChange={(e) => setStartPeriod(e.target.value)} />
          <Input className="w-100" text="Final" type="date" onChange={(e) => setEndPeriod(e.target.value)} />
        </div>
      </div>
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Data de Lançamento</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => {
            return (
              <tr key={`${account.type}+${account.description}+${account.value}`}>
                <td>{account.type}</td>
                <td>{account.description}</td>
                <td>{format(new Date(account.transaction_date), 'dd/MM/yyyy')}</td>
                <td>R${account.value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className="mt-2 h4 d-flex justify-content-end align-items-center bg-primary text-white gap-2 p-2 ps-3">
        Valor total gasto <span className="text-white ms-auto px-3 py-1 bg-danger rounded">R${valueExpense}</span>
      </p>
    </Container>
  );
}
