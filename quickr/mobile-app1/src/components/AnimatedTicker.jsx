import React from 'react';

const AnimatedTicker = () => {
  return (
    <div className="bg-[#8B3210] overflow-hidden whitespace-nowrap py-1.5 flex items-center">
      <div className="animate-marquee inline-block text-[#FFD4B8] font-lato italic text-[13px] uppercase tracking-wider">
        Welcome! Order your Dish, Fulfil your Wish! &nbsp;&nbsp;&nbsp;&nbsp; 
        Welcome! Order your Dish, Fulfil your Wish! &nbsp;&nbsp;&nbsp;&nbsp;
        Welcome! Order your Dish, Fulfil your Wish! &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default AnimatedTicker;
