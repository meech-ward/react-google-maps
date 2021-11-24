import { useState, useEffect } from 'react'

import './App.css';

import Map from './Map'

const bcit = {
  latitude: 49.28357705407476,
  longitude: -123.11524407215198
}

function App() {
  const [destination, setDestination] = useState(null)

  function updateDesition() {
    setDestination(bcit)
  }

  return (
    <div className="App">
      <button onClick={updateDesition}>Go!</button>
      <Map destination={destination}></Map>
    </div>
  )
}

export default App;
