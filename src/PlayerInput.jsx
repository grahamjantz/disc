import React, { useState } from 'react';

const PlayerInput = ({ onAddPlayer }) => {
  const [playerName, setPlayerName] = useState("");

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      onAddPlayer(playerName.trim());
      setPlayerName("");  // Clear input after adding player
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center">
        <h2 className="text-lg mb-2">Enter Player Name</h2>
        <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="border p-2 mb-2 w-full"  
        />
        <button 
            onClick={handleAddPlayer}
            className="bg-blue-500 text-white p-2"
        >
            Add Player
        </button>
        </div>

  );
};

export default PlayerInput;
