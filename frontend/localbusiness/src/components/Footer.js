import React, {useContext} from 'react';
import { BaseContext } from './ContextProviders/BaseContextProvider';

const Footer = ()=>{

    const [base] = useContext(BaseContext);

    if(base.categories){

        let categories = base.sortAlphabetically(base.categories);
        const total = categories.length;
        let count = 0;

        let colData = [];
        let col2Data = [];
        let col3Data = [];

        categories.forEach(item => {
            let urlCategory = `/category/${item.id}`;

            if(count<total/3){
                colData.push(<li key={item.id}><a href={urlCategory}><em className="fa fa-check"></em> {item.name}</a></li>);
            }else if(count>total/3 && count<total/3*2+1){
                col2Data.push(<li key={item.id}><a href={urlCategory}><em className="fa fa-check"></em> {item.name}</a></li>);
            }else{
                col3Data.push(<li key={item.id}><a href={urlCategory}><em className="fa fa-check"></em> {item.name}</a></li>);
            }
            count++;
        });

    return (
            <footer className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h5>CATEGORIAS</h5>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <ul>
                                {colData}
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <ul>
                            {col2Data}
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <ul>
                            {col3Data}
                            </ul>
                        </div>
                    </div>
                    <hr className="mt-5"/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="credits">
                                <span className="fa fa-bolt"></span> PUC-MG | Trabalho de Conclusão de Curso<br/>Copyright <a href="http://gabrielguerra.me">gabrielguerra.me</a>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
    )
    }else{
        return null;
    }
}
  
export default Footer;