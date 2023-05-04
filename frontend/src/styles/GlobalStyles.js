import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    :root {
        --dark-purple: #36213E;
        --english-violet: #554971;
        --slate-gray: #63768D;
        --photo-blue: #8AC6D0;
        --photo-blue-light: #B8F3FF;
    }

    .navbar {
        --bs-nav-link-font-size: 1.5rem;
        --bs-navbar-brand-font-size: 1.5rem;
    }

    .btn-primary {
        background: var(--english-violet);
        border-color: var(--english-violet);

        :hover {
            background: var(--dark-purple);
            border-color: var(--dark-purple);
        }
    }

    .bg-primary {
        background-color: var(--english-violet) !important;
        border-color: var(--english-violet);
    }

    .bg-secondary {
        background-color: var(--dark-purple) !important;
        border-color: var(--dark-purplet);
    }

    .text-primary {
        color: var(--photo-blue-light) !important;
    }

    .text-secondary {
        color: var(--english-violet) !important;
    }

    .dropdown-menu {
        --bs-dropdown-link-active-bg: var(--english-violet);
        --bs-dropdown-bg: var(--english-violet);
    }

    .dropdown-item {
        color: #fff;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        outline: none;
        font-family: 'Inter';
    }

    html {
        font-size: 62.5%;
    }

    a {
       text-decoration: none; 
    }

    ul {
        list-style: none;
    }

    body {
        background-color: var(--slate-gray);
        position: relative; 
        min-height: 100vh;
    }

    .toast-container {
        width: 25rem;;
    }

    .toast-container>:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const Container = styled.section`
    max-width: 90rem;
    background-color: #fff;
    margin: 0 auto;
    padding: 2rem;
    border-radius: .5rem;
    box-shadow: .5rem .5rem 1rem rgba(0, 0, 0, 0.4);
`;
