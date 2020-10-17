import React from 'react';

const BusinessHighlight = (props) => {
    console.log(props.data)
    let data = props.data;
    return (
        <div>
            <div className="business-post highlight">
            <div className="row">
                <div className="col-4 image-holder d-none d-sm-block">
                    <img src="./assets/images/thumb-limpeza.jpg" alt=""/>
                </div>
                <div className="col-md-8 col-sm-12">
                    <a href="http://localhost" className="info"><span className="fas fa-map-marker-alt"></span> {data.category_name} em {data.city_name}</a>
                        <h4 className="gray-5">{data.name}</h4>
                    <p className="gray-5">{data.description}</p>

                    <div className="row">
                        <div className="col-6">
                            <button type="button" className="btn btn-outline-primary btn-block"><span className="fas fa-star"></span> Adicionar aos Favoritos</button>
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-outline-primary btn-block"><span className="fas fa-eye"></span> Ver Detalhes</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </div>
    )
}
  
export default BusinessHighlight;