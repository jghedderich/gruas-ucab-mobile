import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';


const GOOGLE_MAPS_API_KEY = 'AIzaSyDj_dOUSZbejwr9PUbxTh29X8NTHgYoRUk';

export const getLocation = async () => {
    try {
        // Solicitar permisos de ubicación
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permiso para acceder a la ubicación denegado.');
        }

        // Obtener la ubicación actual
        const currentLocation = await Location.getCurrentPositionAsync({});

        // Llamar al API de Geocoding de Google
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;

            // Extraer campos específicos
            const addressLine1 = addressComponents.find((component: any) =>
                component.types.includes('plus_code')
            )?.long_name;

            const addressLine2 = addressComponents.find((component: any) =>
                component.types.includes('sublocality_level_1') || component.types.includes('locality')
            )?.long_name;

            const city = addressComponents.find((component: any) =>
                component.types.includes('locality')
            )?.long_name;

            const state = addressComponents.find((component: any) =>
                component.types.includes('administrative_area_level_1')
            )?.long_name;

            const zip = addressComponents.find((component: any) =>
                component.types.includes('postal_code')
            )?.long_name;

            const latitude = currentLocation.coords.latitude;
            const longitude = currentLocation.coords.longitude;
            return { addressLine1, addressLine2, city, state, zip, latitude,longitude };
        } else {
            throw new Error('No se encontró una dirección para estas coordenadas.');
        }
    } catch (error) {
        throw new Error('Error al obtener ubicación');
    }
};
export default getLocation;