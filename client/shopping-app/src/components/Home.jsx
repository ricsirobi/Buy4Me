import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateFamily from './CreateFamily';
import JoinFamily from './JoinFamily';
import FamilyMembers from './FamilyMembers';
import API_BASE_URL from '../config';

function Home() {
  const [families, setFamilies] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'create', 'join', 'members'
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/user/families`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFamilies(response.data);
      } catch (error) {
        console.error('Error fetching families', error);
      }
    };

    fetchFamilies();
  }, []);

  const handleViewChange = (newView, familyId = null) => {
    setView(newView);
    setSelectedFamilyId(familyId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Family Dashboard</h1>
      
      {view === 'list' && (
        <div>
          <h2 className="text-2xl mb-4">Your Families</h2>
          <ul className="mb-6">
            {families.map((family) => (
              <li key={family.id} className="mb-2">
                {family.name}
                <button
                  onClick={() => handleViewChange('members', family.id)}
                  className="ml-4 bg-indigo-500 text-white px-2 py-1 rounded-lg hover:bg-indigo-600"
                >
                  View Members
                </button>
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => handleViewChange('create')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
          >
            Create Family
          </button>
          <button
            onClick={() => handleViewChange('join')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Join Family
          </button>
        </div>
      )}

      {view === 'create' && (
        <CreateFamily />
      )}

      {view === 'join' && (
        <JoinFamily />
      )}

      {view === 'members' && selectedFamilyId && (
        <FamilyMembers familyId={selectedFamilyId} />
      )}

      {view !== 'list' && (
        <button
          onClick={() => handleViewChange('list')}
          className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Families
        </button>
      )}
    </div>
  );
}

export default Home;
