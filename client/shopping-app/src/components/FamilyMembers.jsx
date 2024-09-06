import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function FamilyMembers({ familyId }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/family/${familyId}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching family members', error);
      }
    };

    fetchMembers();
  }, [familyId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Family Members</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default FamilyMembers;
