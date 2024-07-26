import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import ProductForm from '../components/ProductForm';
import {Product} from '../types/Product';
import {addProduct} from '../services/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';

type AddProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddProduct'
>;

interface AddProductScreenProps {
  navigation: AddProductScreenNavigationProp;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({navigation}) => {
  const handleAddProduct = async (product: Product) => {
    try {
      await addProduct(product);
      Alert.alert(
        'Producto agregado',
        `El producto ${product.name} ha sido agregado exitosamente.`,
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo agregar el producto. Inténtalo de nuevo.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <ProductForm onSubmit={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default AddProductScreen;
