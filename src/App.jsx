import React, { useState, useEffect, useRef } from 'react';
import PlayerInput from './PlayerInput'; // Import the PlayerInput component
import { FaCheck } from "react-icons/fa";
import { GiFrisbee } from "react-icons/gi";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState(Array(18).fill([]));
  const [par, setPar] = useState(Array(18).fill(3));
  const [editingPar, setEditingPar] = useState(null);
  const [editingScore, setEditingScore] = useState({ hole: null, player: null, value: '' });
  const [toggleResetModal, setToggleResetModal] = useState(false);

  // Create refs for score inputs
  const scoreInputRefs = useRef({});
  const parInputRefs = useRef({});

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const savedScores = JSON.parse(localStorage.getItem('scores')) || Array(18).fill(Array(savedPlayers.length).fill(0));
    const savedPar = JSON.parse(localStorage.getItem('par')) || Array(18).fill(3);

    setPlayers(savedPlayers);

    const updatedScores = savedScores.map((holeScores) =>
      holeScores.length === savedPlayers.length ? holeScores : Array(savedPlayers.length).fill(0)
    );
    setScores(updatedScores);
    setPar(savedPar);
  }, []);

  useEffect(() => {
    if (editingScore.hole !== null && editingScore.player !== null) {
      const key = `${editingScore.hole}-${editingScore.player}`;
      if (scoreInputRefs.current[key]) {
        scoreInputRefs.current[key].focus();
      }
    }
  }, [editingScore]);

  const handleAddPlayer = (playerName) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers, playerName];
      setScores(prevScores => prevScores.map(holeScores => [...holeScores, 0])); // Append score of 0 for the new player
      localStorage.setItem('players', JSON.stringify(newPlayers)); // Update localStorage
      localStorage.setItem('scores', JSON.stringify(scores.map(holeScores => [...holeScores, 0]))); // Update scores for new player
      return newPlayers;
    });
  };

  const handleScoreChange = (hole, playerIndex, value) => {
    setEditingScore(prev => ({ ...prev, value }));
  };

  const saveScore = (hole, playerIndex) => {
    const updatedScores = [...scores];
    updatedScores[hole][playerIndex] = Number(editingScore.value);
    setScores(updatedScores);
    setEditingScore({ hole: null, player: null, value: '' });
    localStorage.setItem('scores', JSON.stringify(updatedScores)); // Update localStorage after saving score
  };

  const handleParChange = (hole, value) => {
    const updatedPar = [...par];
    updatedPar[hole] = Number(value);
    setPar(updatedPar);
    localStorage.setItem('par', JSON.stringify(updatedPar)); // Update localStorage after changing par
  };

  // const toggleEditingPar = (holeIndex) => {
  //   setEditingPar(editingPar === holeIndex ? null : holeIndex);
  // };

  const toggleEditingPar = (holeIndex) => {
    setEditingPar(editingPar === holeIndex ? null : holeIndex);
  
    if (editingPar !== holeIndex) {
      // Focus the input field when editing starts
      setTimeout(() => {
        const input = parInputRefs.current[holeIndex];
        if (input) {
          input.focus();
          input.select(); // Optionally select the input content
        }
      }, 0);
    }
  };
  

  const handleParKeyDown = (e, holeIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      savePar(holeIndex);
    }
  };

  const savePar = (holeIndex) => {
    const value = parInputRefs.current[holeIndex].value;
    handleParChange(holeIndex, value);
    setEditingPar(null);
  };

  const toggleEditingScore = (holeIndex, playerIndex, currentScore) => {
    setEditingScore(editingScore.hole === holeIndex && editingScore.player === playerIndex
      ? { hole: null, player: null, value: '' }
      : { hole: holeIndex, player: playerIndex, value: currentScore }
    );
  
    if (editingScore.hole === holeIndex && editingScore.player === playerIndex) {
      // Ensure the text is selected when the input field is focused
      setTimeout(() => {
        const key = `${holeIndex}-${playerIndex}`;
        const input = scoreInputRefs.current[key];
        if (input) {
          input.focus();
          input.select(); // Select the input content
        }
      }, 0);
    }
  };
  

  // const toggleEditingScore = (holeIndex, playerIndex, currentScore) => {
  //   setEditingScore(editingScore.hole === holeIndex && editingScore.player === playerIndex
  //     ? { hole: null, player: null, value: '' }
  //     : { hole: holeIndex, player: playerIndex, value: currentScore }
  //   );
  // };

  const handleReset = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('scores');
    localStorage.removeItem('par');
    setPlayers([]);
    setScores(Array(18).fill(Array(0).fill(0)));
    setPar(Array(18).fill(3));
  };

  // Submit score when Enter is pressed
  const handleKeyDown = (e, hole, playerIndex) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      e.preventDefault();
      saveScore(hole, playerIndex);
    }
  };
  

  return (
    <div className="container p-4 py-24 w-screen max-w-screen overflow-hidden flex flex-col items-center">
      <header className='w-full fixed top-0 flex items-center justify-center gap-4 mb-8 bg-white'>
        <GiFrisbee
          size={50}
          className='text-blue-500'
        />
        <h1 className="text-4xl font-bold text-blue-500">DiscScore</h1>
      </header>

      <PlayerInput onAddPlayer={handleAddPlayer} />

      <div className='w-screen max-w-full overflow-x-scroll'>
        <table className="table-auto w-full text-center border">
          <thead>
            <tr>
              <th className="border p-2 min-w-20 bg-blue-500">Hole</th>
              {players.map((player, index) => (
                <th key={index} className="border p-1 min-w-20 max-w-20 overflow-hidden bg-blue-500">
                  {player.length > 8 ? `${player.slice(0, 8)}...` : player}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((holeScores, holeIndex) => (
              <React.Fragment key={holeIndex}>
                <tr className='border-b'>
                  <td
                    className="p-1 text-center cursor-pointer min-w-20 flex items-center bg-blue-500 justify-around gap-1"
                    onClick={() => toggleEditingPar(holeIndex)}
                  >
                    <p className='font-bold text-xl flex items-center bg-gray-200 text-[#242424] justify-center border rounded-full aspect-ratio aspect-ratio-1/1 w-8 h-8 p-1'>{holeIndex + 1}</p>
                    {editingPar === holeIndex ? (
                      <div className='flex justify-center items-center'>
                        <input
                          ref={el => parInputRefs.current[holeIndex] = el}
                          value={par[holeIndex]}
                          onChange={(e) => handleParChange(holeIndex, e.target.value)}
                          onKeyDown={(e) => handleParKeyDown(e, holeIndex)} // Handle Enter key press
                          className="w-8 text-center border rounded bg-[#242424] text-gray-200"
                          onClick={(e) => e.stopPropagation()}
                          inputMode="numeric"
                        />
                        <FaCheck
                          className="bg-green-500 text-white p-1 ml-4 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            savePar(holeIndex);
                          }}
                          size={20}
                        />
                      </div>
                    ) : (
                      <p className='flex items-center h-full'>P: {par[holeIndex]}</p>
                    )}
                  </td>
                  {holeScores.map((score, playerIndex) => (
                    <td
                      key={playerIndex}
                      className="border p-2 text-center cursor-pointer"
                      onClick={() => toggleEditingScore(holeIndex, playerIndex, score)}
                    >
                      {editingScore.hole === holeIndex && editingScore.player === playerIndex ? (
                        <div className='flex justify-center items-center'>
                          {/* <input
                            ref={el => scoreInputRefs.current[`${holeIndex}-${playerIndex}`] = el}
                            value={editingScore.value}
                            onChange={(e) => handleScoreChange(holeIndex, playerIndex, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, holeIndex, playerIndex)} // Handle Enter key press
                            className="w-12 text-center border rounded"
                            onClick={(e) => e.stopPropagation()}
                            inputMode="numeric"
                          /> */}
                          <input
                            ref={el => scoreInputRefs.current[`${holeIndex}-${playerIndex}`] = el}
                            value={editingScore.value}
                            onChange={(e) => handleScoreChange(holeIndex, playerIndex, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, holeIndex, playerIndex)} // Handle Enter key press
                            onBlur={(e) => handleKeyDown(e, holeIndex, playerIndex)} // Handle Enter key press
                            className="w-12 text-center border rounded bg-[#242424] text-gray-200"
                            onClick={(e) => e.stopPropagation()}
                            inputMode="numeric"
                          />
                          <FaCheck
                            className="bg-green-500 text-white p-1 ml-4 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              saveScore(holeIndex, playerIndex);
                            }}
                            size={20}
                          />
                        </div>
                      ) : (
                        <p>{score === 0 ? '-' : score}</p>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Front Nine Total Row */}
                {holeIndex === 8 && (
                  <tr className='bg-blue-500'>
                    <td className="border p-2 font-bold">Front Score:</td>
                    {players.map((_, playerIndex) => (
                      <td key={playerIndex} className="border p-2">
                        {scores.slice(0, 9).reduce((acc, holeScores) => acc + holeScores[playerIndex], 0)}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Back Nine Total Row */}
                {holeIndex === 17 && (
                  <tr className='bg-blue-500'>
                    <td className="border p-2 font-bold">Back Score:</td>
                    {players.map((_, playerIndex) => (
                      <td key={playerIndex} className="border p-2">
                        {scores.slice(9).reduce((acc, holeScores) => acc + holeScores[playerIndex], 0)}
                      </td>
                    ))}
                  </tr>
                )}
                {holeIndex === 17 && (
                  <tr className='bg-blue-500'>
                    <td className="border p-2 font-bold">{par.reduce((acc, p) => acc + p, 0)}</td> 
                    {players.map((_, playerIndex) => (
                      <td key={playerIndex} className="border p-2">
                        {scores.reduce((acc, holeScores) => acc + holeScores[playerIndex], 0)}
                      </td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setToggleResetModal(true)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>

      {toggleResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded">
            <p className="text-lg">Are you sure you want to reset all data?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  handleReset();
                  setToggleResetModal(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setToggleResetModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;


// import React from 'react';
// import PlayerInput from './PlayerInput';
// import { FaCheck } from 'react-icons/fa';
// import { GiFrisbee } from 'react-icons/gi';
// import useDiscGolfState from './useDiscGolfState';
// import Table from './Table'; // New Table component

// const App = () => {
//   const {
//     players,
//     scores,
//     par,
//     editingPar,
//     editingScore,
//     toggleResetModal,
//     scoreInputRefs,
//     parInputRefs,
//     setPlayers,
//     setScores,
//     setPar,
//     setEditingPar,
//     setEditingScore,
//     setToggleResetModal,
//     handleAddPlayer,
//     handleScoreChange,
//     saveScore,
//     handleParChange,
//     toggleEditingPar,
//     handleParKeyDown,
//     savePar,
//     toggleEditingScore,
//     handleReset
//   } = useDiscGolfState();

//   return (
//     <div className="container p-4 py-24 w-screen max-w-screen overflow-hidden flex flex-col items-center">
//       <header className='w-full fixed top-0 flex items-center justify-center gap-4 mb-8 bg-white'>
//         <GiFrisbee size={50} className='text-blue-500' />
//         <h1 className="text-4xl font-bold text-blue-500">DiscScore</h1>
//       </header>

//       <PlayerInput onAddPlayer={handleAddPlayer} />

//       <div className='w-screen max-w-full overflow-x-scroll'>
//         <Table
//           players={players}
//           scores={scores}
//           par={par}
//           editingPar={editingPar}
//           editingScore={editingScore}
//           scoreInputRefs={scoreInputRefs}
//           parInputRefs={parInputRefs}
//           toggleEditingPar={toggleEditingPar}
//           handleParChange={handleParChange}
//           handleParKeyDown={handleParKeyDown}
//           savePar={savePar}
//           toggleEditingScore={toggleEditingScore}
//           handleScoreChange={handleScoreChange}
//           saveScore={saveScore}
//         />
//       </div>

//       <button
//         onClick={() => setToggleResetModal(true)}
//         className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Reset
//       </button>

//       {toggleResetModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//           <div className="bg-white p-4 rounded">
//             <p className="text-lg">Are you sure you want to reset all data?</p>
//             <div className="flex gap-4 mt-4">
//               <button
//                 onClick={() => {
//                   handleReset();
//                   setToggleResetModal(false);
//                 }}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setToggleResetModal(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
