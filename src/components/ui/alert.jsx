import React from 'react';

const Alert = ({ message, type }) => {
  const alertStyles = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor:
      type === 'success'
        ? 'green'
        : type === 'error'
        ? 'red'
        : type === 'warning'
        ? 'orange'
        : 'blue',
  };

  return <div style={alertStyles}>{message}</div>;
};

export default Alert;
