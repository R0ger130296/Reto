// services/api.ts
'use strict';
import axios from 'axios';
import {Product} from '../types/Product';

const API_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const AUTHOR_ID = '1723603997';
/**
 * Fetches products from the API.
 * @returns {Promise<Product[]>}
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/bp/products`, {
      headers: {
        authorId: AUTHOR_ID,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Adds a product to the API.
 * @param product
 * @returns
 */
export const addProduct = async (product: Product) => {
  try {
    const response = await axios.post(`${API_URL}/bp/products`, product, {
      headers: {
        authorId: AUTHOR_ID,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Actualizar Producto Financiero
/**
 * Updates a product in the API.
 * @param product
 * @returns
 */
export const updateProduct = async (product: Product) => {
  try {
    const response = await axios.put(`${API_URL}/bp/products`, product, {
      headers: {
        authorId: AUTHOR_ID,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Eliminar Producto Financiero
/**
 * Deletes a product from the API.
 * @param productId
 * @returns
 */
export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/bp/products`, {
      headers: {
        authorId: AUTHOR_ID,
      },
      params: {
        id: productId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Verificar Existencia de ID
/**
 * Verifies if a product exists in the API.
 * @param productId
 * @returns
 */
export const verifyProductId = async (productId: string) => {
  try {
    const response = await axios.get(`${API_URL}/bp/products/verification`, {
      params: {
        id: productId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying product ID:', error);
    throw error;
  }
};
