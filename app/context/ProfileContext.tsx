import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@/app/context/UserContext'; // Contexto de usuario
import { useRouter } from 'expo-router';
import config from '@/app/config';

// Tipo de datos de Provider
type Provider = {
    id: string;
    name: { firstName: string; lastName: string };
    phone: string;
    email: string;
    company: {
        name: string;
        description: string;
        rif: string;
        state: string;
        city: string;
    };
    vehicles: any[];
};

// Tipo de datos de Vehicle
type Vehicle = {
    id: string;
    providerId: string;
    type: string;
    brand: string;
    model: string;
    year: number;
    isActive: boolean;
};

// Contextos
const ProfileContext = createContext<any>(null);

// Proveedor del contexto
export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const apiUrl = config.apiBaseUrl;
    const { user } = useUser(); // Obtenemos el usuario logueado
    const [provider, setProvider] = useState<Provider | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProviderAndVehicle = async () => {
            if (user && user.providerId && user.vehicleId) {
                try {
                    const providerResponse = await fetch(
                        `${apiUrl}/providers-service/providers/${user.providerId}`,{
                            headers: {
                                'Authorization': `Bearer ${user.token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const providerData = await providerResponse.json();
                    setProvider(providerData.provider);
                    const vehicleResponse = await fetch(
                        `${apiUrl}/providers-service/vehicles/${user.vehicleId}`, {
                            headers: {
                                'Authorization': `Bearer ${user.token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const vehicleData = await vehicleResponse.json();
                    setVehicle(vehicleData.vehicle);
                } catch (error) {
                    console.error('Error fetching provider or vehicle:', error);
                    // Puedes redirigir al login si hay un error
                    router.push('/login');
                }
            }
        };

        fetchProviderAndVehicle();
    }, [user]);

    return (
        <ProfileContext.Provider value={{ provider, vehicle }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Hook para acceder a los datos del contexto
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

export default ProfileProvider;