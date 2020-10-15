import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Loading from './components/Loading';
import Home from './components/Home';
import Footer from './components/Footer';

const baseUrl = 'http://localhost/public/api/business';

const App = ()=>{

  const [businessData, setBusinessData] = useState(null);

  useEffect( ()=> {
      fetch(`${baseUrl}`)
          .then(response => response.json())
          .then(data => setBusinessData(data))
  },[]);

  if(businessData){
    return (
      <div>
        <Header/>
        <Home/>
        <Footer/>
      </div>)
  }else{
    return <Loading/>
  }
  
}

export default App;
