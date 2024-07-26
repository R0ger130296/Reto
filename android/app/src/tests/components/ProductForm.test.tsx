import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import ProductForm from '../../components/ProductForm';

describe('ProductForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with empty fields', () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('ID')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nombre')).toBeTruthy();
    expect(screen.getByPlaceholderText('Descripción')).toBeTruthy();
    expect(screen.getByPlaceholderText('URL del Logo')).toBeTruthy();
    expect(
      screen.getByPlaceholderText('Fecha de Liberación (YYYY-MM-DD)'),
    ).toBeTruthy();
    expect(
      screen.getByPlaceholderText('Fecha de Revisión (YYYY-MM-DD)'),
    ).toBeTruthy();
  });

  test('displays error messages for invalid inputs', () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('ID'), 'invalid_id');
    fireEvent.changeText(screen.getByPlaceholderText('Nombre'), 'ab');
    fireEvent.changeText(
      screen.getByPlaceholderText('URL del Logo'),
      'invalid_url',
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Fecha de Liberación (YYYY-MM-DD)'),
      'invalid_date',
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Fecha de Revisión (YYYY-MM-DD)'),
      'invalid_date',
    );

    fireEvent.press(screen.getByText('Guardar'));

    expect(screen.getByText('ID debe ser un número entero.')).toBeTruthy();
    expect(
      screen.getByText('Nombre debe tener al menos 3 caracteres.'),
    ).toBeTruthy();
    expect(
      screen.getByText('URL del logo debe ser una URL válida de imagen.'),
    ).toBeTruthy();
    expect(
      screen.getByText(
        'La fecha de liberación debe estar en formato YYYY-MM-DD.',
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        'La fecha de revisión debe estar en formato YYYY-MM-DD.',
      ),
    ).toBeTruthy();
  });

  test('calls onSubmit with correct values', () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('ID'), '123');
    fireEvent.changeText(screen.getByPlaceholderText('Nombre'), 'Test Product');
    fireEvent.changeText(
      screen.getByPlaceholderText('Descripción'),
      'This is a test product.',
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('URL del Logo'),
      'https://example.com/logo.png',
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Fecha de Liberación (YYYY-MM-DD)'),
      '2024-07-01',
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Fecha de Revisión (YYYY-MM-DD)'),
      '2025-07-01',
    );

    fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: '123',
      name: 'Test Product',
      description: 'This is a test product.',
      logo: 'https://example.com/logo.png',
      date_release: new Date('2024-07-01'),
      date_revision: new Date('2025-07-01'),
    });
  });

  test('shows confirmation modal for delete action', () => {
    render(<ProductForm onSubmit={mockOnSubmit} onDelete={mockOnDelete} />);

    fireEvent.press(screen.getByText('Eliminar'));

    expect(
      screen.getByText('¿Estás seguro de que deseas eliminar este producto?'),
    ).toBeTruthy();
  });

  test('handles confirmation modal actions', () => {
    render(<ProductForm onSubmit={mockOnSubmit} onDelete={mockOnDelete} />);

    fireEvent.press(screen.getByText('Eliminar'));

    fireEvent.press(screen.getByText('Sí'));
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
