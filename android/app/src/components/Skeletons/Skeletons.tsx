// src/components/Skeletons/Skeleton.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Skeleton = ({width = '100%', height = 20, borderRadius = 4}) => {
  return <View style={[styles.skeleton, {width, height, borderRadius}]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    opacity: 0.7,
  },
});

export default Skeleton;
