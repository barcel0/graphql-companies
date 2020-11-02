import React from 'react';
import { Link } from 'react-router-dom';

const CompanyListItem = ({ id, name }) => {
  return (
    <Link to={`/company/${id}/${name}`}>
      <li className="flex justify-center align-center py-2 my-2 border border-lime rounded-lg text-lime font-medium cursor-pointer hover:bg-lime hover:text-white">
        {name}
      </li>
    </Link>
  );
}

export default CompanyListItem;