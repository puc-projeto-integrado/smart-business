import React from "react";

const ChartsLegend = (props)=>{
    return (
        <div className="row">
            <div className="chartsLegend">
                <div className="square" style={{background: props.color}} />
                <div>{props.value} | {props.title}</div>
            </div>
        </div>
    )
}
export default ChartsLegend;