export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Order {
  _id: string;
  orderId: string;
  hotelId: string;
  tableId: string;
  sessionId: string;
  items: {
    menuItemId: string;
    quantity: number;
    specialInstructions?: string;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Table {
  tableId: string;
  sessionId?: string;
  status: 'free' | 'occupied';
  currentOrderIds: string[];
}

export interface Session {
  sessionId: string;
  tableId: string;
  users: { name: string; joinedAt: Date }[];
  createdAt: Date;
}