import React, { useRef, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const PlayerScores = ({
    players,
    scores,
    par,
    handleParChange,
    handleScoreChange,
    savePar,
    saveScore,
    handleKeyDown,
    editingPar,
    editingScore,
    setEditingScore,
    setEditingPar,
    setPlayers,
}) => {
    const parInputRefs = useRef([]);
    const scoreInputRefs = useRef({});
    const playerInputRefs = useRef([]); // Ref for player name inputs
    const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);
    const [editedPlayerName, setEditedPlayerName] = useState('');

    // Focus par input when editingPar changes
    useEffect(() => {
        if (editingPar !== null && parInputRefs.current[editingPar]) {
            parInputRefs.current[editingPar].focus();
        }
    }, [editingPar]);

    // Focus score input when editingScore changes
    useEffect(() => {
        const { hole, player } = editingScore;
        if (hole !== null && player !== null) {
            const inputRef = scoreInputRefs.current[`${hole}-${player}`];
            if (inputRef) {
                inputRef.focus();
            }
        }
    }, [editingScore]);

    // Focus player input when editingPlayerIndex changes
    useEffect(() => {
        if (editingPlayerIndex !== null && playerInputRefs.current[editingPlayerIndex]) {
            playerInputRefs.current[editingPlayerIndex].focus();
            playerInputRefs.current[editingPlayerIndex].select(); // Highlight the text
        }
    }, [editingPlayerIndex]);

    const toggleEditingPar = (holeIndex) => {
        setEditingPar(editingPar === holeIndex ? null : holeIndex);
    };

    const toggleEditingScore = (holeIndex, playerIndex, score) => {
        setEditingScore({
            hole: holeIndex,
            player: playerIndex,
            value: score === 0 ? '' : score,
        });
    };

    const handlePlayerNameClick = (index) => {
        setEditingPlayerIndex(index);
        setEditedPlayerName(players[index]);
    };

    const handlePlayerNameChange = (e) => {
        setEditedPlayerName(e.target.value);
    };

    const handlePlayerNameKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            const updatedPlayers = [...players];
            updatedPlayers[index] = editedPlayerName;
            // Update localStorage
            localStorage.setItem('players', JSON.stringify(updatedPlayers));

            setPlayers(updatedPlayers);
            setEditingPlayerIndex(null);
        }
    };
    

    return (
        <div className='w-screen max-w-full overflow-x-scroll'>
            <table className="table-auto w-full text-center border">
                <thead className=''>
                    <tr>
                        <th className="border p-2 max-w-20 w-20 bg-blue-500">Hole</th>
                        {players.map((player, index) => (
                            <th key={index} className="border p-1 w-30 min-w-30 max-w-30 overflow-hidden bg-blue-500">
                                {editingPlayerIndex === index ? (
                                    <input
                                        ref={(el) => (playerInputRefs.current[index] = el)} // Store ref for each player input
                                        value={editedPlayerName}
                                        onChange={handlePlayerNameChange}
                                        onKeyDown={(e) => handlePlayerNameKeyDown(e, index)}
                                        onBlur={() => setEditingPlayerIndex(null)} // Optional, to save on blur
                                        className="border p-1 rounded bg-[#242424] text-gray-200"
                                    />
                                ) : (
                                    <span
                                        onClick={() => handlePlayerNameClick(index)}
                                        className="cursor-pointer"
                                    >
                                        {player.length > 8 ? `${player.slice(0, 8)}...` : player}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {scores.map((holeScores, holeIndex) => (
                        <React.Fragment key={holeIndex}>
                            <tr className='border-b'>
                                <td
                                    className="p-1 text-center cursor-pointer max-w-20 w-20 flex items-center bg-blue-500 justify-around gap-1"
                                    onClick={() => toggleEditingPar(holeIndex)}
                                >
                                    <p className={`font-bold text-xl flex items-center bg-gray-200 text-[#242424] justify-center border rounded-full aspect-ratio aspect-ratio-1/1 w-8 h-8 p-1 ${editingPar === holeIndex ? 'bg-transparent rounded-none border-none' : ''}`}>
                                        {editingPar === holeIndex ? (
                                            <FaCheck
                                                className="bg-green-500 text-white flex justify-center rounded-full aspect-ratio aspect-ratio-1/1 w-8 h-8 p-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    savePar(holeIndex);
                                                }}
                                                size={20}
                                            />
                                        ) : holeIndex + 1}
                                    </p>
                                    {editingPar === holeIndex ? (
                                        <div className='flex justify-center items-center'>
                                            <input
                                                ref={el => parInputRefs.current[holeIndex] = el}
                                                value={par[holeIndex]}
                                                onChange={(e) => handleParChange(holeIndex, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e, holeIndex)} // Handle Enter key press
                                                onBlur={(e) => handleKeyDown(e, holeIndex)} // Handle Enter key press
                                                onFocus={(e) => e.target.select()} // Highlight text on focus
                                                className="w-1/2 text-center border-b-2 border-gray-800 focus:border-gray-400 bg-blue-500 text-gray-200 focus:outline-none transition duration-200 ease-in-out"
                                                onClick={(e) => e.stopPropagation()}
                                                inputMode="numeric"
                                            />
                                        </div>
                                    ) : (
                                        <p className='flex items-center h-full'>{par[holeIndex]}</p>
                                    )}
                                </td>
                                {holeScores.map((score, playerIndex) => {
                                    const scoreDiff = score - par[holeIndex];
                                    return (
                                        <td
                                            key={playerIndex}
                                            className="border p-2 text-center cursor-pointer"
                                            onClick={() => toggleEditingScore(holeIndex, playerIndex, score)}
                                        >
                                            {editingScore.hole === holeIndex && editingScore.player === playerIndex ? (
                                                <div className='flex justify-center items-center'>
                                                    <input
                                                        className="w-12 text-center border-b-2 border-gray-500 focus:border-blue-400 bg-[#242424] text-gray-200 focus:outline-none transition duration-200 ease-in-out"
                                                        ref={el => scoreInputRefs.current[`${holeIndex}-${playerIndex}`] = el}
                                                        value={editingScore.value}
                                                        onChange={(e) => handleScoreChange(holeIndex, playerIndex, e.target.value)}
                                                        onKeyDown={(e) => handleKeyDown(e, holeIndex, playerIndex)} // Handle Enter key press
                                                        onBlur={(e) => handleKeyDown(e, holeIndex, playerIndex)} // Handle Enter key press
                                                        onFocus={(e) => e.target.select()} // Highlight text on focus
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
                                                score === 0 ? <p>-</p> : <div className='w-full flex justify-around items-center'><p>{score}</p> | <p>{scoreDiff}</p></div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                            {/* Front Nine Total Row */}
                            {holeIndex === 8 && (
                                <tr className='bg-blue-500'>
                                    <td className="border font-bold max-w-20 w-20 ">Front:</td>
                                    {players.map((_, playerIndex) => {
                                        const frontScore = scores.slice(0, 9).reduce((acc, holeScores) => acc + holeScores[playerIndex], 0);
                                        const frontPar = par.slice(0, 9).reduce((acc, p) => acc + p, 0);
                                        const frontDiff = frontScore - frontPar;

                                        return (
                                            <td key={playerIndex} className="border py-3 px-2">
                                                <div className='w-full flex justify-center items-center gap-4'>
                                                    <p className='w-1/3'>{frontScore}</p>
                                                    <p className='w-1/3'>|</p>
                                                    <p className='w-1/3'>{frontDiff}</p>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            )}
                            {/* Back Nine Total Row */}
                            {holeIndex === scores.length - 1 && (
                                <>
                                    <tr className='bg-blue-500'>
                                        <td className="border font-bold max-w-20 w-20">Back:</td>
                                        {players.map((_, playerIndex) => {
                                            const backScore = scores.slice(9).reduce((acc, holeScores) => acc + holeScores[playerIndex], 0);
                                            const backPar = par.slice(9).reduce((acc, p) => acc + p, 0);
                                            const backDiff = backScore - backPar;

                                            return (
                                                <td key={playerIndex} className="border py-3 px-2">
                                                    <div className='w-full flex justify-center items-center gap-4'>
                                                        <p className='w-1/3'>{backScore}</p>
                                                        <p className='w-1/3'>|</p>
                                                        <p className='w-1/3'>{backDiff}</p>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {holeIndex === 17 && (
                                 <tr className='bg-blue-600'>
                                     <td className="border font-bold max-w-20 w-20">{par.reduce((acc, p) => acc + p, 0)}</td>
                                     {players.map((_, playerIndex) => {
                                         const totalScore = scores.reduce((acc, holeScores) => acc + holeScores[playerIndex], 0);
                                         const totalPar = par.reduce((acc, p) => acc + p, 0);
                                         const totalDiff = totalScore - totalPar;
                                         return (
                                             <td key={playerIndex} className="border py-3 px-2">
                                                <div className='w-full flex justify-center items-center gap-4'>
                                                    <p className='w-1/3'>{totalScore}</p>
                                                    <p className='w-1/3'>|</p>
                                                    <p className='w-1/3'>{totalDiff}</p>
                                                </div>
                                             </td>
                                         );
                                     })}
                                 </tr>
                             )}
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerScores;
