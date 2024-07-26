// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './android/app/src/screens/HomeScreen';
import AddProductScreen from './android/app/src/screens/AddProductScreen';
import ProductDetailScreen from './android/app/src/screens/ProductDetailScreen';
import EditProductScreen from './android/app/src/screens/EditProductScreen';
import {RootStackParamList} from './android/app/src/types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
