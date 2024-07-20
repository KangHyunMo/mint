/** @format */

import React from "react"

const MultiplicationTable = ({ result }) => {
  return (
    <div>
      {result.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  )
}

export default MultiplicationTable
