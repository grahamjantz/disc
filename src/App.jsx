// import React, { useState, useEffect, useRef } from 'react';
// import PlayerInput from './PlayerInput';
// import Header from './Header';
// import PlayerScores from './PlayerScores';
// import ResetModal from './ResetModal';
// import CourseNameModal from './CourseNameModal'; // Import the modal component
// import SelectCourse from './SelectCourse';

// const App = () => {
//   const [players, setPlayers] = useState([]);
//   const [scores, setScores] = useState(Array(18).fill([])); // Initialize scores as empty arrays
//   const [par, setPar] = useState([]); // Initialize par as an empty array
//   const [editingPar, setEditingPar] = useState(null);
//   const [editingScore, setEditingScore] = useState({ hole: null, player: null, value: '' });
//   const [toggleResetModal, setToggleResetModal] = useState(false);
//   const [toggleCourseModal, setToggleCourseModal] = useState(false); // State to control the course modal
//   const [courses, setCourses] = useState({}); // State to store courses

//   const scoreInputRefs = useRef({});
//   const parInputRefs = useRef({});

//   useEffect(() => {
//     // Check for existing values in local storage
//     const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
//     const savedCourses = JSON.parse(localStorage.getItem('courses')) || {}; // Initialize courses
//     const savedScores = JSON.parse(localStorage.getItem('scores')) || Array(18).fill(Array(savedPlayers.length).fill(0));
//     const savedPar = JSON.parse(localStorage.getItem('par'));

//     // Set initial par if none exists
//     if (!savedPar || savedPar.length === 0) {
//       const initialPar = Array(18).fill(3);
//       localStorage.setItem('par', JSON.stringify(initialPar)); // Set initial par in local storage
//       setPar(initialPar);
//     } else {
//       setPar(savedPar); // Set the existing par
//     }

//     // Set state values
//     setPlayers(savedPlayers);
//     const updatedScores = savedScores.map((holeScores) =>
//       holeScores.length === savedPlayers.length ? holeScores : Array(savedPlayers.length).fill(0)
//     );
//     setScores(updatedScores);
    
//     // Set courses state
//     setCourses(savedCourses);

//     // Set initial values in local storage if they are empty
//     if (savedPlayers.length === 0) {
//       localStorage.setItem('players', JSON.stringify([]));
//     }
//     if (Object.keys(savedCourses).length === 0) {
//       localStorage.setItem('courses', JSON.stringify({})); // Save an empty courses object if none exists
//     }
//     if (savedScores.length !== 0) {
//       localStorage.setItem('scores', JSON.stringify(Array(18).fill([]))); // Initialize scores in local storage
//     }
//   }, []);

//   const handleAddPlayer = (newPlayer) => {
//     const updatedPlayers = [...players, newPlayer];
//     setPlayers(updatedPlayers);
//     const updatedScores = scores.map((holeScores) => [...holeScores, 0]); // Append 0 to each sub-array in scores
//     setScores(updatedScores);
//     localStorage.setItem('players', JSON.stringify(updatedPlayers)); // Update local storage
//     localStorage.setItem('scores', JSON.stringify(updatedScores)); // Update local storage for scores
//   };

//   const toggleEditingPar = (holeIndex) => {
//     setEditingPar(editingPar === holeIndex ? null : holeIndex);
//   };

//   const toggleEditingScore = (holeIndex, playerIndex, score) => {
//     setEditingScore({
//       hole: holeIndex,
//       player: playerIndex,
//       value: score === 0 ? '' : score,
//     });
//   };

//   const handleParChange = (holeIndex, value) => {
//     const updatedPar = [...par];
//     updatedPar[holeIndex] = value === '' ? '' : parseInt(value);
//     setPar(updatedPar);
//     localStorage.setItem('par', JSON.stringify(updatedPar)); // Update local storage
//   };

//   const handleScoreChange = (holeIndex, playerIndex, value) => {
//     setEditingScore((prevState) => ({
//       ...prevState,
//       hole: holeIndex,
//       player: playerIndex,
//       value: value, // This will update the input field value correctly
//     }));
//   };

//   const handleKeyDown = (e, holeIndex, playerIndex = null) => {
//     if (e.key === 'Enter' || e.type === 'blur') {
//       if (playerIndex === null) {
//         savePar(holeIndex);
//       } else {
//         saveScore(holeIndex, playerIndex);
//       }
//     }
//   };

//   const savePar = (holeIndex) => {
//     setEditingPar(null);
//     localStorage.setItem('par', JSON.stringify(par)); // Ensure par is saved
//   };

//   const saveScore = (holeIndex, playerIndex) => {
//     const updatedScores = [...scores];
//     updatedScores[holeIndex][playerIndex] = editingScore.value === '' ? 0 : parseInt(editingScore.value);
//     setScores(updatedScores);
//     setEditingScore({ hole: null, player: null, value: '' });
//     localStorage.setItem('scores', JSON.stringify(updatedScores)); // Update local storage
//   };

//   const resetData = () => {
//     const defaultPar = Array(18).fill(3); // Default par values
  
