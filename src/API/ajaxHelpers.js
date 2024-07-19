async function fetchAllPlayers() {
  const baseUrl = 'https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT';
  const endpoint = '/players';

  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API call failed ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
}

export default fetchAllPlayers;
