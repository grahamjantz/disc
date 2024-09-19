// import React, { useState, useEffect } from 'react';
// import PlayerInput from './PlayerInput'; // Import the PlayerInput component
// import { FaCheck } from "react-icons/fa";

// const App = () => {
//   const [players, setPlayers] = useState([]);
//   const [scores, setScores] = useState(Array(18).fill([]));
//   const [par, setPar] = useState(Array(18).fill(3));
//   const [editingPar, setEditingPar] = useState(null); 
//   const [editingScore, setEditingScore] = useState({ hole: null, player: null, value: '' });

//   useEffect(() => {
//     const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
//     const savedScores = JSON.parse(localStorage.getItem('scores')) || Array(18).fill(Array(savedPlayers.length).fill(0));
//     const savedPar = JSON.parse(localStorage.getItem('par')) || Array(18).fill(3);

//     setPlayers(savedPlayers);
    
//     const updatedScores = savedScores.map((holeScores) => 
//       holeScores.length === savedPlayers.length ? holeScores : Array(savedPlayers.length).fill(0)
//     );
//     setScores(updatedScores);
//     setPar(savedPar);
//   }, []);

//   const handleAddPlayer = (playerName) => {
//     setPlayers(prevPlayers => {
//       const newPlayers = [...prevPlayers, playerName];
//       const newScores = scores.map(holeScores => [...holeScores, 0]); // Append score of 0 for the new player
//       setScores(newScores);
//       localStorage.setItem('players', JSON.stringify(newPlayers)); // Update localStorage
//       localStorage.setItem('scores', JSON.stringify(newScores)); // Update scores for new player
//       return newPlayers;
//     });
//   };

//   const handleScoreChange = (hole, playerIndex, value) => {
//     setEditingScore(prev => ({ ...prev, value }));
//   };

//   const saveScore = (hole, playerIndex) => {
//     const updatedScores = [...scores];
//     updatedScores[hole][playerIndex] = Number(editingScore.value);
//     setScores(updatedScores);
//     setEditingScore({ hole: null, player: null, value: '' });
//     localStorage.setItem('scores', JSON.stringify(updatedScores)); // Update localStorage after saving score
//   };

//   const handleParChange = (hole, value) => {
//     const updatedPar = [...par];
//     updatedPar[hole] = Number(value);
//     setPar(updatedPar);
//     localStorage.setItem('par', JSON.stringify(updatedPar)); // Update localStorage after changing par
//   };

//   const toggleEditingPar = (holeIndex) => {
//     setEditingPar(editingPar === holeIndex ? null : holeIndex);
//   };

//   const toggleEditingScore = (holeIndex, playerIndex, currentScore) => {
//     setEditingScore(editingScore.hole === holeIndex && editingScore.player === playerIndex
//       ? { hole: null, player: null, value: '' }
//       : { hole: holeIndex, player: playerIndex, value: currentScore }
//     );
//   };

//   const handleReset = () => {
//     localStorage.removeItem('players');
//     localStorage.removeItem('scores');
//     localStorage.removeItem('par');
//     setPlayers([]);
//     setScores(Array(18).fill(Array(0).fill(0)));
//     setPar(Array(18).fill(3));
//   };

//   // Calculate total scores and under par for each player
//   const calculateTotalScores = () => {
//     return players.map((_, playerIndex) => {
//       const totalStrokes = scores.reduce((total, holeScores) => total + (holeScores[playerIndex] || 0), 0);
//       const totalPar = par.reduce((total, p) => total + p, 0);
//       return { totalStrokes, underPar: totalStrokes - totalPar };
//     });
//   };

//   const totalScores = calculateTotalScores();

//   return (
//     // <div className="container mx-auto p-4 w-full">
//     //   <h1 className="text-xl font-bold mb-4">Disc Golf Scorecard</h1>
      
//     //   <PlayerInput onAddPlayer={handleAddPlayer} />

