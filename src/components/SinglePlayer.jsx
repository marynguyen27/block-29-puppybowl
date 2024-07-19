import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SinglePlayer() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();

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

        // Handle successful deletion (e.g., navigate back to all players)
        navigate('/');
      } catch (error) {
        console.error('Error deleting player:', error);

        // Handle API errors (e.g., display error message to user)
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlayerById(id);
        setPlayer(data);
      } catch (error) {
        console.error('Error fetching player:', error);
      }
    };

    fetchData();
  }, [id]); // Dependency array includes `id` to refetch on ID change

  // ... your logic to conditionally render player details or loading message

  return (
    <div>
      <h2>Player Details</h2>
      {player ? (
        <>
          {/* Render player information using player object */}
          <button onClick={handleDelete}>Delete Player</button>
        </>
      ) : (
        <p>Loading player details...</p>
      )}
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default SinglePlayer;
