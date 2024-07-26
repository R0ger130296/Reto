import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import ProductForm from '../components/ProductForm';
import {Product} from '../types/Product';
import {useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import {updateProduct, deleteProduct} from '../services/api';

type EditProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditProduct'
>;

interface EditProductScreenProps {
  navigation: EditProductScreenNavigationProp;
}

const EditProductScreen: React.FC<EditProductScreenProps> = ({navigation}) => {
  const route = useRoute();
  const {product} = route.params as {product: Product};

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct);
      Alert.alert(
        'Producto editado',
        `El producto ${updatedProduct.name} ha sido editado exitosamente.`,
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo editar el producto. Inténtalo de nuevo.',
      );
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(product.id);
      Alert.alert(
        'Producto eliminado',
        `El producto ${product.name} ha sido eliminado.`,
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo eliminar el producto. Inténtalo de nuevo.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <ProductForm
        product={product}
        onSubmit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
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

export default EditProductScreen;
