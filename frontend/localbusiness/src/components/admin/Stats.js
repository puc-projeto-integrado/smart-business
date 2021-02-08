import React from "react";
import {PieChart, Legend} from 'react-easy-chart';

const Stats = ()=>{
    const dataByStates = [
        {key: 'São Paulo', value: 180},
        {key: 'Rio de Janeiro', value: 120},
        {key: 'Minas Gerais', value: 60},
        {key: 'Paraná', value: 20},
        {key: 'Outros', value: 10},
    ];

    const dataByCity = [
        {key: 'São Paulo', value: 80},
        {key: 'Rio de Janeiro', value: 60},
        {key: 'Campinas', value: 50},
        {key: 'São José do Rio Preto', value: 50},
        {key: 'Curitiba', value: 20},
        {key: 'Outras', value: 10},
    ];
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12 pt-5">
                    <h2 className="mb-5">Estatísticas</h2>

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <h5>Distribuição por Estados:</h5>
                            <PieChart data={dataByStates} size={300} />
                            <Legend data={dataByStates} dataId={'key'} />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <h5>Distribuição por Cidades:</h5>
                            <PieChart data={dataByCity} size={300} />
                            <Legend data={dataByCity} dataId={'key'} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Stats;