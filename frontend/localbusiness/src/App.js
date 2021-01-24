import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Routing from './components/Routing';
import {isAuthenticated} from './components/Utils';

const App = () => {
  // const baseUrl = 'http://localhost/public/'

  // const envVars = {
  //   endPoints: {
  //     highlightsUrl: `${baseUrl}api/business/highlight`
  //   }
  // }

  return (
    <div key="1">
      <Header />
      <Routing isAuthenticated={isAuthenticated()}/>
      <Footer />
    </div>
  )
}

export default App
