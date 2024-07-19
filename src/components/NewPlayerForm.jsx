import React, { useState } from 'react';

function NewPlayerForm() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [team, setTeam] = useState(''); // Add more state variables for other player details

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const newPlayer = {
        name,
        position,
        team, // Add other player data properties
      };

      const baseUrl =
        'https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT'; // Replace with your API endpoint
      const endpoint = '/players';

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        throw new Error(`API call failed ${response.status}`);
      }

      const data = await response.json();
      console.log('Player created successfully:', data);

      // Handle successful creation (e.g., clear form, redirect)
      setName('');
      setPosition('');
      setTeam(''); // Clear form fields after successful submission
    } catch (error) {
      console.error('Error creating player:', error);

      // Handle API errors (e.g., display error message to user)
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
      <label htmlFor='position'>Position:</label>
      <input
        type='text'
        id='position'
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <label htmlFor='team'>Team:</label>
      <input
        type='text'
        id='team'
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      {/* Add more input fields for other player details */}
      <button type='submit'>Create Player</button>
    </form>
  );
}

export default NewPlayerForm;
