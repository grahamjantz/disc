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
    <div className="w-full mb-4 flex flex-col items-center">
        <h2 className="text-lg mb-2">Players:</h2>
        <div className='w-full flex items-center py-4'>
            <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter player name"
                className="border-blue-500 border-l border-t border-b p-2 px-6 w-full rounded-l-3xl rounded-r-none bg-[#242424] text-gray-200"  
            />
            <button 
                onClick={handleAddPlayer}
                className="bg-blue-500 text-white p-2 px-6 h-full border-t border-r border-b rounded-r-3xl rounded-l-none"
            >
                Add 
            </button>
        </div>
        </div>

  );
};

export default PlayerInput;
