import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Employe from './Mil/Employe';
import Table from './Mil/Table';
import Header from './Head/Header';
import Conger from './Mil/Conger';
import Recrutement from './Mil/Recrutement';
import Paie from './Mil/Paie';

function App() {
  // 🟢 Charger les employés depuis localStorage au démarrage
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  // 🟢 Charger les candidatures depuis localStorage (si disponibles)
  const [candidatures, setCandidatures] = useState(() => {
    const savedCandidatures = localStorage.getItem('candidatures');
    return savedCandidatures ? JSON.parse(savedCandidatures) : []; // Initialisation vide si pas de données
  });

  // 🟢 Sauvegarde automatique des employés et des candidatures dans localStorage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('candidatures', JSON.stringify(candidatures)); // Sauvegarde les candidatures aussi
  }, [employees, candidatures]);

  // 🟢 Fonction pour ajouter un employé
  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  // 🟢 Fonction pour supprimer un employé
  const removeEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
  };

  // 🟢 Fonction pour modifier un employé (salaire et prime)
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
          path="empl" 
          element={<Employe employees={employees} addEmployee={addEmployee} removeEmployee={removeEmployee} />} 
        />
        <Route 
          path="/" 
          element={<Table employees={employees} candidatures={candidatures} />} 
        />
        <Route 
          path='/con' 
          element={<Conger />} 
        />
        <Route 
          path='/rec' 
          element={<Recrutement addCandidature={setCandidatures} />} 
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