//     //   <table className="table-auto w-full text-center border">
//     //     <thead>
//     //       <tr>
//     //         <th className="border p-2">Hole</th>
//     //         {players.map((player, index) => (
//     //           <th key={index} className="border p-2">{player}</th>
//     //         ))}
//     //       </tr>
//     //     </thead>
//     //     <tbody>
//     //       {scores.map((holeScores, holeIndex) => (
//     //         <tr key={holeIndex}>
//     //           <td 
//     //             className="border p-2 text-center cursor-pointer"
//     //             onClick={() => toggleEditingPar(holeIndex)}
//     //           >
//     //             <p>{holeIndex + 1}</p>
//     //             {editingPar === holeIndex ? (
//     //               <div className='flex justify-center items-center'>
//     //                 <input
//     //                   type="number"
//     //                   value={par[holeIndex]}
//     //                   onChange={(e) => handleParChange(holeIndex, e.target.value)}
//     //                   className="w-8 text-center border rounded"
//     //                   onClick={(e) => e.stopPropagation()}
//     //                 />
//     //                 <FaCheck 
//     //                   className="bg-green-500 text-white p-1 ml-4 rounded"
//     //                   onClick={(e) => {
//     //                     e.stopPropagation();  
//     //                     setEditingPar(null);
//     //                   }}
//     //                   size={20}
//     //                 />
//     //               </div>
//     //             ) : (
//     //               <p>Par: {par[holeIndex]}</p>
//     //             )}
//     //           </td>
//     //           {holeScores.map((score, playerIndex) => {
//     //             const strokesTaken = score === 0 ? '-' : `${score} | ${score - par[holeIndex]}`;
//     //             return (
//     //               <td 
//     //                 key={playerIndex} 
//     //                 className="border p-2 text-center cursor-pointer"
//     //                 onClick={() => toggleEditingScore(holeIndex, playerIndex, score)}
//     //               >
//     //                 {editingScore.hole === holeIndex && editingScore.player === playerIndex ? (
//     //                   <div className='flex justify-center items-center'>
//     //                     <input
//     //                       value={editingScore.value}
//     //                       onChange={(e) => handleScoreChange(holeIndex, playerIndex, e.target.value)}
//     //                       className="w-12 text-center border rounded"
//     //                       onClick={(e) => e.stopPropagation()}
//     //                     />
//     //                     <FaCheck 
//     //                       className="bg-green-500 text-white p-1 ml-4 rounded"
//     //                       onClick={(e) => {
//     //                         e.stopPropagation();  
//     //                         saveScore(holeIndex, playerIndex);
//     //                       }}
//     //                       size={20}
//     //                     />
//     //                   </div>
//     //                 ) : (
//     //                   <p>{strokesTaken}</p>
//     //                 )}
//     //               </td>
//     //             );
//     //           })}
//     //         </tr>
//     //       ))}
//     //       <tr>
//     //         <td className="border p-2 font-bold">Total</td>
//     //         {totalScores.map((score, index) => (
//     //           <td key={index} className="border p-2 text-center">
//     //             {`${score.totalStrokes} | ${score.underPar}`}
//     //           </td>
//     //         ))}
//     //       </tr>
//     //     </tbody>
//     //   </table>

//     //   <button 
//     //     className="bg-red-500 text-white p-2 mt-4"
//     //     onClick={handleReset}
//     //   >
//     //     Reset
//     //   </button>
//     // </div>

//       <div className="container mx-auto p-4 w-full">
//         <h1 className="text-xl font-bold mb-4">Disc Golf Scorecard</h1>
        
//         <PlayerInput onAddPlayer={handleAddPlayer} />
    
//         <table className="table-auto w-full text-center border">
//           <thead>
//             <tr>
//               <th className="border p-2">Hole</th>
//               {players.map((player, index) => (
//                 <th key={index} className="border p-2">{player}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {scores.map((holeScores, holeIndex) => (
//               <tr key={holeIndex}>
//                 <td 
//                   className="border p-2 text-center cursor-pointer"
//                   onClick={() => toggleEditingPar(holeIndex)}
//                 >
//                   <p>{holeIndex + 1}</p>
//                   {editingPar === holeIndex ? (
//                     <div className='flex justify-center items-center'>
//                       <input
//                         type="number"
//                         value={par[holeIndex]}
//                         onChange={(e) => handleParChange(holeIndex, e.target.value)}
//                         className="w-8 text-center border rounded"
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                       <FaCheck 
//                         className="bg-green-500 text-white p-1 ml-4 rounded"
//                         onClick={(e) => {
//                           e.stopPropagation();  
//                           setEditingPar(null);
//                         }}
//                         size={20}
//                       />
//                     </div>
//                   ) : (
//                     <p>Par: {par[holeIndex]}</p>
//                   )}
//                 </td>
//                 {holeScores.map((score, playerIndex) => (
//                   <td 
//                     key={playerIndex} 
//                     className="border p-2 text-center cursor-pointer"
//                     onClick={() => toggleEditingScore(holeIndex, playerIndex, score)}
//                   >
//                     {editingScore.hole === holeIndex && editingScore.player === playerIndex ? (
//                       <div className='flex justify-center items-center'>
//                         <input
//                           value={editingScore.value}
//                           onChange={(e) => handleScoreChange(holeIndex, playerIndex, e.target.value)}
//                           className="w-12 text-center border rounded"
//                           onClick={(e) => e.stopPropagation()}
//                         />
//                         <FaCheck 
//                           className="bg-green-500 text-white p-1 ml-4 rounded"
//                           onClick={(e) => {
//                             e.stopPropagation();  
//                             saveScore(holeIndex, playerIndex);
//                           }}
//                           size={20}
//                         />
//                       </div>
//                     ) : (
//                       <p>{score === 0 ? '-' : `${score} | ${score - par[holeIndex]}`}</p>
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             <tr>
//               <td className="border p-2 font-bold">{par.reduce((sum, p) => sum + p, 0)}</td> {/* Total Par for the course */}
//               {players.map((_, playerIndex) => {
//                 const totalScore = scores.reduce((sum, holeScores) => sum + (holeScores[playerIndex] || 0), 0);
//                 return (
//                   <td key={playerIndex} className="border p-2 font-bold">
//                     {totalScore} | {totalScore - par.reduce((sum, p) => sum + p, 0)}
//                   </td>
//                 );
//               })}
//             </tr>

