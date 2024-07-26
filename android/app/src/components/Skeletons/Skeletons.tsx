// src/components/Skeletons/Skeleton.tsx
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
}) => {
  // Convert width to a number if it's a string percentage
  const widthStyle = typeof width === 'string' ? width : width;

  // Use widthStyle and height as numbers
  return (
    <View
      style={[
        styles.skeleton,
        {width: widthStyle, height, borderRadius} as ViewStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    opacity: 0.7,
  },
});

export default Skeleton;
