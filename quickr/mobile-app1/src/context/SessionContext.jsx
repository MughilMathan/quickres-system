import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import socket from '../services/socket';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [tableId, setTableId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const location = useLocation();

  const checkSession = async (tid) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/table/${tid}/session`);
      if (response.data.active) {
        setActiveOrder(response.data.order);
      } else {
        setActiveOrder(null);
      }
    } catch (err) {
      console.error('Session check failed', err);
    } finally {
      setLoading(false);
    }
  };

  const activateTableSession = async (tid) => {
    if (!tid) return;
    try {
      await axios.post(`${BASE_URL}/api/scan/scan`, {
        hotelId: 'abhirami',
        tableId: tid,
        sessionId: `session-${tid}`
      });
    } catch (err) {
      console.warn('Failed to activate scan session', err);
    }
  };

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const activateAndCheck = async (tid) => {
      setTableId(tid);
      localStorage.setItem('table_id', tid);
      if (socket && socket.connected) {
        socket.emit('join_table', tid);
      }
      await activateTableSession(tid);
      await checkSession(tid);
    };

    if (pathParts[1] === 'table' && pathParts[2]) {
      const tid = pathParts[2];
      void activateAndCheck(tid);
    } else {
      const savedTid = localStorage.getItem('table_id');
      if (savedTid) {
        void activateAndCheck(savedTid);
      } else {
        setLoading(false);
      }
    }
  }, [location.pathname]);

  const clearSession = () => {
    localStorage.removeItem('table_id');
    setTableId(null);
    setActiveOrder(null);
  };

  return (
    <SessionContext.Provider value={{ tableId, activeOrder, loading, checkSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};