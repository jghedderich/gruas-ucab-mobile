import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { UserProvider } from '@/app/context/UserContext';
import { OrderProvider } from '@/app/context/OrderContext';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ProfileProvider } from '@/app/context/ProfileContext';
import { IdProvider } from '@/app/context/IdContext';
import messaging from '@react-native-firebase/messaging';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        // Manejar notificaciones en primer plano
        messaging().onMessage(async remoteMessage => {
            Toast.show({
                type: 'info',
                text1: 'New FCM Message',
                text2: JSON.stringify(remoteMessage),
                position: 'top',
            });
        });
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <UserProvider>
            <ProfileProvider>
                <OrderProvider>
                    <IdProvider>
                        <SafeAreaProvider>
                            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                                <Stack screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            </ThemeProvider>
                            <Toast />
                        </SafeAreaProvider>
                    </IdProvider>
                </OrderProvider>
            </ProfileProvider>
        </UserProvider>
    );
}