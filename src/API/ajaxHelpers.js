async function fetchAllPlayers() {
  const baseUrl = 'https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT';
  const endpoint = '/players';

  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API call failed ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
}

async function fetchPlayerById(id) {
  const baseUrl = 'https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT';
  const endpoint = `/players/${id}`;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API call failed ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching player by ID:', error);
    throw error;
  }
}

async function deletePlayer(id) {
  const baseUrl = 'https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT';
  const endpoint = `/players/${id}`;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API call failed ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
}

export default { fetchAllPlayers, fetchPlayerById, deletePlayer };
