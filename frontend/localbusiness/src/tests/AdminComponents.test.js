import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import AdminViewBusiness from "../components/Admin/ManageBusiness/AdminViewBusiness";
import {UtilsContext} from "../components/ContextProviders/UtilsContextProvider";
import {Route, MemoryRouter} from 'react-router-dom';

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

describe('ManageBusiness', () => {

    it('renders AdminViewBusiness component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const comp =
            <UtilsContext.Provider value={state}>
                <MemoryRouter initialEntries={['/admin/business/6268']}>
                    <Route path='/admin/business/:id'>
                        <AdminViewBusiness />
                    </Route>
                </MemoryRouter>
            </UtilsContext.Provider>;

        const {getByText} = render(comp, container)
        expect(getByText('Ver Dados')).toBeInTheDocument();
    });

    it('renders AdminUpdateBusiness component', () => {

    });

    it('renders ManageBusiness component', () => {

    });
    
});


describe('ManageCategory', () => {

    it('renders AdminViewCategory component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const comp =
            <UtilsContext.Provider value={state}>
                <MemoryRouter initialEntries={['/admin/business/6268']}>
                    <Route path='/admin/business/:id'>
                        <AdminViewBusiness />
                    </Route>
                </MemoryRouter>
            </UtilsContext.Provider>;

        const {getByText} = render(comp, container)
        expect(getByText('Ver Dados')).toBeInTheDocument();
    });

    it('renders AdminUpdateCategory component', () => {

    });

    it('renders ManageCategory component', () => {

    });

});


describe('ManageUser', () => {

    it('renders AdminViewBusiness component', () => {
        const urls = { business:"#"};
        const state = [categories, urls];
        const comp =
            <UtilsContext.Provider value={state}>
                <MemoryRouter initialEntries={['/admin/business/6268']}>
                    <Route path='/admin/business/:id'>
                        <AdminViewBusiness />
                    </Route>
                </MemoryRouter>
            </UtilsContext.Provider>;

        const {getByText} = render(comp, container)
        expect(getByText('Ver Dados')).toBeInTheDocument();
    });

    it('renders AdminUpdateUser component', () => {

    });

    it('renders ManageUser component', () => {

    });

});

