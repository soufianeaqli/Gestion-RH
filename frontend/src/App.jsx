import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Employe from './Mil/Employe';
import Table from './Mil/Table';
import Header from './Head/Header';
import Conger from './Mil/Conger';
import Recrutement from './Mil/Recrutement';
import Paie from './Mil/Paie';

function App() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  const [candidatures, setCandidatures] = useState(() => {
    const savedCandidatures = localStorage.getItem('candidatures');
    return savedCandidatures ? JSON.parse(savedCandidatures) : [];
  });

  const [pendingLeavesCount, setPendingLeavesCount] = useState(() => {
    const storedLeaves = localStorage.getItem("congees");
    const parsedLeaves = storedLeaves ? JSON.parse(storedLeaves) : [];
    return parsedLeaves.filter(leave => leave.status === "En attente").length;
  });

  const [candidaturesCount, setCandidaturesCount] = useState(0);

  const updateCandidaturesCount = (count) => {
    setCandidaturesCount(count);
  };

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('candidatures', JSON.stringify(candidatures));
  }, [employees, candidatures]);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const removeEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map(emp =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Table employees={employees} candidaturesCount={candidaturesCount} pendingLeavesCount={pendingLeavesCount} />}
        />
        <Route
          path="empl"
          element={<Employe employees={employees} addEmployee={addEmployee} removeEmployee={removeEmployee} />}
        />
        <Route
          path='/con'
          element={<Conger setPendingLeavesCount={setPendingLeavesCount} />}
        />
        <Route
          path='/rec'
          element={<Recrutement updateCandidaturesCount={updateCandidaturesCount} addCandidature={setCandidatures} />}
        />
        <Route
          path='/pai'
          element={<Paie employees={employees} updateEmployee={updateEmployee} />}
        />
      </Routes>
    </div>
  );
}

export default App;
