import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const BtnBack = () => {
  const history = useHistory();
  return <Link to='#' onClick={() => history.goBack()}>[Go Back]</Link>
}

export default BtnBack;