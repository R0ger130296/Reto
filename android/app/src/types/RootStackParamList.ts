import {Product} from './Product';

export type RootStackParamList = {
  Home: undefined;
  AddProduct: undefined;
  EditProduct: {product: Product};
};
