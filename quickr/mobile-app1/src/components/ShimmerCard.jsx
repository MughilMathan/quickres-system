import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col h-full animate-pulse">
      <div className="h-[120px] w-full bg-gray-200 dark:bg-gray-800" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
