import React from "react";

const MasterTable = (props)=>{

    const header = props.labels.map((label)=>{
        let width = `${label[1]}%`;
        return (<td width={width} key={'td'+label[0]}><strong>{label[0]}</strong></td>)
    });

    return (
        <table className="table mt-5">
            <thead>
            <tr>
                {header}
            </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
        </table>
    )
}

export default MasterTable;