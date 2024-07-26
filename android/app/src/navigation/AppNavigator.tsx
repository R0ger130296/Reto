import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import {RootStackParamList} from '../types/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Productos'}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{title: 'Agregar Producto'}}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{title: 'Editar Producto'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
