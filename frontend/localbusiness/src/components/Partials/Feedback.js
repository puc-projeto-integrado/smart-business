import React from "react";

const Feedback = (props)=>{
    //console.log('FEEDBACK ', props)
    let params = props.params;

    if(params.active && params.status){
        let style = (params.status === 'error') ? "alert alert-danger" : "alert alert-success";
        return  <div className={style} role="alert">{params.message}</div>;
    }else{
        return null;
    }
}

export default Feedback;