import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SessionProvider } from './context/SessionContext';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Pages
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import ReceiptPage from './pages/ReceiptPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ScannerPage from './pages/ScannerPage';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <SessionProvider>
          <MenuProvider>
            <CartProvider>
              <OrderProvider>
                <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-[#0F0F0F] relative shadow-2xl overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/scan" element={<ScannerPage />} />
                    <Route path="/table/:tableId" element={<LandingPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="/receipt" element={<ReceiptPage />} />
                    <Route path="/track" element={<OrderTrackingPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </OrderProvider>
            </CartProvider>
          </MenuProvider>
        </SessionProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
