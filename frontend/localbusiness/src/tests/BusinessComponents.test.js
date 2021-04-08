import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import { BaseContext } from "../components/ContextProviders/BaseContextProvider";
import BusinessDetail from "../components/Business/BusinessDetail";
import BusinessGrid from "../components/Business/BusinessGrid";
import BusinessItem from "../components/Business/BusinessItem";
import BusinessItemDetail from "../components/Business/BusinessItemDetail";
import BusinessItemHighlight from "../components/Business/BusinessItemHighlight";
import BusinessRegister from "../components/Business/BusinessRegister";
import Category from "../components/Business/Category";
import HomeHighlights from "../components/Home/HomeHighlights";
import {MemoryRouter, Route} from "react-router-dom";

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

const renderWithRouter = ({children}) => (
    render(
        <MemoryRouter initialEntries={['blogs/1']}>
            <Route path='/business/:id'>
                {children}
            </Route>
        </MemoryRouter>
    )
)
describe('Test User Components.', () => {

    // it('renders BusinessDetail component', () => {
    //     const {getByText} = render(<BusinessDetail />, container);
    //     expect(getByText('MEUS DADOS')).toBeInTheDocument();
    // });

    it('renders BusinessGrid component', () => {
        const {getByText} = render(<BusinessGrid />, container);
        // expect(getByText('Ver Detalhes')).toBeInTheDocument();
    });

    it('renders BusinessItem component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const {getByText} = render(
            <BaseContext.Provider value={state}>
                <BusinessItem data="1"/>
            </BaseContext.Provider>, container);
        expect(getByText('Ver Detalhes')).toBeInTheDocument();
    });

    it('renders BusinessItemDetail component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const business = {
            categoryName : 'Foo'
        }
        const {getByText} = render(
            <BaseContext.Provider value={state}>s
                <BusinessItemDetail business={business}/>
            </BaseContext.Provider>, container);
        // const aboutAnchorNode = screen.getByText(/Foo/)
        expect(getByText(/Foo/)).toBeInTheDocument();
    });

    it('renders BusinessItemHighlight component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const obj = {id:"1"};
        const {getByText} = render(
            <BaseContext.Provider value={state}>s
                <BusinessItemHighlight data={obj}/>
            </BaseContext.Provider>, container);
        expect(getByText('Ver Detalhes')).toBeInTheDocument();
    });

});

