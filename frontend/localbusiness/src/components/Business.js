import React from 'react';

const Business = (props) => {
    console.log(props.data)
    return (
        <div className="col-md-6 col-sm-12">
            <div className="business-post">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <h4 className="gray-4">{props.data.name}</h4>
                        <p>{props.data.description.substr(0,160)}</p>

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

export default Business;