import React, { useState } from "react";
import './Mil.css';
import {performance} from './Data'

const Performance = () => {
  const [perf, setper] = useState(performance);

  return (
    <div className="">
      <h1 className="">Evaluation de Performance</h1>
      <table className="" border='1'>
        <thead>
          <tr className="">
            <th className="">Nom</th>
            <th className="">Periode</th>
            <th className="">Note</th>
            <th className="">Status</th>
          </tr>
        </thead>
        <tbody>
          {perf.map((perf) => (
            <tr key={perf.id} className="">
              <td className="">{perf.name}</td>
              <td className="">{perf.period}</td>
              <td className="">{perf.note}</td>
              <td className="">{perf.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;