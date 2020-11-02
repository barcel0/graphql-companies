import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams, useHistory } from 'react-router-dom';
import Box from '../components/Box';
import BtnBack from '../components/BtnBack';

const COMPANY_DETAILS_QUERY = gql`
  query getCompany($id: Int!){
    company(id: $id){
      id
      name
      address
      phone
      country
      level
      hiring
      candidates{
        id
        name
      }
    }
  }
  `;

const CompanyDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(COMPANY_DETAILS_QUERY, {
    variables: { id: +id },
    fetchPolicy: "no-cache"
  })

  if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <Box title={`${data.company.name} Details`}>
      <div class="button-row">
        <BtnBack />
        <Link to={`/candidate/add/${data.company.id}`}>[Add Candidate]</Link>
      </div>
      <ul>
        <li className="data-row">
          <span>Company ID: </span>
          <span className="data">{data.company.id}</span>
        </li>
        <li className="data-row">
          <span>Name: </span>
          <span className="data">{data.company.name}</span>
        </li>
        <li className="data-row">
          <span>Address: </span>
          <span className="data">{data.company.address}</span>
        </li>
        <li className="data-row">
          <span>Phone: </span>
          <span className="data">{data.company.phone}</span>
        </li>
        <li className="data-row">
          <span>Country: </span>
          <span className="data">{data.company.country}</span>
        </li>
        <li className="data-row">
          <span>Level: </span>
          <span className="data">{data.company.level}</span>
        </li>
        <li className="data-row">
          <span>Hiring: </span>
          <span className="data">{data.company.hiring ? 'Yes' : 'No'}</span>
        </li>
        <li className="data-row"><span>Candidates: </span>
          <ul>
            {data.company.candidates.map(candidate => {
              return (
                <li
                  class="flex justify-end cursor-pointer data"
                  key={candidate.id}>
                  <Link to={`/candidate/${candidate.id}/${candidate.name}`}>{candidate.name}</Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </Box>
  );
}

export default CompanyDetails;