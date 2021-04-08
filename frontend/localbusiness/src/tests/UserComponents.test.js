import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import Dashboard from "../components/User/Dashboard";
import { BaseContext } from "../components/ContextProviders/BaseContextProvider";
import Favorites from "../components/User/Favorites";
import UserBusiness from "../components/User/UserBusiness";
import UserRegister from "../components/User/UserRegister";
import UserUpdate from "../components/User/UserUpdate";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const categories = [
    {id:1, name: 'Category 1'},
    {id:2, name: 'Category 2'},
];

// const server = setupServer(
//     // capture "GET /greeting" requests
//     rest.get('http://localhost/public/api/user/3', (req, res, ctx) => {
//         // respond using a mocked JSON body
//         return res(ctx.json({ greeting: 'hello there' }))
//     })
// )

describe('Test User Components.', () => {

    it('renders Dashboard component', () => {
        const {getByText} = render(<Dashboard />, container);
        expect(getByText('MEUS DADOS')).toBeInTheDocument();
    });

    it('renders Favorites component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const {getByText} = render(
            <BaseContext.Provider value={state}><Favorites /></BaseContext.Provider> , container
        );
        expect(getByText('Favoritos')).toBeInTheDocument();
    });

    it('renders UserBusiness component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const {getByText} = render(
            <BaseContext.Provider value={state}><UserBusiness /></BaseContext.Provider>, container);
        expect(getByText('Sua Empresa')).toBeInTheDocument();
    });

    it('renders UserRegister component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const {getByText} = render(
            <BaseContext.Provider value={state}><UserRegister /></BaseContext.Provider>, container);
        expect(getByText('CRIE SUA CONTA')).toBeInTheDocument();
    });

    // it('renders UserUpdate component', () => {
    //     //http://localhost/public/api/user/3
    //
    //     const urls = { business:"#"};
    //     const credentials = { userId: 3}
    //     //const state = [categories, urls, credentials];
    //
    //     let state = {
    //         urls : urls,
    //         credentials : credentials,
    //     }
    //
    //     const {getByText} = render(
    //         <BaseContext.Provider value={[state]}><UserUpdate /></BaseContext.Provider>, container);
    //     console.log(getByText)
    //     expect(getByText('Nome:')).toBeInTheDocument();
    // });

});

