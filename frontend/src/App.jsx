import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Employe from './Mil/Employe';
import Table from './Mil/Table';
import Header from './Head/Header';
import Conger from './Mil/Conger';
import LoginPage from './Mil/Login';
import Recrutement from './Mil/Recrutement';
import Paie from './Mil/Paie';
import Register from './Mil/Register';
import ForgotPassword from './Mil/ForgotPassword';

function App() {
  // Gestion de l'état d'authentification
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return (savedEmployees && savedEmployees !== "undefined") ? JSON.parse(savedEmployees) : [];
  });

  const [candidatures, setCandidatures] = useState(() => {
    const savedCandidatures = localStorage.getItem('candidatures');
    return (savedCandidatures && savedCandidatures !== "undefined") ? JSON.parse(savedCandidatures) : [];
  });

  const [pendingLeavesCount, setPendingLeavesCount] = useState(() => {
    const storedLeaves = localStorage.getItem("congees");
    const parsedLeaves = (storedLeaves && storedLeaves !== "undefined") ? JSON.parse(storedLeaves) : [];
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
      prevEmployees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
    );
  };

  const [loadingEmployees, setLoadingEmployees] = useState(true);

  useEffect(() => {
    // Simulate fetching employees data
    setLoadingEmployees(true);
    setTimeout(() => {
      // Assume fetchEmployees is a function that fetches employee data
      // fetchEmployees().then(data => {
      //   setEmployees(data);
      //   setLoadingEmployees(false);
      // });

      // For demonstration, we simulate fetching with a timeout
      setLoadingEmployees(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <div>
      {isLoggedIn && <Header onLogout={handleLogout} />}
      <Routes>
        {/* Route pour le Login */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsLoggedIn} />} />
        {/* Route pour l'inscription */}
        <Route path="/register" element={<Register />} />
        {/* Route pour le mot de passe oublié */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Routes protégées : si l'utilisateur n'est pas connecté, il est redirigé vers /login */}
        <Route
          path="/"
          element={isLoggedIn ? (
            <Table 
              employees={employees} 
              candidaturesCount={candidaturesCount} 
              pendingLeavesCount={pendingLeavesCount} 
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/empl"
          element={isLoggedIn ? (
            <Employe 
              employees={employees} 
              loadingEmployees={loadingEmployees} 
              addEmployee={addEmployee} 
              removeEmployee={removeEmployee} 
              updateEmployee={updateEmployee} 
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/con"
          element={isLoggedIn ? (
            <Conger 
              employees={employees} 
              setPendingLeavesCount={setPendingLeavesCount} 
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/rec"
          element={isLoggedIn ? (
            <Recrutement 
              updateCandidaturesCount={updateCandidaturesCount} 
              addCandidature={setCandidatures} 
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/pai"
          element={isLoggedIn ? (
            <Paie 
              employees={employees} 
              loadingEmployees={loadingEmployees} 
              updateEmployee={updateEmployee} 
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