//     setPlayers([]); // Reset players state
//     setScores(Array(18).fill([])); // Reset scores to empty arrays
//     setPar(defaultPar); // Reset par to default values
  
//     // Update local storage
//     localStorage.setItem('players', JSON.stringify([])); // Reset players in local storage
//     localStorage.setItem('scores', JSON.stringify(Array(18).fill([]))); // Reset scores in local storage
//     localStorage.setItem('par', JSON.stringify(defaultPar)); // Reset par in local storage
  
//     setToggleResetModal(false); // Close the reset modal
//   };
  

//   const saveCourse = (courseName) => {
//     const courses = JSON.parse(localStorage.getItem('courses')) || {};
//     courses[courseName] = par;
//     localStorage.setItem('courses', JSON.stringify(courses));
//     setCourses(courses); // Update state with new courses
//     setToggleCourseModal(false); // Close the modal after saving
//   };

//   const handleCourseSelect = (courseName) => {
//     const courses = JSON.parse(localStorage.getItem('courses')) || {};
    
//     if (courseName === "reset") {
//       const defaultPar = Array(18).fill(3); // Reset to default par values
//       setPar(defaultPar);
//       localStorage.setItem('par', JSON.stringify(defaultPar)); // Overwrite par in local storage
//     } else if (courses[courseName]) {
//       const coursePar = courses[courseName];
//       setPar(coursePar);
//       localStorage.setItem('par', JSON.stringify(coursePar)); // Overwrite par in local storage
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-[#242424] text-white p-4">
//       <Header />
//       <div className='mt-24'>
//         <PlayerInput onAddPlayer={handleAddPlayer} />
//         <SelectCourse 
//           courses={courses}
//           onSelectCourse={handleCourseSelect}
//         />
//         <PlayerScores
//           players={players}
//           scores={scores}
//           par={par}
//           editingPar={editingPar}
//           editingScore={editingScore}
//           toggleEditingPar={toggleEditingPar}
//           toggleEditingScore={toggleEditingScore}
//           handleParChange={handleParChange}
//           handleScoreChange={handleScoreChange}
//           handleKeyDown={handleKeyDown}
//           savePar={savePar}
//           saveScore={saveScore}
//           parInputRefs={parInputRefs}
//           scoreInputRefs={scoreInputRefs}
//           setEditingScore={setEditingScore}
//           setEditingPar={setEditingPar}
//         />
//       </div>
//       <button onClick={() => setToggleCourseModal(true)} className="w-3/4 my-4 bg-green-600 p-2 px-16 rounded-3xl">
//         Save Course
//       </button>
//       <button onClick={() => setToggleResetModal(true)} className="w-3/4 mb-16 bg-red-500 p-2 px-16 rounded-3xl ">
//         Reset
//       </button>
//       {toggleCourseModal && (
//         <CourseNameModal onSave={saveCourse} onCancel={() => setToggleCourseModal(false)} />
//       )}
//       {toggleResetModal && (
//         <ResetModal onConfirm={resetData} onCancel={() => setToggleResetModal(false)} />
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import PlayerInput from './PlayerInput';
import Header from './Header';
import PlayerScores from './PlayerScores';
import ResetModal from './ResetModal';
import CourseNameModal from './CourseNameModal'; // Import the modal component
import SelectCourse from './SelectCourse';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState(Array(18).fill([])); // Initialize scores as empty arrays
  const [par, setPar] = useState([]); // Initialize par as an empty array
  const [editingPar, setEditingPar] = useState(null);
  const [editingScore, setEditingScore] = useState({ hole: null, player: null, value: '' });
  const [toggleResetModal, setToggleResetModal] = useState(false);
  const [toggleCourseModal, setToggleCourseModal] = useState(false); // State to control the course modal
  const [courses, setCourses] = useState({}); // State to store courses

  const scoreInputRefs = useRef({});
  const parInputRefs = useRef({});

  useEffect(() => {
    // Check for existing values in local storage
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || {}; // Initialize courses
    const savedScores = JSON.parse(localStorage.getItem('scores')) || Array(18).fill(Array(savedPlayers.length).fill(0));
    const savedPar = JSON.parse(localStorage.getItem('par'));

    // Set initial par if none exists
    if (!savedPar || savedPar.length === 0) {
      const initialPar = Array(18).fill(3);
      localStorage.setItem('par', JSON.stringify(initialPar)); // Set initial par in local storage
      setPar(initialPar);
    } else {
      setPar(savedPar); // Set the existing par
    }

    // Set state values
    setPlayers(savedPlayers);
    const updatedScores = savedScores.map((holeScores) =>
      holeScores.length === savedPlayers.length ? holeScores : Array(savedPlayers.length).fill(0)
    );
    setScores(updatedScores);
    
    // Set courses state
    setCourses(savedCourses);

    // Set initial values in local storage if they are empty
    if (savedPlayers.length === 0) {
      localStorage.setItem('players', JSON.stringify([]));
    }
    if (Object.keys(savedCourses).length === 0) {
      localStorage.setItem('courses', JSON.stringify({})); // Save an empty courses object if none exists
    }
    if (savedScores.length !== 0) {
      localStorage.setItem('scores', JSON.stringify(Array(18).fill([]))); // Initialize scores in local storage
    }
  }, []);

  const handleAddPlayer = (newPlayer) => {
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    const updatedScores = scores.map((holeScores) => [...holeScores, 0]); // Append 0 to each sub-array in scores
    setScores(updatedScores);
    localStorage.setItem('players', JSON.stringify(updatedPlayers)); // Update local storage
    localStorage.setItem('scores', JSON.stringify(updatedScores)); // Update local storage for scores
  };

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

  const handleParChange = (holeIndex, value) => {
    const updatedPar = [...par];
    updatedPar[holeIndex] = value === '' ? '' : parseInt(value);
    setPar(updatedPar);
    localStorage.setItem('par', JSON.stringify(updatedPar)); // Update local storage
  };

  const handleScoreChange = (holeIndex, playerIndex, value) => {
    setEditingScore((prevState) => ({
      ...prevState,
      hole: holeIndex,
      player: playerIndex,
      value: value, // This will update the input field value correctly
    }));
  };

  const handleKeyDown = (e, holeIndex, playerIndex = null) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      if (playerIndex === null) {
        savePar(holeIndex);
      } else {
        saveScore(holeIndex, playerIndex);
      }
    }
  };

  const savePar = (holeIndex) => {
    setEditingPar(null);
    localStorage.setItem('par', JSON.stringify(par)); // Ensure par is saved
  };

  const saveScore = (holeIndex, playerIndex) => {
    const updatedScores = [...scores];
    updatedScores[holeIndex][playerIndex] = editingScore.value === '' ? 0 : parseInt(editingScore.value);
    setScores(updatedScores);
    setEditingScore({ hole: null, player: null, value: '' });
    localStorage.setItem('scores', JSON.stringify(updatedScores)); // Update local storage
  };

  const resetData = () => {
    const defaultPar = Array(18).fill(3); // Default par values
  
    setPlayers([]); // Reset players state
    setScores(Array(18).fill([])); // Reset scores to empty arrays
    setPar(defaultPar); // Reset par to default values
  
    // Update local storage
    localStorage.setItem('players', JSON.stringify([])); // Reset players in local storage
    localStorage.setItem('scores', JSON.stringify(Array(18).fill([]))); // Reset scores in local storage
    localStorage.setItem('par', JSON.stringify(defaultPar)); // Reset par in local storage
  
    setToggleResetModal(false); // Close the reset modal
  };

  const saveCourse = (courseName) => {
    const courses = JSON.parse(localStorage.getItem('courses')) || {};
    courses[courseName] = par;
    localStorage.setItem('courses', JSON.stringify(courses));
    setCourses(courses); // Update state with new courses
    setToggleCourseModal(false); // Close the modal after saving
  };

  const handleCourseSelect = (courseName) => {
    const courses = JSON.parse(localStorage.getItem('courses')) || {};
    
    if (courseName === "reset") {
      const defaultPar = Array(18).fill(3); // Reset to default par values
      setPar(defaultPar);
      localStorage.setItem('par', JSON.stringify(defaultPar)); // Overwrite par in local storage
    } else if (courses[courseName]) {
      const coursePar = courses[courseName];
      setPar(coursePar);
      localStorage.setItem('par', JSON.stringify(coursePar)); // Overwrite par in local storage
    }
  };
  
  return (
    <div className="min-h-screen bg-[#242424] text-white p-4">
      <Header />
      <div className='mt-24'>
        <PlayerInput onAddPlayer={handleAddPlayer} />
        <SelectCourse 
          courses={courses}
          onSelectCourse={handleCourseSelect}
        />
        <PlayerScores
          players={players}
          setPlayers={setPlayers} // Pass setPlayers function
          scores={scores}
          par={par}
          editingPar={editingPar}
          editingScore={editingScore}
          toggleEditingPar={toggleEditingPar}
          toggleEditingScore={toggleEditingScore}
          handleParChange={handleParChange}
          handleScoreChange={handleScoreChange}
          handleKeyDown={handleKeyDown}
          savePar={savePar}
          saveScore={saveScore}
          parInputRefs={parInputRefs}
          scoreInputRefs={scoreInputRefs}
          setEditingScore={setEditingScore}
          setEditingPar={setEditingPar}
        />
      </div>
      <button onClick={() => setToggleCourseModal(true)} className="w-3/4 my-4 bg-green-600 p-2 px-16 rounded-3xl">
        Save Course
      </button>
      <button onClick={() => setToggleResetModal(true)} className="w-3/4 mb-16 bg-red-500 p-2 px-16 rounded-3xl ">
        Reset
      </button>
      {toggleCourseModal && (
        <CourseNameModal onSave={saveCourse} onCancel={() => setToggleCourseModal(false)} />
      )}
      {toggleResetModal && (
        <ResetModal onConfirm={resetData} onCancel={() => setToggleResetModal(false)} />
      )}
    </div>
  );
};

export default App;
