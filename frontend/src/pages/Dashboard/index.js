import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { FaCalendar } from 'react-icons/fa';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import Title from '../../components/Title';
import PieData from '../../components/PieChart';
import { ContainerDashboard } from './styled';

export default function Dashboard() {
  const [user, setUser] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [valueExpense, setValueExpense] = useState(0);
  const [startPeriod] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endPeriod] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentMonthName = format(new Date(), 'MMMM', { locale: pt });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/users/`);
        setUser(response.data.user);
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
  }, [dispatch, navigate]);

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
    if (accounts) {
      setValueExpense(accounts.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0));
    }
  }, [accounts]);

  return (
    <Container className="mt-4 mt-lg-5 mx-3 mx-lg-auto">
      <Title text="Dashboard" />
      <ContainerDashboard className="d-flex flex-column">
        <div className="d-flex bg-primary p-4 p-lg-5 rounded mt-3 text-white flex-wrap">
          {user && accounts ? (
            <div className="col-12 col-lg-5">
              <h3 className="d-flex">
                Olá {user.name}, este é seu painel!
                <span className="ms-auto text-capitalize d-flex text-primary gap-2">
                  <FaCalendar />
                  {currentMonthName}
                </span>
              </h3>
              <div className="mt-4">
                <p className="p-2 ps-3 h4 rounded bg-secondary d-flex align-items-center">
                  Salario <span className="text-white ms-auto px-3 py-1 bg-danger rounded">R${user.salary}</span>
                </p>
                <p className="p-2 ps-3 h4 rounded bg-secondary d-flex align-items-center">
                  Valor Comprometido
                  <span className="text-white ms-auto px-3 py-1 bg-danger rounded">R${valueExpense.toFixed(2)}</span>
                </p>
                <p className="p-2 ps-3 h4 rounded bg-secondary d-flex align-items-center">
                  Sobrando
                  <span className="text-white ms-auto px-3 py-1 bg-danger rounded">R${(user.salary - valueExpense).toFixed(2)}</span>
                </p>
              </div>
            </div>
          ) : (
            'Nada'
          )}
          {user && (
            <div className="d-flex flex-column col-12 col-lg-7">
              <PieData data={accounts} />
            </div>
          )}
        </div>
        <div className="d-flex" />
      </ContainerDashboard>
    </Container>
  );
}
