import React, { useState } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (text) => {
    setQuery(text);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={query}
        onChangeText={handleChange}
        leftIcon={
          <Icon
            name="search"
            size={24}
            color="#888"
            style={styles.icon}
          />
        }
        leftIconContainerStyle={styles.iconContainer}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

export default function App() {
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    // Perform search and update results
    setResults([
      { key: '1', name: 'Result 1' },
      { key: '2', name: 'Result 2' },
      { key: '3', name: 'Result 3' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Search onSearch={handleSearch} />
      <FlatList
        data={results}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
};
