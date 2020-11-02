import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useParams, useHistory, Link } from 'react-router-dom';
import Box from '../components/Box';
import BtnBack from '../components/BtnBack';
import CandidateForm from '../components/CandidateForm';

const COMPANY_NAME_QUERY = gql`
query getCompany($id: Int!){
  company(id: $id){
    name
  }
}
`;

const ADD_CANDIDATE_MUTATION = gql`
mutation AddCandidate(
  $name: String!,
  $email: String!,
  $address: String!,
  $age: Int!,
  $available: Boolean!,
  $companyId: Int!
){
  addCandidate(
    name: $name,
    email: $email,
    address: $address,
    age: $age,
    available: $available,
    companyId: $companyId
  ){
    id
  }
}
`;

const AddCandidate = () => {
  const history = useHistory();
  const { companyId } = useParams();
  const { loading, error, data } = useQuery(COMPANY_NAME_QUERY, {
    variables: { id: +companyId }
  })
  const [addCandidate, { adddata }] = useMutation(ADD_CANDIDATE_MUTATION);

  const handleAddCandidate = (userData) => {
    addCandidate({
      variables: {
        name: userData.name,
        email: userData.email,
        address: userData.address,
        age: parseInt(userData.age),
        available: userData.available,
        companyId: parseInt(companyId)
      }
    });
    history.goBack();
  }

  if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <Box title={`Add Candidate to ${data.company.name}`}>
      <div className="button-row">
        <BtnBack />
      </div>
      <CandidateForm companyId={companyId} onSend={handleAddCandidate} />
    </Box>

  );
}

export default AddCandidate;