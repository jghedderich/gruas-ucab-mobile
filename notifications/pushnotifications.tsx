import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export async function registerForPushNotificationsAsync() {
    try {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);

            // Obtén el token de dispositivo
            const token = await messaging().getToken();
            console.log('Device FCM Token:', token);

            return token;
        } else {
            console.log('Permission denied');
        }
    } catch (error) {
        console.error('Error requesting push notification permission:', error);
    }
}