import React, { Component } from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
};
const TableBody = (props: {characterData: any[] , removeCharacter: any }) => {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
      )
    })
  
    return <tbody>{rows}</tbody>
  }

const ItemTable = (props: { characterData: any; removeCharacter: any }) => {
  const { characterData, removeCharacter } = props;

  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} removeCharacter={removeCharacter} />
    </table>
  );
};

export default ItemTable;
