import React from 'react';
import {render} from '@testing-library/react';
import Feedback from '../components/Partials/Feedback';
import InputSelect from "../components/Partials/InputSelect";
import TableActions from "../components/Partials/TableActions";
import RowView from "../components/Partials/RowView";
import InputText from "../components/Partials/InputText";
import MasterTable from "../components/Partials/MasterTable";

const fooFunction = () => 'FooFunction';
const defaultUrl = '/foo'
const bearerToken = 'xxxxxxxx';
const value = 'Foo Value';
const label = 'Foo Label';
let tableLabels = [
    ['NOME', 40],
    ['EMAIL', 40],
    ['AÇÕES', 20]
];

describe('Test Partials Components.', () => {

    it('renders Feedback component', () => {
        let params = {active: true, message: 'Houve um erro na atualização dos dados.', status: 'error'};
        const {getByText} = render(<Feedback params={params}/>);
        const linkElement = getByText(params.message);
        expect(linkElement).toBeInTheDocument();
    });

    it('renders InputSelect component', () => {
        const options = [
            {id: 1, name: 'Foo name'},
            {id: 2, name: 'Selected item'},
        ];
        const name = "foo";
        const selectedOption = 2;
        render(<InputSelect handleChange={fooFunction} selectedOption={selectedOption} options={options} label={label} name={name}/>);
    });

    it('renders TableActions component', () => {
        render(
            <table><tbody><tr>
                    <TableActions
                        view={defaultUrl}
                        edit={defaultUrl}
                        add={defaultUrl}
                        bearerToken={bearerToken}
                    />
            </tr></tbody></table>);
    });

    it('renders RowView component', () => {
        const {getByText} = render(<RowView name="foo" htmlFor="test" value={value}/>);
        const linkElement = getByText(value);
        expect(linkElement).toBeInTheDocument();
    });

    it('renders InputText component', () => {
        const {getByText} = render(
            <InputText
                label={label}
                name={label}
                value={value}
                handleChange={fooFunction}
            />
        );
        const linkElement = getByText(label);
        expect(linkElement).toBeInTheDocument();
    });

    it('renders MasterTable component', () => {
        let formState = [
            {id: 1, name: 'Peter', email: 'peter@tests.com'},
            {id: 2, name: 'Gabriel', email: 'gabriel@tests.com'},
        ];
        let rows = formState.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <TableActions
                        id={item.id}
                        view={defaultUrl}
                        edit={defaultUrl}
                        itemDeleteCallback={fooFunction}
                        processItemDeleteCallback={fooFunction}
                        urlItemDelete={defaultUrl}
                        bearerToken={bearerToken}
                    />
                </tr>
            )
        })
        const {getByText} = render(<MasterTable labels={tableLabels} rows={rows} />);
        expect(getByText('NOME')).toBeInTheDocument();
        expect(getByText('EMAIL')).toBeInTheDocument();
    });
});