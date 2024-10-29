import React from 'react';
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';

/**
 * Loading With Logo Component
 */
const LoadingWithLogo = () => {
  /**
   * Render Component
   */
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        resizeMethod="auto"
        source={require('../../assets/images/Artboard_2.png')}
        style={styles.imageStyle}
      />
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loaderContainer: {
    marginTop: 20,
  },
});

export default LoadingWithLogo;
