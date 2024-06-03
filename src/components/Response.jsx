import React from 'react';

function Response({ BotMsg }) {
  return (
    <div className='flex justify-start mb-2'>
      <div className='bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-xs break-words'>
        {BotMsg}
      </div>
    </div>
  );
}

export default Response;
