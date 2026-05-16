import React from 'react';

const VegIndicator = ({ isVeg }) => {
  return (
    <div className={`w-[10px] h-[10px] flex items-center justify-center border ${isVeg ? 'border-green-600' : 'border-red-600'} p-[1px]`}>
      <div className={`w-full h-full rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
    </div>
  );
};

export default VegIndicator;
