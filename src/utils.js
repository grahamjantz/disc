export const initializeStateFromLocalStorage = () => {
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const savedScores = JSON.parse(localStorage.getItem('scores')) || Array(18).fill(Array(savedPlayers.length).fill(0));
    const savedPar = JSON.parse(localStorage.getItem('par')) || Array(18).fill(3);
  
    return { savedPlayers, savedScores, savedPar };
  };
  
  export const updateLocalStorage = (players, scores, par) => {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('scores', JSON.stringify(scores));
    localStorage.setItem('par', JSON.stringify(par));
  };
  
  export const resetLocalStorage = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('scores');
    localStorage.removeItem('par');
  };
  