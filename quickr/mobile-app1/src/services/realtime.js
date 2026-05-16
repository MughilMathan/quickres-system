import socket from './socket';

// Listen for order status updates
export const subscribeToOrderUpdates = (callback) => {
  socket.on('order:statusUpdate', (data) => {
    callback(data);
  });

  socket.on('order_status_updated', (data) => {
    callback(data);
  });

  // Return unsubscribe function
  return () => {
    socket.off('order:statusUpdate', callback);
    socket.off('order_status_updated', callback);
  };
};

// Listen for new orders (admin perspective)
export const subscribeToNewOrders = (callback) => {
  socket.on('order:new', (data) => {
    callback(data);
  });

  return () => {
    socket.off('order:new', callback);
  };
};

// Listen for table scan events
export const subscribeToTableScans = (callback) => {
  socket.on('table:scanned', (data) => {
    callback(data);
  });

  return () => {
    socket.off('table:scanned', callback);
  };
};

// Emit custom order event
export const emitOrderEvent = (event, data) => {
  socket.emit(event, data);
};

// Get socket connection status
export const isSocketConnected = () => {
  return socket && socket.connected;
};

export default socket;
