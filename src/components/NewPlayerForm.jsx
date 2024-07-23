import React, { useState } from 'react';
import './NewPlayerForm.css';

function NewPlayerForm() {
  const [name, setName] = useState('');
  const [TeamId, setTeamId] = useState('');
  const [breed, setBreed] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newPlayer = {
        name,
        TeamId,
        breed,
      };

      const baseUrl =
        'https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT';
      const endpoint = '/players';

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API call failed ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Player created successfully:', data);

      setName('');
      setTeamId('');
      setBreed('');
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Player</h2>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor='TeamId'>Team Id:</label>
      <input
        type='text'
        id='TeamId'
        value={TeamId}
        onChange={(e) => setTeamId(e.target.value)}
      />
      <label htmlFor='breed'>Breed:</label>
      <input
        type='text'
        id='breed'
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />
      <button type='submit'>Create Player</button>
    </form>
  );
}

export default NewPlayerForm;
