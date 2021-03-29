import React from "react";

const MasterTable = (props)=>{

    const header = props.labels.map((label)=>{
       return (<td>{label}</td>)
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