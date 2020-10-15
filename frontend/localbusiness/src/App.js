import React, { useState, useEffect } from 'react';
import './App.css';

const baseUrl = 'http://localhost/public/api/business';

const Loading = ()=>{
  return (
      <div className="App">
          <header className="App-header">
              <div>LOADING...</div>
          </header>
      </div>
  )
}

const App = ()=>{

  const [businessData, setBusinessData] = useState(null);

  useEffect( ()=> {
      fetch(`${baseUrl}`)
          .then(response => response.json())
          .then(data => setBusinessData(data))
  },[]);

  if(businessData){
    return(<div>Done</div>)
  }else{
    return <Loading/>
  }
  
}

export default App;
