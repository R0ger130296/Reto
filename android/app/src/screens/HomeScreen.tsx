import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {Product} from '../types/Product';
import {fetchProducts} from '../services/api';
import ProductListSkeleton from '../components/Skeletons/ProductListSkeleton';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: {product: Product};
  AddProduct: undefined;
  EditProduct: {product: Product};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [loadProducts]),
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('EditProduct', {product: item})}>
      <Text style={styles.productName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ProductListSkeleton />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
        />
      )}
      <Button
        title="Agregar Producto"
        onPress={() => navigation.navigate('AddProduct')}
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
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  productItem: {
    marginBottom: 5,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
