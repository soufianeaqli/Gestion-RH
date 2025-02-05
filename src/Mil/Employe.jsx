import React, { useState } from "react";
import './Mil.css';
import {employers} from './Data'

const Employe = () => {
  const [employees, setEmployees] = useState(employers);

  return (
    <div className="">
      <h1 className="">Tableau des Employés</h1>
      <table className="" border='1'>
        <thead>
          <tr className="">
            <th>id</th>
            <th className="">Nom</th>
            <th className="">Poste</th>
            <th className="">Departement</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="">
              <td className="">{employee.id}</td>
              <td className="">{employee.name}</td>
              <td className="">{employee.position}</td>
              <td className="">{employee.department}</td>
              <td><button className="">Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employe;