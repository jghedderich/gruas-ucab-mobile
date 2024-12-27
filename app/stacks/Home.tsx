import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../(tabs)/home"
import OrderScreen from "../(tabs)/order"

const HomeStackScreen = () => {
    const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Order" component={OrderScreen} />
        </HomeStack.Navigator>
    );
};
export default HomeStackScreen;