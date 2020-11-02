import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CompanyListItem from './CompanyListItem';

const COMPANIES_QUERY = gql`
query getCompanies{
  companies{
    id
    name
  }
}
`;

const CompaniesList = () => {
  const { loading, error, data } = useQuery(COMPANIES_QUERY);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;

  return (
    <>
      <h1 className="title">Select Company</h1>
      <ul>
        {data.companies.map(company => {
          return <CompanyListItem key={company.id} id={company.id} name={company.name} />
        })}
      </ul>
    </>
  );
}

export default CompaniesList;