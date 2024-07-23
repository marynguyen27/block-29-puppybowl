import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ajaxHelpers from '../API/ajaxHelpers';
import '../App.css';

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedPlayers = await ajaxHelpers.fetchAllPlayers();
        console.log('Fetched players:', fetchedPlayers);
        setPlayers(fetchedPlayers.data.players || []);
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = players.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(results);
  }, [searchTerm, players]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='all-players-container'>
      {isLoading && <p>Loading players...</p>}
      {error && <p>Error fetching players: {error.message}</p>}
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search players...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {filteredPlayers.length > 0 ? (
        <div className='players-list'>
          {filteredPlayers.map((player) => (
            <div className='player-card' key={player.id}>
              <h2>{player.name}</h2>
              <p>Breed: {player.breed}</p>
              <p>teamId: {player.teamId || 'Not Available'}</p>
              <img src={player.imageUrl} alt={player.name} />
              <Link to={`/players/${player.id}`}>
                <button>See Details</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className='no-players-message'>No players found.</p>
      )}
    </div>
  );
}
export default AllPlayers;
