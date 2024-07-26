import React from 'react';
import {View, StyleSheet} from 'react-native';
import Skeleton from './Skeletons';

const ProductListSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <Skeleton width={'50%'} height={50} borderRadius={25} />
          <View style={styles.skeletonText}>
            <Skeleton width="60%" />
            <Skeleton width="80%" />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  skeletonText: {
    marginLeft: 10,
    flex: 1,
  },
});

export default ProductListSkeleton;
