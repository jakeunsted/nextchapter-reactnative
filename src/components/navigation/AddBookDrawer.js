import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const BottomDrawerMenu = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide" // Keep the slide animation for the drawer
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => console.log('Search')}>
              <Text style={styles.menuItem}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Scan')}>
              <Text style={styles.menuItem}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Manual')}>
              <Text style={styles.menuItem}>Manual</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuContainer: {
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
});

export default BottomDrawerMenu;
