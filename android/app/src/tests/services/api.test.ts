// __tests__/api.test.ts
import axios from 'axios';
import {Product} from '../../types/Product';
import {
  deleteProduct,
  fetchProducts,
  verifyProductId,
} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const AUTHOR_ID = '1723603997';
const BASE_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

// Define your mock product
const mockProduct: Product = {
  id: '1',
  name: 'Sample Product',
  description: 'This is a sample product',
  logo: 'http://example.com/logo.png',
  date_release: '2024-07-24',
  date_revision: '2025-07-24',
};

describe('API Service', () => {
  afterEach(() => {
    mock.reset();
  });

  test('fetchProducts should fetch products successfully', async () => {
    mock
      .onGet(`${BASE_URL}`, {
        headers: {
          authorId: AUTHOR_ID,
        },
      })
      .reply(200, [mockProduct]);

    const products = await fetchProducts();
    expect(products).toEqual([mockProduct]);
  });

  test('deleteProduct should delete a product successfully', async () => {
    mock
      .onDelete(`${BASE_URL}`, {
        headers: {
          authorId: AUTHOR_ID,
        },
        params: {
          id: '1',
        },
      })
      .reply(200, {success: true});

    const response = await deleteProduct('1');
    expect(response).toEqual({success: true});
  });

  test('verifyProductId should verify a product ID successfully', async () => {
    mock
      .onGet(`${BASE_URL}/verification`, {
        params: {
          id: '1',
        },
      })
      .reply(200, {exists: true});

    const response = await verifyProductId('1');
    expect(response).toEqual({exists: true});
  });
});
