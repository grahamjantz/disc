import { useState, useEffect, useRef } from 'react';
import { initializeStateFromLocalStorage, updateLocalStorage, resetLocalStorage } from './utils';

const useDiscGolfState = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState(Array(18).fill([]));
  const [par, setPar] = useState(Array(18).fill(3));
  const [editingPar, setEditingPar] = useState(null);
  const [editingScore, setEditingScore] = useState({ hole: null, player: null, value: '' });
  const [toggleResetModal, setToggleResetModal] = useState(false);

  const scoreInputRefs = useRef({});
  const parInputRefs = useRef({});

  useEffect(() => {
    const { savedPlayers, savedScores, savedPar } = initializeStateFromLocalStorage();
    setPlayers(savedPlayers);
    setScores(savedScores);
    setPar(savedPar);
  }, []);

  const handleAddPlayer = (playerName) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers, playerName];
      const updatedScores = scores.map(holeScores => [...holeScores, 0]);
      setScores(updatedScores);
      updateLocalStorage([...prevPlayers, playerName], updatedScores, par);
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
    updateLocalStorage(players, updatedScores, par);
  };

  const handleParChange = (hole, value) => {
    const updatedPar = [...par];
    updatedPar[hole] = Number(value);
    setPar(updatedPar);
    updateLocalStorage(players, scores, updatedPar);
  };

  const toggleEditingPar = (holeIndex) => {
    setEditingPar(editingPar === holeIndex ? null : holeIndex);
    if (editingPar !== holeIndex) {
      setTimeout(() => {
        const input = parInputRefs.current[holeIndex];
        if (input) {
          input.focus();
          input.select();
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
      setTimeout(() => {
        const key = `${holeIndex}-${playerIndex}`;
        const input = scoreInputRefs.current[key];
        if (input) {
          input.focus();
          input.select();
        }
      }, 0);
    }
  };

  const handleReset = () => {
    resetLocalStorage();
    setPlayers([]);
    setScores(Array(18).fill(Array(0).fill(0)));
    setPar(Array(18).fill(3));
  };

  return {
    players,
    scores,
    par,
    editingPar,
    editingScore,
    toggleResetModal,
    scoreInputRefs,
    parInputRefs,
    setPlayers,
    setScores,
    setPar,
    setEditingPar,
    setEditingScore,
    setToggleResetModal,
    handleAddPlayer,
    handleScoreChange,
    saveScore,
    handleParChange,
    toggleEditingPar,
    handleParKeyDown,
    savePar,
    toggleEditingScore,
    handleReset
  };
};

export default useDiscGolfState;
