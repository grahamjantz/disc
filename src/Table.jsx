import React from 'react';

const Table = ({
  players,
  scores,
  par,
  editingPar,
  editingScore,
  scoreInputRefs,
  parInputRefs,
  toggleEditingPar,
  handleParChange,
  handleParKeyDown,
  savePar,
  toggleEditingScore,
  handleScoreChange,
  saveScore
}) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2 bg-gray-200">Hole</th>
          {players.map((player, i) => (
            <th key={i} className="border border-gray-300 p-2 bg-gray-200">{player}</th>
          ))}
          <th className="border border-gray-300 p-2 bg-gray-200">Par</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 18 }).map((_, holeIndex) => (
          <tr key={holeIndex}>
            <td
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => toggleEditingPar(holeIndex)}
            >
              {editingPar === holeIndex ? (
                <input
                  ref={(el) => (parInputRefs.current[holeIndex] = el)}
                  type="number"
                  defaultValue={par[holeIndex]}
                  onBlur={() => savePar(holeIndex)}
                  onKeyDown={(e) => handleParKeyDown(e, holeIndex)}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              ) : (
                <span>{par[holeIndex]}</span>
              )}
            </td>
            {players.map((_, playerIndex) => (
              <td key={playerIndex} className="border border-gray-300 p-2 cursor-pointer">
                {editingScore.hole === holeIndex && editingScore.player === playerIndex ? (
                  <input
                    ref={(el) => (scoreInputRefs.current[`${holeIndex}-${playerIndex}`] = el)}
                    type="number"
                    value={editingScore.value}
                    onChange={(e) => handleScoreChange(holeIndex, playerIndex, e.target.value)}
                    onBlur={() => saveScore(holeIndex, playerIndex)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  <span
                    onClick={() => toggleEditingScore(holeIndex, playerIndex, scores[holeIndex][playerIndex])}
                  >
                    {scores[holeIndex][playerIndex] || 0}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
