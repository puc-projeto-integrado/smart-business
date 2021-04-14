import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import Feedback from "../components/Partials/Feedback";
import Column from "../components/Column";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "../components/Login";
import Home from "../components/Home/Home";
import { BaseContext } from "../components/ContextProviders/BaseContextProvider";
import HomeHighlights from "../components/Home/HomeHighlights";

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

describe('Test Main Components.', () => {

    it('renders Feedback component', () => {
        let params = {active: true, message: 'Houve um erro na atualização dos dados.', status: 'error'};
        const {getByText} = render(<Feedback params={params}/>, container);
        const linkElement = getByText(params.message);
        expect(linkElement).toBeInTheDocument();
    });

    it('renders Column component', () => {
        const {getByText} = render(<Column categories={categories}/>, container);
        expect(getByText(categories[0].name)).toBeInTheDocument();
        expect(getByText(categories[1].name)).toBeInTheDocument();
    });

    it('renders Footer component', () => {
        const {getByText} = render(<Footer categories={categories}/>, container);
        expect(getByText(categories[0].name)).toBeInTheDocument();
        expect(getByText(categories[1].name)).toBeInTheDocument();
    });

    it('renders Header component', () => {
        const {getByText} = render(<Header />, container);
        expect(getByText('CADASTRAR EMPRESA')).toBeInTheDocument();
        expect(getByText('LOGIN')).toBeInTheDocument();
    });

    it('renders Login component', () => {
        const {getByText} = render(<Login />, container);
        expect(getByText('LOGIN')).toBeInTheDocument();
    });

});

it('renders Home component', () => {
    const urls = { business:"#"};
    const state = [categories, urls];
    const {getByText} = render(
        <BaseContext.Provider value={state}><Home /></BaseContext.Provider> , container
    );
    expect(getByText('Mais Recentes')).toBeInTheDocument();
});

it('renders Home component', () => {
    const urls = { business:"#"};
    const state = [categories, urls];
    const {getByText} = render(
        <BaseContext.Provider value={state}><HomeHighlights /></BaseContext.Provider> , container
    );

    // expect(getByText('Mais Recentes')).toBeInTheDocument();
});

// // Component.test.js
// test('AppHeader renders a <Clock />', () => {
//     const { getAllByTestId, getByTestId } = render(<AppHeader />);
//     const appHeader = getByTestId('app-header')
//     const clocksInHeader = within(appHeader).getAllByTestId('clock')
//     expect(clocksInHeader.length).toBe(3);
// });