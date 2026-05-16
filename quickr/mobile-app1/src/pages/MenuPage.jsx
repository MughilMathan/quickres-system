import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { useMenu } from '../context/MenuContext';
import AppBar from '../components/AppBar';
import AnimatedTicker from '../components/AnimatedTicker';
import CategoryChips from '../components/CategoryChips';
import MenuCard from '../components/MenuCard';
import VariantBottomSheet from '../components/VariantBottomSheet';
import ShimmerCard from '../components/ShimmerCard';

const MenuPage = () => {
  const { menu, loading, warning } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItemForVariant, setSelectedItemForVariant] = useState(null);

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory || (selectedCategory === 'Chicken' && item.category === 'Chicken Specials');
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F] pb-24">
      <AppBar 
        showSearch 
        onSearchClick={() => setIsSearchOpen(!isSearchOpen)} 
      />
      
      <div className="sticky top-[52px] z-40">
        <AnimatedTicker />
        
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 56, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white dark:bg-[#1A1A1A] px-4 flex items-center shadow-lg border-b border-gray-100 dark:border-gray-800"
            >
              <div className="flex-grow flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 h-10">
                <FiSearch className="text-gray-400 mr-2" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-[14px] text-gray-800 dark:text-gray-100"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <FiX className="text-gray-400" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CategoryChips 
          selected={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
      </div>

      {warning && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-4 mt-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-[12px] font-semibold border border-orange-200"
        >
          {warning}
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-3 px-4 py-4">
          {[1,2,3,4,5,6].map(i => <ShimmerCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 py-4">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item, index) => (
              <MenuCard 
                key={item._id} 
                item={item} 
                index={index} 
                onAddClick={setSelectedItemForVariant}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {filteredMenu.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600">
          <span className="text-[48px] mb-2">🔍</span>
          <p className="font-lato font-medium">No results found</p>
        </div>
      )}

      <VariantBottomSheet
        item={selectedItemForVariant}
        isOpen={!!selectedItemForVariant}
        onClose={() => setSelectedItemForVariant(null)}
      />
    </div>
  );
};

export default MenuPage;
