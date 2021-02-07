import React from "react";

const Feedback = (props)=>{

    let params = props.params;

    if(params.active && params.status){
        console.log(params)
        let style = (params.status === 'error') ? "alert alert-danger" : "alert alert-success";
        return  <div className={style} role="alert">{params.message}</div>;

    }else{
        return null;
    }

}

export default Feedback;