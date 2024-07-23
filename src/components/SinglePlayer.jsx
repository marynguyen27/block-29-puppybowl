import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ajaxHelpers from '../API/ajaxHelpers';

function SinglePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      const baseUrl =
        'https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT'; // Replace with your API endpoint
      const endpoint = `/players/${id}`;

      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`API call failed ${response.status}`);
        }

        console.log('Player deleted successfully');

        navigate('/');
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedPlayer = await ajaxHelpers.fetchPlayerById(id);
        console.log('Fetched player:', fetchedPlayer);
        setPlayer(fetchedPlayer.data.player || {});
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <p>Loading player details...</p>;
  if (error) return <p>Error fetching player details: {error.message}</p>;
  if (!player) return <p>No player found.</p>;

  return (
    <div>
      {isLoading && <p>Loading player details...</p>}
      {error && <p>Error fetching player details: {error.message}</p>}
      {player ? (
        <div>
          <h1>{player.name}</h1>
          <p>Breed: {player.breed || 'Not Available'}</p>
          <p>Team ID: {player.teamId || 'Not Available'}</p>
          <img src={player.imageUrl} alt={player.name} />
          <button onClick={handleDelete}>Delete Player</button>
        </div>
      ) : (
        <p>No player found.</p>
      )}
    </div>
  );
}

export default SinglePlayer;
