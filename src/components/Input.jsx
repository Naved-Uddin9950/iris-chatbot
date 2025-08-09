import React from 'react';

function Input({ userMsg }) {
  return (
    <div className='flex justify-end mb-2'>
      <div className='bg-gray-800 text-gray-300 rounded-lg py-2 px-4 max-w-xs break-words'>
        {userMsg}
      </div>
    </div>
  );
}

export default Input;
