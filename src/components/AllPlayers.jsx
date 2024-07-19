import React, { useState, useEffect } from 'react';
import fetchAllPlayers from '../API/ajaxHelpers';

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedPlayers = await fetchAllPlayers();
        setPlayers(fetchedPlayers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading players...</p>}
      {error && <p>Error fetching players: {error.message}</p>}
      {players.length > 0 && (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              <h2>{player.name}</h2>
              <p>Breed: {player.breed}</p>
              <p>Status: {player.status}</p>
              <img src={player.imageUrl} alt={player.name} />
            </li>
          ))}
        </ul>
      )}
      {players.length === 0 && !isLoading && !error && <p>No players found.</p>}
    </div>
  );
}
export default AllPlayers;