//           </tbody>
//         </table>
    
//         <button 
//           className="bg-red-500 text-white p-2 mt-4"
//           onClick={handleReset}
//         >
//           Reset
//         </button>
//       </div>
    
    
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import PlayerInput from './PlayerInput'; // Import the PlayerInput component
import { FaCheck } from "react-icons/fa";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState(Array(18).fill([]));
  const [par, setPar] = useState(Array(18).fill(3));
  const [editingPar, setEditingPar] = useState(null);
  const [editingScore, setEditingScore] = useState({ hole: null, player: null, value: '' });
  const [toggleResetModal, setToggleResetModal] = useState(false)

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

  const toggleEditingPar = (holeIndex) => {
    setEditingPar(editingPar === holeIndex ? null : holeIndex);
  };

  const toggleEditingScore = (holeIndex, playerIndex, currentScore) => {
    setEditingScore(editingScore.hole === holeIndex && editingScore.player === playerIndex
      ? { hole: null, player: null, value: '' }
      : { hole: holeIndex, player: playerIndex, value: currentScore }
    );
  };

  const handleReset = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('scores');
    localStorage.removeItem('par');
    setPlayers([]);
    setScores(Array(18).fill(Array(0).fill(0)));
    setPar(Array(18).fill(3));
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-xl font-bold mb-4">Disc Golf Scorecard</h1>

      <PlayerInput onAddPlayer={handleAddPlayer} />

      <table className="table-auto w-full text-center border">
        <thead>
          <tr>
            <th className="border p-2">Hole</th>
            {players.map((player, index) => (
              <th key={index} className="border p-2">{player}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scores.map((holeScores, holeIndex) => (
            <tr key={holeIndex}>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => toggleEditingPar(holeIndex)}
              >
                <p>{holeIndex + 1}</p>
                {editingPar === holeIndex ? (
                  <div className='flex justify-center items-center'>
                    <input
                      type="number"
                      value={par[holeIndex]}
                      onChange={(e) => handleParChange(holeIndex, e.target.value)}
                      className="w-8 text-center border rounded"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <FaCheck
                      className="bg-green-500 text-white p-1 ml-4 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPar(null);
                      }}
                      size={20}
                    />
                  </div>
                ) : (
                  <p>Par: {par[holeIndex]}</p>
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
                      <input
                        value={editingScore.value}
                        onChange={(e) => handleScoreChange(holeIndex, playerIndex, e.target.value)}
                        className="w-12 text-center border rounded"
                        onClick={(e) => e.stopPropagation()}
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
          ))}
          <tr>
            <td className="border p-2 font-bold">
              {par.reduce((sum, p) => sum + p, 0)} {/* Total Par for the course */}
            </td>
            {players.map((_, playerIndex) => {
              const totalScore = scores.reduce((sum, holeScores) => sum + (holeScores[playerIndex] || 0), 0);
              return (
                <td key={playerIndex} className="border p-2 font-bold">
                  {totalScore} | {totalScore - par.reduce((sum, p) => sum + p, 0)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

      <button
        className="bg-red-500 text-white p-2 mt-4"
        onClick={() => {
          setToggleResetModal(true)
        }}
      >
        Reset
      </button>
      {toggleResetModal ? (
        <div className='w-screen h-screen fixed bg-gray-400 bg-opacity-50 bottom-0 left-0 flex flex-col items-center p-4 gap-4'>
          <div className='flex flex-col items-center opacity-100 gap-4 bg-black p-8 rounded w-full mt-36'>
            <p>Are you sure?</p>
            <button 
              onClick={() => setToggleResetModal(false)}
              className='w-1/2 bg-green-700'
            >No, go back</button>
            <button 
              onClick={() => {
                handleReset()
                setToggleResetModal(false)
              }}
              className='w-1/2 bg-red-700'
            >Yes, reset</button>
          </div>
        </div>
      ) : ''}
    </div>
  );
};

export default App;
