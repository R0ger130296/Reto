import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Product} from '../types/Product';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
  onDelete?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product = {},
  onSubmit,
  onDelete,
}) => {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const [id, setId] = React.useState(product.id || '');
  const [name, setName] = React.useState(product.name || '');
  const [description, setDescription] = React.useState(
    product.description || '',
  );
  const [logo, setLogo] = React.useState(product.logo || '');
  const [dateRelease, setReleaseDate] = React.useState(
    product.date_release ? formatDate(product.date_release) : '',
  );
  const [dateRevision, setReviewDate] = React.useState(
    product.date_revision ? formatDate(product.date_revision) : '',
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState<
    'delete' | 'edit' | 'create' | null
  >(null);

  // Error states
  const [errors, setErrors] = useState({
    id: '',
    name: '',
    description: '',
    logo: '',
    dateRelease: '',
    dateRevision: '',
  });

  // Handle form submission
  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.values(formErrors).every(error => error === '')) {
      if (product.id) {
        showConfirmationModal('edit');
      } else {
        showConfirmationModal('create');
      }
    } else {
      setErrors(formErrors);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const errors: any = {};

    if (!id) errors.id = 'ID es obligatorio.';

    if (!name) errors.name = 'Nombre es obligatorio.';

    if (!description) errors.description = 'Descripción es obligatoria.';

    if (!logo) errors.logo = 'URL del logo es obligatoria.';

    if (!dateRelease)
      errors.dateRelease = 'Fecha de liberación es obligatoria.';
    else if (!isValidDate(dateRelease))
      errors.dateRelease =
        'La fecha de liberación debe estar en formato YYYY-MM-DD.';

    if (!dateRevision)
      errors.dateRevision = 'Fecha de revisión es obligatoria.';
    else if (!isValidDate(dateRevision))
      errors.dateRevision =
        'La fecha de revisión debe estar en formato YYYY-MM-DD.';
    else if (!isOneYearLater(dateRelease, dateRevision))
      errors.dateRevision =
        'La fecha de revisión debe ser exactamente un año después de la fecha de liberación.';

    return errors;
  };

  // Check if a date is valid
  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = parseDate(dateString);
    const [year, month, day] = dateString.split('-').map(Number);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  // Check if revision date is exactly one year later than release date
  const isOneYearLater = (
    releaseDateString: string,
    revisionDateString: string,
  ) => {
    const releaseDate = parseDate(releaseDateString);
    const revisionDate = parseDate(revisionDateString);

    // Add one year to the release date
    const expectedRevisionDate = new Date(releaseDate);
    expectedRevisionDate.setFullYear(releaseDate.getFullYear() + 1);

    return (
      expectedRevisionDate.getFullYear() === revisionDate.getFullYear() &&
      expectedRevisionDate.getMonth() === revisionDate.getMonth() &&
      expectedRevisionDate.getDate() === revisionDate.getDate()
    );
  };

  // Show confirmation modal
  const showConfirmationModal = (type: 'delete' | 'edit' | 'create') => {
    setActionType(type);
    setModalVisible(true);
  };

  // Handle modal action
  const handleModalAction = () => {
    if (actionType === 'delete' && onDelete) {
      onDelete();
    } else if (actionType === 'create' || actionType === 'edit') {
      const newProduct = {
        id,
        name,
        description,
        logo,
        date_release: parseDate(dateRelease),
        date_revision: parseDate(dateRevision),
      };
      onSubmit(newProduct);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.id ? styles.inputError : null]}
        placeholder="ID"
        value={id}
        onChangeText={setId}
        editable={!product.id}
      />
      {errors.id ? <Text style={styles.errorText}>{errors.id}</Text> : null}

      <TextInput
        style={[styles.input, errors.name ? styles.inputError : null]}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        style={[styles.input, errors.description ? styles.inputError : null]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      {errors.description ? (
        <Text style={styles.errorText}>{errors.description}</Text>
      ) : null}

      {logo ? (
        <Image source={{uri: logo}} style={styles.image} />
      ) : (
        <TextInput
          style={[styles.input, errors.logo ? styles.inputError : null]}
          placeholder="URL del Logo"
          value={logo}
          onChangeText={setLogo}
        />
      )}
      {errors.logo ? <Text style={styles.errorText}>{errors.logo}</Text> : null}

      <TextInput
        style={[styles.input, errors.dateRelease ? styles.inputError : null]}
        placeholder="Fecha de Liberación (YYYY-MM-DD)"
        value={dateRelease}
        onChangeText={setReleaseDate}
      />
      {errors.dateRelease ? (
        <Text style={styles.errorText}>{errors.dateRelease}</Text>
      ) : null}

      <TextInput
        style={[styles.input, errors.dateRevision ? styles.inputError : null]}
        placeholder="Fecha de Revisión (YYYY-MM-DD)"
        value={dateRevision}
        onChangeText={setReviewDate}
      />
      {errors.dateRevision ? (
        <Text style={styles.errorText}>{errors.dateRevision}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      {onDelete && (
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => showConfirmationModal('delete')}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      )}
      {/* Confirmation Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {actionType === 'delete'
                ? '¿Estás seguro de que deseas eliminar este producto?'
                : actionType === 'edit'
                ? '¿Estás seguro de que deseas editar este producto?'
                : '¿Estás seguro de que deseas crear este producto?'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleModalAction}>
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '45%',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductForm;
