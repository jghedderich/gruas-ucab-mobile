import React, { createContext, useContext, useState } from 'react';
import { orders } from '@/app/data/data';  // Importación de orders desde data.ts

interface Order {
  orderId: string;
  driverName: string;
  carModel: string;
  origin: string;
  destination: string;
  distance_arrival: string;
  duration_arrival: string;
  distance_back: string;
  duration_back: string;
  userId: string;
}

interface OrderContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setOrderById: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string) => void;
  getOrderDetails: (id: string) => Order | undefined;  // Nueva función para obtener los detalles completos de la orden
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [ordersState, setOrdersState] = useState<Order[]>(orders);  // Usa los datos importados directamente
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const getOrderById = (id: string) => {
    return ordersState.find(order => order.orderId === id);
  };

  const setOrderById = (id: string) => {
    // Aquí puedes implementar lógica adicional si es necesario
  };

  const getOrderDetails = (id: string) => {
    // Buscar la orden en el array de datos importado
    return ordersState.find(order => order.orderId === id);
  };

  return (
    <OrderContext.Provider value={{
      orders: ordersState, 
      setOrders: setOrdersState, 
      setOrderById, 
      getOrderById, 
      selectedOrderId, 
      setSelectedOrderId, 
      getOrderDetails 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;
