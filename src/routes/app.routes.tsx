import React from "react";
import { Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from "../screens/Dashboard";
import { Registrer } from "../screens/Registrer";


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    const theme = useTheme();
    return (
        <Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.sedondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
        <Screen 
        name="Listagem" 
        component={Dashboard}
        options={{
            tabBarIcon: (({ color, size }) => 
            <MaterialIcons
                name="format-list-bulleted"
                size={size}
                color={color}
            />
            )}}
        />
        <Screen 
        name="Cadastrar" 
        component={Registrer} 
        options={{
            tabBarIcon: (({ color, size }) => 
            <MaterialIcons
                name="attach-money"
                size={size}
                color={color}
            />
            )}}
            />
        <Screen 
        name="Resumo" 
        component={Registrer}
        options={{
            tabBarIcon: (({ color, size }) => 
            <MaterialIcons
                name="pie-chart"
                size={size}
                color={color}
            />
            )}}
        />
        </Navigator>
    );
}