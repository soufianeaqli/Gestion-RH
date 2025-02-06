import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Employe from './Mil/Employe';
import Table from './Mil/Table';
import Header from './Head/Header';
import Conger from './Mil/Conger';
import Recrutement from './Mil/Recrutement';
import Paie from './Mil/Paie';
import { employees } from './Mil/Data';

function App() {
  const [employee, setEmployees] = useState(employees);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const removeEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="empl" element={<Employe employees={employee} addEmployee={addEmployee} removeEmployee={removeEmployee} />} />
        <Route path="/" element={<Table />} />
        <Route path='/con' element={<Conger />} />
        <Route path='/rec' element={<Recrutement />} />
        <Route path='/pai' element={<Paie employees={employee} />} />
      </Routes>
    </div>
  );
}

export default App;
