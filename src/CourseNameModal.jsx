import React, { useState } from 'react';

const CourseNameModal = ({ onSave, onCancel }) => {
  const [courseName, setCourseName] = useState('');

  const handleSave = () => {
    if (courseName) {
      onSave(courseName);
      setCourseName('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="w-full bg-gray-900 text-white p-4 rounded-xl flex flex-col items-center gap-4">
        <h2 className="text-lg">Save Course</h2>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
          className="border-blue-500 border p-2 px-6 w-full rounded-3xl  bg-[#242424] text-gray-200"
        />
        <div className="w-full flex justify-between">
          <button onClick={handleSave} className="w-1/2 bg-green-600 text-white p-2 rounded-3xl mr-2 px-12">Save</button>
          <button onClick={onCancel} className="w-1/2 bg-gray-800 p-2 rounded-3xl px-12">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CourseNameModal;
