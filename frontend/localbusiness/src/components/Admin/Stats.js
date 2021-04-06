import React, {useContext, useEffect, useState} from "react";
// import {PieChart, Legend} from 'react-easy-chart';
import ChartsPie from "./charts/ChartsPie";
import ChartsBar from "./charts/ChartsBar";
import {BaseContext} from "../ContextProviders/BaseContextProvider";
import Loading from "../Loading";

const Stats = ()=>{

    const [base] = useContext(BaseContext);
    const [dataCategories, setDataCategories] = useState([]);
    const [dataCities, setDataCities] = useState([]);
    const [dataStates, setDataStates] = useState([]);
    const [dataFavorites, setDataFavorites] = useState([]);
    const [dataRegisters, setDataRegisters] = useState([]);

    useEffect(() => {
        fetch(base.urls.statsByCategory)
            .then(response => response.json())
            .then(data => setData(data, setDataCategories));

        fetch(base.urls.statsByState)
            .then(response => response.json())
            .then(data => setData(data, setDataStates));

        fetch(base.urls.statsByCity)
            .then(response => response.json())
            .then(data => setData(data, setDataCities));

        fetch(base.urls.statsByFavorite)
            .then(response => response.json())
            .then(data => setData(data, setDataFavorites));

        fetch(base.urls.statsByRegister)
            .then(response => response.json())
            .then(data => prepareDataRegisters(data));

    }, [base.urls]);

    const setData = (data, functionRef)=>{
        let dataList = [];
        data.forEach((item)=>{
            // let tempObj = {"key":"[" + item.num_registers + "] " + item.name, "value":item.num_registers};
            let tempObj = {"name":item.name, "value":item.num_registers};
            dataList.push(tempObj);
        })
        functionRef(dataList);
    }

    const prepareDataRegisters = (data)=>{
        console.log('Prepare data...')
        let summary = {};
        let box = [];

        data.forEach((item)=>{
            let year = item.year;

            if(summary[year]){
                summary[year] = summary[year] + item.total;
            }else{
                let boxObj = {name: year, value : item.total}
                box.push(boxObj)
                summary[year] = item.total;
            }
        });
        setDataRegisters(box)
        console.log('SUMM ', summary)
        console.log('BOX ', box)
    }

    // const data = [
    //     { name: 'Group A', value: 650 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 300 },
    //     { name: 'Group D', value: 200 },
    //     { name: 'Group E', value: 278 },
    //     { name: 'Group F', value: 189 },
    // ];
    // const dataByStates = [
    //     {key: 'São Paulo', value: 180},
    //     {key: 'Rio de Janeiro', value: 120},
    //     {key: 'Minas Gerais', value: 60},
    //     {key: 'Paraná', value: 20},
    //     {key: 'Outros', value: 10},
    // ];
    //
    // const dataByCity = [
    //     {key: 'São Paulo', value: 80},
    //     {key: 'Rio de Janeiro', value: 60},
    //     {key: 'Campinas', value: 50},
    //     {key: 'São José do Rio Preto', value: 50},
    //     {key: 'Curitiba', value: 20},
    //     {key: 'Outras', value: 10},
    // ];
    // if(dataCategories.length>0 && dataCities.length>0 && dataStates.length>0 && dataFavorites.length>0){
    if(dataCategories.length>0){
        console.log("FAVORITES ", dataRegisters)
        return (

            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 pt-5">
                        <h2 className="mb-5">Estatísticas</h2>
                        <h4>Empresas distribuídas por:</h4>
                        <div className="row">
                            <div className="col-md-4 col-sm-12 mt-5">
                                <h5>Estados</h5>
                                <ChartsPie data={dataStates}/>
                            </div>
                            <div className="col-md-4 col-sm-12 mt-5">
                                <h5>Cidades</h5>
                                <ChartsPie data={dataCities}/>
                            </div>
                            <div className="col-md-4 col-sm-12 mt-5">
                                <h5>Categorias </h5>
                                <ChartsPie data={dataCategories}/>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12  col-sm-12 mt-5">
                                <h5>Empresas mais favoritadas:</h5>
                                <ChartsBar data={dataFavorites} barDataKey="Quantidade" className="mt-3"/>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12  col-sm-12 mt-5">
                                <h5>Cadastros ao longo do tempo:</h5>
                                <ChartsBar data={dataRegisters} barDataKey="Quantidade" className="mt-3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return <Loading />
    }

}

export default Stats;