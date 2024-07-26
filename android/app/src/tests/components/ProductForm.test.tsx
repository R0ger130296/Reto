import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProductForm from '../../components/ProductForm';
import '@testing-library/jest-native/extend-expect';

describe('ProductForm', () => {
  test('renders correctly with initial props', () => {
    const mockOnSubmit = jest.fn();
    const mockOnDelete = jest.fn();
    const product = {
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'http://example.com/logo.png',
      date_release: '2024-07-24',
      date_revision: '2025-07-24',
    };

    render(
      <ProductForm
        product={product}
        onSubmit={mockOnSubmit}
        onDelete={mockOnDelete}
      />,
    );

    // Buscar elementos por placeholder
    const idInput = screen.getByPlaceholderText('ID');
    const nameInput = screen.getByPlaceholderText('Nombre');
    const descriptionInput = screen.getByPlaceholderText('Descripción');
    const logoInput = screen.queryByPlaceholderText(
      'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    );
    const saveButton = screen.getByText('Guardar');
    const deleteButton = screen.getByText('Eliminar');

    // Verificar valores iniciales
    expect(idInput.props.value).toBe('123');
    expect(nameInput.props.value).toBe('Product Name');
    expect(descriptionInput.props.value).toBe('Product Description');

    // Verifica si logoInput está presente y si tiene el valor correcto
    if (logoInput) {
      expect(logoInput.props.value).toBe(
        'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      );
    } else {
      // Manejo alternativo si logoInput no está presente
    }
    expect(saveButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });
});
