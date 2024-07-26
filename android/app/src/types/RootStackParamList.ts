import {Product} from './Product';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: {product: Product};
  AddProduct: undefined;
  EditProduct: {product: Product};
};
