import React from 'react';

const SelectCourse = ({ courses, onSelectCourse, }) => {


  const handleChange = (event) => {
    const selectedCourse = event.target.value;
    onSelectCourse(selectedCourse);
  };

  return (
    <div className="my-4">
      <h2 className="text-lg mb-2">Select Course</h2>
      <select 
        onChange={handleChange} 
        className="border-blue-500 border p-2 px-6 w-full rounded-3xl  bg-[#242424] text-gray-200"
    >
        <option value="">Select a course</option>
        <option value="reset">Reset to default par (3)</option>
        {Object.keys(courses).map((courseName) => (
          <option 
            key={courseName} 
            value={courseName}
            className='w-screen '
        >
            {courseName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCourse;
