import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Employe from './Mil/Employe';
import Table from './Mil/Table';
import Header from './Head/Header';
import Conger from './Mil/Conger';
import Recrutement from './Mil/Recrutement';
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="empl" element={<Employe/>}/>
        <Route path="/" element={<Table/>}/>
        <Route path='/con' element={<Conger/>}/>
        <Route path='/rec' element={<Recrutement/>}/>
      </Routes>
    </div>
  );
}

export default App;