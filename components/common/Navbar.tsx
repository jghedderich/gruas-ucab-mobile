import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/(tabs)/home';
import OrderScreen from '@/app/(tabs)/order';
import ProfileScreen from '@/app/(tabs)/profile';

const Tabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
        </Tab.Navigator>
    );
};

export default Tabs;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function BottomRectangle() {
//   return (
//     <View style={styles.container}>
      
//       <View style={styles.bottomRectangle}>
//         <Text style={styles.text}>Navbar aquí</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
//   },
//   bottomRectangle: {
//     position: 'absolute', // Lo coloca en una posición fija
//     bottom: 0, // Lo asegura en la parte inferior
//     left: 0,
//     right: 0,
//     backgroundColor: 'yellow', // Rectángulo amarillo
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: 'black',
//     fontSize: 16,
//   },
// });


// import { Tabs } from 'expo-router';
// import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarStyle: {
//           position: 'absolute', // Hace que el TabBar esté al final de la pantalla
//           bottom: 0, // Lo asegura que se ubique en la parte inferior
//           left: 0,
//           right: 0,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Principal',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? 'home' : 'home-outline'}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Perfil',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? 'person-circle' : 'person-circle-outline'}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }



