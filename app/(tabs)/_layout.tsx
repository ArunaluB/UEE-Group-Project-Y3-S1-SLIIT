import React from 'react';
import { Tabs } from 'expo-router';
import Feather from 'react-native-vector-icons/Feather'; // Import Feather icons
import { View, StyleSheet } from 'react-native';

const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255, 215, 229, 0.8)', // Customize background
          height: 60, // Set the height of the tab bar
          paddingBottom: 5, // Padding inside the tab bar
          paddingTop: 5,
          borderTopWidth: 1, // Add a border to the top of the tab bar
          borderTopColor: '#E0E0E0',
          justifyContent: 'space-evenly', // Ensure even spacing of icons
          alignItems: 'center',
          borderRadius: 20,
        },
        tabBarActiveTintColor: '#FFFFFF', // Active tab color
        tabBarInactiveTintColor: '#8B4C70', // Inactive tab color
      }}
    >
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color }) => (
            <Feather name="bar-chart-2" color={color} size={24} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="Reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color }) => (
            <Feather name="bell" color={color} size={24} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={24} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="clinic"
        options={{
          title: 'Clinic',
          tabBarIcon: ({ color }) => (
            <Feather name="edit" color={color} size={24} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" color={color} size={24} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
