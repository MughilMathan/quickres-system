import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import socket from '../services/socket';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/menu`);
      setMenu(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch menu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();

    socket.on('menu:updated', () => {
      fetchMenu();
    });

    socket.on('menu_updated', () => {
      fetchMenu();
    });

    socket.on('menu_item_deleted', ({ id, name }) => {
      setMenu(prev => prev.filter(item => item._id !== id));
      // Handled in CartContext for cart removal
      setWarning(`${name} has been removed from the menu.`);
      setTimeout(() => setWarning(null), 5000);
    });

    return () => {
      socket.off('menu:updated');
      socket.off('menu_updated');
      socket.off('menu_item_deleted');
    };
  }, []);

  return (
    <MenuContext.Provider value={{ menu, loading, error, warning, fetchMenu }}>
      {children}
    </MenuContext.Provider>
  );
};