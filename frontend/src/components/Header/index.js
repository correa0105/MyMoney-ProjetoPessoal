import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as actions from '../../store/modules/auth/actions';

import Logo from '../../assets/img/logo.png';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(actions.loginFailure());
    toast.error('Você deslogou!');
    navigate('/');
  };

  return (
    <Navbar className="bg-secondary px-2" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <img src={Logo} alt="Logotipo" width="26px" />
          MyMoney
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            {!isLoggedIn && (
              <Link to="/" className="nav-link">
                Home
              </Link>
            )}
            <div className="d-flex flex-column flex-lg-row ms-lg-auto">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <NavDropdown title="Contas" id="basic-nav-dropdown">
                    <Link to="expenseperiod" className="dropdown-item">
                      Despesas p/ Periodo
                    </Link>
                    <Link to="/expensetype" className="dropdown-item">
                      Despesas p/ Tipo
                    </Link>
                    <Link to="/accounts/create" className="dropdown-item">
                      Cadastrar Conta
                    </Link>
                  </NavDropdown>
                  <Link to="/logout" onClick={handleLogout} className="nav-link">
                    Sair
                  </Link>
                </>
              ) : (
                <Link to="/login" className="nav-link">
                  Entre
                </Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
