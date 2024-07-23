import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import AllPlayers from './components/AllPlayers.jsx';
import NewPlayerForm from './components/NewPlayerForm.jsx';
import SinglePlayer from './components/SinglePlayer.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<AllPlayers />} />
          <Route path='/players' element={<AllPlayers />} />
          <Route path='/players/:id' element={<SinglePlayer />} />
          <Route path='/new-player' element={<NewPlayerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
