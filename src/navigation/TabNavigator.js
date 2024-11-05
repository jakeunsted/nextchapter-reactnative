/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeDashboard from '../screens/HomeDashboard';
import Suggestions from '../screens/Suggestions';
import BottomDrawerMenu from '../components/navigation/AddBookDrawer';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      {isDrawerVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setDrawerVisible(false)}
        />
      )}
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeDashboard}
          options={{
            tabBarIcon: ({ color, size }) => ( 
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setDrawerVisible(true);
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus" color={color} size={size} />
            ),
          }}
        >
          {() => null} 
        </Tab.Screen>
        <Tab.Screen
          name="Suggestions"
          component={Suggestions}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <BottomDrawerMenu
        visible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});

export default TabNavigator;
