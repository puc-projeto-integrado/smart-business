import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {

  const baseUrl = 'http://localhost/public/';
  
  const envVars = {  
    'endPoints': {
      'highlightsUrl': `${baseUrl}api/business/highlight`
    }
  };

  return (
    <div>
      <Header/>
      <Home/>
      <Footer/>
    </div>)
}

export default App;
