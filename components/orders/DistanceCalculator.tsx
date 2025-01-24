import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
const OPENROUTE_API_KEY = '5b3ce3597851110001cf6248fc11ef5c46b74af1a1eedd958bce7637';
export async function calculateDistanceAndDuration(origin: any, destination: any) {
    const url = 'https://api.openrouteservice.org/v2/matrix/driving-car';
    const requestBody = {
        locations: [origin, destination],
        metrics: ['distance', 'duration'],
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: OPENROUTE_API_KEY,
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            console.error('Error en la API:', response.statusText);
            return { distance: null, duration: null };
        }
        const data = await response.json();
        if (data && data.distances && data.durations) {
            const distanceInKm = (data.distances[0][1] / 1000).toFixed(2);
            const durationInMinutes = (data.durations[0][1] / 60).toFixed(2);
            return { distance: `${distanceInKm} km`, duration: `${durationInMinutes} min` };
        } else {
            return { distance: null, duration: null };
        }
    } catch (error) {
        console.error('Error al calcular la distancia:', error);
        return { distance: null, duration: null };
    }
}