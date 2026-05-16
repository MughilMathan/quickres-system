import React from 'react';
import { useCart } from '../context/CartContext';
import { useSession } from '../context/SessionContext';

const ReceiptTemplate = ({ order }) => {
  if (!order) return null;

  return (
    <div 
      id="thermal-receipt" 
      className="w-[300px] bg-white p-5 text-black font-mono text-[12px] absolute -left-[9999px]"
    >
      <div className="text-center mb-4">
        <h1 className="font-playfair text-[18px] font-bold text-[#B5451B] mb-1">Abhirami Hotel</h1>
        <p className="text-[10px]">Near Bus Stand, Thuraiyur Taluk</p>
        <p className="text-[10px]">Trichy DT</p>
        <p className="text-[10px]">Ph: +91 9876543210</p>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2 pt-2">
        <div className="grid grid-cols-[1fr,30px,40px,50px] gap-1 font-bold mb-1">
          <span>Item</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Rate</span>
          <span className="text-right">Amt</span>
        </div>
        <div className="border-b border-gray-200 mb-2" />
        {order.items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[1fr,30px,40px,50px] gap-1 mb-1">
            <span className="truncate">{item.name}{item.variant ? ` (${item.variant.label.charAt(0)})` : ''}</span>
            <span className="text-right">{item.qty}</span>
            <span className="text-right">{item.unitPrice}</span>
            <span className="text-right">{item.qty * item.unitPrice}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-400 mt-2 pt-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Parcel charges</span>
          <span>₹{order.parcelCharge || 0}</span>
        </div>
        <div className="border-b border-double border-gray-400 my-1" />
        <div className="flex justify-between text-[16px] font-bold text-[#B5451B]">
          <span>TOTAL</span>
          <span>₹{order.grandTotal}</span>
        </div>
        <div className="border-b border-double border-gray-400 my-1" />
      </div>

      <div className="mt-4 space-y-1 text-[11px]">
        <p>Payment : {order.paymentMethod}</p>
        <p>Table   : No. {order.tableNumber || order.tableId}</p>
        <p>Order ID: #{order.orderId}</p>
        <p>Date    : {new Date(order.timestamp).toLocaleString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })}</p>
      </div>

      <div className="text-center mt-6 pt-4 border-t border-dashed border-gray-400">
        <p className="italic text-[#B5451B] font-bold">Thank you for dining with us!</p>
      </div>
    </div>
  );
};

export default ReceiptTemplate;
