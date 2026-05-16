import React from 'react';

const categories = [
  'All', 'Breakfast', 'Tiffin', 'Uthappam', 'Roast', 'Dosa', 'Rava', 'Breads', 'Specials', 
  'Biryani', 'Chicken', 'Mutton', 'Seafood', 'Soup', 'Chinese', 'Tandoori', 'Kids', 
  'Vegetarian', 'Meals', 'Drinks', 'Desserts'
];

const CategoryChips = ({ selected, onSelect }) => {
  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-3 bg-white dark:bg-[#0F0F0F]">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap rounded-full px-[14px] py-[6px] text-[12px] font-semibold transition-all duration-200 border ${
            selected === cat
              ? 'bg-[#B5451B] text-white border-[#B5451B]'
              : 'bg-transparent text-[#B5451B] border-[#B5451B] dark:border-[#F5A67D] dark:text-[#F5A67D]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
