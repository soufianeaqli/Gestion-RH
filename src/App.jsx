import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Employe from './Mil/Employe';
import Table from './Mil/Table';
import Header from './Head/Header';
import Conger from './Mil/Conger';
import Performance from './Mil/Performance'
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="empl" element={<Employe/>}/>
        <Route path="/" element={<Table/>}/>
        <Route path="/per" element={<Performance/>}/>
        <Route path='/con' element={<Conger/>}/>
      
      </Routes>
    </div>
  );
}

export default App;