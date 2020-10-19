import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Routing from './components/Routing';

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
      <Routing/>
      <Footer />
    </div>
  )
}

export default App
