const ResetModal = ({ onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-gray-900 p-4 rounded-xl flex flex-col items-center">
          <p className="text-lg">Are you sure you want to reset all data?</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-16 py-2 rounded-3xl"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-16 py-2 rounded-3xl"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResetModal;
  