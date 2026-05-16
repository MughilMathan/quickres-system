import React from 'react';
import { motion } from 'framer-motion';
import VegIndicator from './VegIndicator';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item, index, onAddClick }) => {
  const { addToCart } = useCart();
  const isVeg = item.type === 'Veg';

  const handleClick = () => {
    if (item.variants && item.variants.length > 0) {
      onAddClick(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full"
    >
      <div className="relative h-[120px] w-full bg-orange-50 dark:bg-gray-800 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <VegIndicator isVeg={isVeg} />
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow justify-between gap-2">
        <div>
          <h3 className="font-lato font-bold text-[14px] leading-tight text-gray-800 dark:text-gray-100 line-clamp-2">
            {item.name}
          </h3>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded inline-block mt-1">
            {item.category}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="font-lato font-bold text-[15px] text-[#B5451B] dark:text-[#F5A67D]">
            ₹{item.price}
          </span>
          <motion.button
            whileTap={{ scale: 1.2 }}
            onClick={handleClick}
            className="bg-[#B5451B] text-white rounded-md px-3 py-1 text-[12px] font-bold shadow-sm"
          >
            + Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
