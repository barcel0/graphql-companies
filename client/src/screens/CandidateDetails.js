import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Link, useParams, useHistory } from 'react-router-dom';
import Box from '../components/Box';
import CandidateForm from '../components/CandidateForm';
import BtnBack from '../components/BtnBack';

const CANDIDATE_DETAILS_QUERY = gql`
query getCandidate($id: Int!){
  candidate(id: $id){
    id
    name
    email
    address
    age
    available
    companyId
    company{
      name
    }
  }
}
`;

const UPDATE_CANDIDATE_MUTATION = gql`
mutation updateCandidateData($id: Int!, $name: String!, $email: String!, $address: String!, $age: Int!, $available: Boolean!){
  updateCandidate(id: $id, name: $name, email: $email, address: $address, age: $age, available: $available){
    id
  }
}
`;

const DELETE_CANDIDATE_MUTATION = gql`
  mutation deleteCandidateById($id: Int!){
    deleteCandidate(id:$id){
        id
    }
  }
`;

const CandidateDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(CANDIDATE_DETAILS_QUERY, {
    variables: { id: +id }
  })
  const [deleteCandidate, { deleteData }] = useMutation(DELETE_CANDIDATE_MUTATION);
  const [updateCandidade, { updateData }] = useMutation(UPDATE_CANDIDATE_MUTATION, {
    refetchQueries: [{ query: CANDIDATE_DETAILS_QUERY, variables: { id: +id } }],
    awaitRefetchQueries: true
  });

  const handleCandidateUpdate = (userData) => {
    updateCandidade({
      variables: {
        id: parseInt(id),
        name: userData.name,
        email: userData.email,
        address: userData.address,
        age: parseInt(userData.age),
        available: userData.available,
      }
    });
    history.goBack()

  }

  const handleCandidateDelete = () => {
    deleteCandidate({ variables: { id: +id } });
    history.goBack();
  }

  if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <Box title={`Candidate Details: ${data.candidate.name}`}>
      <div className="button-row">
        <BtnBack />
        <Link to='#' onClick={handleCandidateDelete}>[Delete Candidate]</Link>
      </div>
      <CandidateForm
        companyId={data.candidate.companyId}
        candidate={data.candidate}
        onSend={handleCandidateUpdate}
      />
    </Box>
  );
}

export default CandidateDetails;