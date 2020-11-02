import React from 'react';

const Box = ({ children, title }) => {
  return (
    <div className="bg-gray-800 p-8 m-10 rounded-xl shadow-xl w-5/12">
      <h1 className="title">{title}</h1>
      {children}
    </div>
  );
}

export default Box;