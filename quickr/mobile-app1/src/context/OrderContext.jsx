import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../services/socket';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [latestStatus, setLatestStatus] = useState(null);

  useEffect(() => {
    socket.on('order_status_updated', (payload) => {
      // payload: { orderId, status, estimatedTime }
      if (currentOrder && currentOrder.orderId === payload.orderId) {
        setLatestStatus(payload);
        setShowStatusPopup(true);
        setCurrentOrder(prev => ({ ...prev, status: payload.status, estimatedTime: payload.estimatedTime }));
      }
    });

    return () => socket.off('order_status_updated');
  }, [currentOrder]);

  const placeOrderLocal = (order) => {
    setCurrentOrder(order);
    setStatusUpdates([]);
  };

  const clearOrderLocal = () => {
    setCurrentOrder(null);
    setStatusUpdates([]);
    setShowStatusPopup(false);
    setLatestStatus(null);
  };

  return (
    <OrderContext.Provider value={{ 
      currentOrder, 
      showStatusPopup, 
      setShowStatusPopup, 
      latestStatus,
      placeOrderLocal, 
      clearOrderLocal,
      setCurrentOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};