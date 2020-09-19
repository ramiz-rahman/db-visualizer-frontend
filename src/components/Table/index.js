import React from 'react';
import './style.css';

const Table = ({ headers, items }) => {
  return (
    <table className="Table">
      <thead>
        <tr className="Table__Header">
          {headers.map((header) => (
            <th className="Table__Cell">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr>
            {Object.keys(item).map((key) => (
              <td className="Table__Cell">{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
