import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRestaurantSearch } from 'src/features/restaurant/hooks/useRestaurantSearch';
import RestaurantCard from '@shared/components/restaurant/RestaurantCard';
import { useAuthContext } from 'src/core/context/AuthContext';

const mockCarousel = [
  { id: '1', image: 'https://source.unsplash.com/800x400/?burger' },
  { id: '2', image: 'https://source.unsplash.com/800x400/?pizza' },
  { id: '3', image: 'https://source.unsplash.com/800x400/?sushi' },
];

const CustomerHomeScreen = () => {
  const { query, results, loading, error, handleSearch } = useRestaurantSearch();
  const { user } = useAuthContext();

  const direccion = user?.profile?.addresses?.[0] || 'Sin dirección';

  return (
    <View style={styles.container}>

      {/* 🔍 SearchBar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar restaurantes..."
          value={query}
          onChangeText={handleSearch}
          style={styles.searchInput}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => handleSearch(query)} style={styles.searchIcon}>
          <Icon name="search" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 🎠 Carrusel de imágenes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {mockCarousel.map((item) => (
          <Image key={item.id} source={{ uri: item.image }} style={styles.carouselImage} />
        ))}
      </ScrollView>

      {/* 📋 Lista de restaurantes */}
      {loading && <ActivityIndicator size="large" style={styles.centered} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // 🔝 Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontWeight: '600',
    fontSize: 16,
  },

  // 🔍 SearchBar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  searchIcon: {
    padding: 8,
    marginLeft: -40,
  },

  // 🎠 Carrusel
  carousel: {
    marginBottom: 12,
  },
  carouselImage: {
    width: 300,
    height: 140,
    borderRadius: 12,
    marginHorizontal: 10,
  },

  // 📋 Lista
  centered: {
    marginVertical: 24,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
});

export default CustomerHomeScreen;
