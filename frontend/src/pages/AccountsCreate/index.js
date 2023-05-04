import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Card } from 'react-bootstrap';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import typesAccounts from '../../utils/typesAccount';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import { InputSelect } from './styled';
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';

export default function AccountsCreate() {
  const [account, setAccount] = useState({ type: typesAccounts[0] });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  }

  function handleType(e) {
    setAccount({ ...account, type: e.target.options[e.target.selectedIndex].text });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const dateConvert = new Date(new Date(account.transaction_date).getTime() + 3 * 3600000);
    account.transaction_date = dateConvert;

    try {
      await axios.post('/accounts/', account);
      toast.success('Produto cadastrado com sucesso!');
      setAccount({});
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

  return (
    <Container className="mt-4 mt-lg-5 mx-3 mx-lg-auto">
      <Card.Body>
        <Title text="Cadatre sua conta" />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <InputSelect>
            <span>Tipo</span>
            <select name="type" onChange={(e) => handleType(e)}>
              {typesAccounts.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </InputSelect>
          <Input
            className="mt-2"
            text="Desc"
            value={account.description || ''}
            name="description"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Descrição da conta"
          />
          <Input
            className="mt-2"
            text="Data"
            value={account.transaction_date || ''}
            name="transaction_date"
            onChange={(e) => handleChange(e)}
            type="date"
            placeholder="Data de lançamento"
          />
          <Input
            className="mt-2"
            text="Valor"
            value={account.value || ''}
            name="value"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Valor da conta"
          />
          <Button className="btn w-100 btn-primary mt-4" text="Cadastrar Conta" type="submit">
            Cadastrar Conta
          </Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
