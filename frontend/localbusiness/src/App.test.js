import React from 'react';
import { render } from '@testing-library/react';
import Feedback from './components/Partials/Feedback';
import InputSelect from "./components/Partials/InputSelect";
import TableActions from "./components/Partials/TableActions";
import RowView from "./components/Partials/RowView";
import InputText from "./components/Partials/InputText";
import MasterTable from "./components/Partials/MasterTable";

const handleChange = ()=>'Foo';
const value = 'Foo Value';
const label = 'Foo Label';
const labels = { name : 'Nome', email : 'Email'};
let tableLabels = [
  ['NOME',40],
  ['EMAIL',40],
  ['AÇÕES',20]
];

test('renders Feedback component', () => {
  const params = {active: true, message : 'Houve um erro na atualização dos dados.', status:'error'};
  const { getByText } = render(<Feedback params={params}/>);
  const linkElement = getByText(params.message);
  expect(linkElement).toBeInTheDocument();
});

test('renders InputSelect component', () => {
  const options = [
      {id: 1, name : 'Foo name'},
      {id: 2, name : 'Selected item'},
  ];
  const name = "foo";
  const selectedOption = 2;
  render(<InputSelect onChange={handleChange} selectedOption={selectedOption} options={options} label={label} name={name} />);
});

test('renders TableActions component', () => {
  const view = '/view';
  const edit = '/edit';
  const add = '/add';
  const bearerToken = 'xxxxxxxx';
  render(
    <TableActions
      view={view}
      edit={edit}
      add={add}
      bearerToken={bearerToken}
    />
  );
});

test('renders RowView component', () => {
  const key = 'a-key';
  const { getByText } = render(
      <RowView
          key={key}
          name="foo"
          value={value}
      />
  );
  const linkElement = getByText(value);
  expect(linkElement).toBeInTheDocument();
});

test('renders InputText component', () => {
  const { getByText } = render(
      <InputText
          className="1"
          label={label}
          name="foo"
          value={value}
          handleChange={handleChange}
      />
  );
  const linkElement = getByText(label);
  expect(linkElement).toBeInTheDocument();
});

test('renders MasterTable component', () => {
  let formState = {name:'Peter', email:'peter@tests.com'};
  let rows = Object.keys(formState).map((key)=>{
    if(labels[key]){
      return (
          <div className="mb-3" key={key}>
            <label htmlFor="name"><strong>{labels[key]}:</strong></label><br/>
            <input type="text" name={key} className="form-control" value={formState[key]} onChange={(e)=>utils.handleFormChange(e, setFormState)}/>
          </div>
      )
    }else{
      return '';
    }
  })
  const { getByText } = render(
      <MasterTable
          labels={tableLabels}
          rows={rows}
      />
  );
  const linkElement = getByText('NOME');
  expect(linkElement).toBeInTheDocument();
});
