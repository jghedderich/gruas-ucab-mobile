import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';
import config from '@/app/config';
// Define las interfaces necesarias
interface Client {
    name: {
        firstName: string;
        lastName: string;
    };
    dni: {
        type: string;
        number: string;
    };
    phone: string;
    email: string;
    clientVehicle: {
        brand: string;
        model: string;
        year: number;
        type: string;
    };
}

interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
}

interface CostDetail {
    id: string;
    orderId: string;
    description: string;
    amount: number;
    statusC: string;
}

interface Order {
    id: string;
    operatorId: string;
    policyId: string;
    driverId: string;
    client: Client;
    orderStatus: string;
    incidentAddress: Address;
    destinationAddress: Address;
    costDetails: CostDetail[];
    isActive: boolean;
    distanceBack?: string;
    durationBack?: string;
}

interface OrderContextType {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    setOrderById: (id: string) => void;
    getOrderById: (id: string) => Order | undefined;
    selectedOrderId: string | null;
    setSelectedOrderId: (id: string) => void;
    getOrderDetails: (id: string) => Order | undefined;
    fetchOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [ordersState, setOrdersState] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const apiUrl = config.apiBaseUrl;
    // Reemplazar esto con el userId adecuado que puedas obtener desde el contexto o estado global
    const { user } = useUser(); // Obtenemos el usuario logueado del contexto
    const fetchOrders = async () => {
        if (user) {
            try {
                const response = await fetch(`${apiUrl}/orders-service/orders`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                const userOrders1 = data.orders.data.filter((order: Order) => order.orderStatus != 'Completed');
                const userOrders2 = userOrders1.filter((order: Order) => order.orderStatus != 'Canceled');
                const filteredOrders = userOrders2.filter((order: Order) => order.driverId === user?.id);
                setOrdersState(filteredOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    };


    const getOrderById = (sid: string) => {
        return ordersState.find(order => order?.id === sid);
    };

    const setOrderById = (id: string) => {
        // Aquí puedes implementar lógica adicional si es necesario
    };

    const getOrderDetails = (id: string) => {
        return ordersState.find(order => order.id === id);
    };

    return (
        <OrderContext.Provider value={{
            orders: ordersState,
            setOrders: setOrdersState,
            setOrderById,
            getOrderById,
            selectedOrderId,
            setSelectedOrderId,
            getOrderDetails,
            fetchOrders
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