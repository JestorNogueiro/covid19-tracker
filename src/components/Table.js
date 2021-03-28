import React from "react";
import "./table.css";
import numeral from "numeral";
const Table = ({ countriesTable }) => {
  return (
    <div className="table">
      {countriesTable.map(({ country, cases }) => {
        return (
          <tr key={country.id}>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format(0, 0)}</strong>
            </td>
          </tr>
        );
      })}
    </div>
  );
};

export default Table;
