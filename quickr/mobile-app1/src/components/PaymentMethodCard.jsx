import React from 'react';
import { motion } from 'framer-motion';

const PaymentMethodCard = ({ id, icon, title, subtext, selected, onSelect, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(id)}
        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
          selected
            ? 'bg-[#FDF0EA] dark:bg-[#2A150D] border-[#B5451B] border-l-[4px]'
            : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-gray-800'
        }`}
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`p-2 rounded-full ${selected ? 'bg-[#B5451B] text-white' : 'bg-orange-50 dark:bg-gray-800 text-[#B5451B]'}`}>
            {icon}
          </div>
          <div>
            <h4 className={`font-bold text-[14px] ${selected ? 'text-[#B5451B]' : 'text-gray-800 dark:text-gray-100'}`}>
              {title}
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {subtext}
            </p>
          </div>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-[#B5451B]' : 'border-gray-200 dark:border-gray-700'}`}>
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#B5451B]" />}
        </div>
      </motion.button>
      
      {selected && children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-2 pb-4 overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
