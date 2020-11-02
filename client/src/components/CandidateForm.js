import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CandidateForm = ({ companyId, candidate, onSend, onDelete }) => {
  const [name, setName] = useState(candidate ? candidate.name : '');
  const [email, setEmail] = useState(candidate ? candidate.email : '');
  const [address, setAddress] = useState(candidate ? candidate.address : '');
  const [age, setAge] = useState(candidate ? candidate.age : 18);
  const [available, setAvailable] = useState(candidate ? candidate.available : true);

  const handleSend = () => {
    const newUserData = { name, email, address, age, available }
    onSend(newUserData);
  }

  return (
    <div className="my-4">
      <div>
        <div className="data-row">
          <label htmlFor="companyId">Company ID</label>
          <input type="text" id="companyId" value={companyId} readOnly disabled />
        </div>
        <div className="data-row">
          <label htmlFor="name">Name</label>
          <input className="input-enabled" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="data-row">
          <label htmlFor="email">Email</label>
          <input className="input-enabled" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="data-row">
          <label htmlFor="address">Address</label>
          <input className="input-enabled" type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="data-row">
          <label htmlFor="age">Age</label>
          <input className="input-enabled" type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} min={18} />
        </div>
        <div className="flex px-2 my-2">
          <label htmlFor="available">Available</label>
          <div className="ml-2">
            <input type="checkbox" id="available" checked={available} onChange={() => setAvailable(!available)} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="#" onClick={handleSend}>[Send]</Link>
      </div>
    </div>
  );
}

export default CandidateForm;