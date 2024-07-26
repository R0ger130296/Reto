import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const SearchBar = ({searchText, onSearchTextChange}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar productos..."
        value={searchText}
        onChangeText={onSearchTextChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
});

export default SearchBar;
