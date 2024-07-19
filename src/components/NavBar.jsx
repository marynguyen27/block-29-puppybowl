import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <h2>Puppy Bowl</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/players'>All Players</Link>
        </li>
        <li>
          <Link to='/new-player'>Add New Player</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
