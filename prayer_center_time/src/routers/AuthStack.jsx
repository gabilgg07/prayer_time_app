import React from 'react';
import {useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import {COLORS} from '../utils/Colors';

const BottomTabStack = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        tabBarActiveTintColor: COLORS.mainColor,
        tabBarInactiveTintColor: isDarkMode
          ? COLORS.whiteColor
          : COLORS.blackColor,
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 18,
        },
        tabBarStyle: {
          height: 100,
          backgroundColor: isDarkMode
            ? COLORS.darkColor100
            : COLORS.lightColor100,
          padding: 15,
          paddingBottom: 15,
        },
      }}>
      <Tab.Screen
        name="Login Screen"
        component={LoginScreen}
        options={{
          headerTintColor: COLORS.mainColor,
          headerStyle: {
            backgroundColor: isDarkMode
              ? COLORS.darkColor100
              : COLORS.lightColor100,
          },
          tabBarLabel: 'Giriş',
          tabBarIcon: ({color, size}) => (
            <Icon name="user-shield" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          tabBarLabel: 'Qeydiyyat',
          tabBarIcon: ({color, size}) => (
            <Icon name="user-plus" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          tabBarLabel: 'Şifrəni Sıfırla',
          tabBarIcon: ({color, size}) => (
            <Icon name="key" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabStack">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
