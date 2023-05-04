import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import typesAccounts from '../../utils/typesAccount';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import Title from '../../components/Title';

export default function ExpenseType() {
  const [accounts, setAccounts] = useState([]);
  const [typeAccount, setTypeAccount] = useState('Alimentação');
  const [valueExpense, setValueExpense] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`accounts/myaccounts/${typeAccount}`);
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
  }, [typeAccount, dispatch, navigate]);

  useEffect(() => {
    setValueExpense(accounts.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0));
  }, [accounts]);

  return (
    <Container className="mt-4 mt-lg-5 mx-3 mx-lg-auto">
      <Title text="Despesas p/ Periodo" />
      <select
        className="form-select form-select-lg my-3"
        onChange={(e) => setTypeAccount(e.target.options[e.target.selectedIndex].text)}
      >
        {typesAccounts.map((type) => (
          <option className="h5" key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <Table striped bordered hover responsive>
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
