import React from "react";

function Input({ userMsg, date }) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-gray-800 text-gray-300 rounded-lg py-2 px-4 max-w-xs break-words">
        <p>{userMsg}</p>
        <p className="text-gray-500 text-xs italic text-right mt-2">{date || "N/A"}</p>
      </div>
    </div>
  );
}

export default Input;
