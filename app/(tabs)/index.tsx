import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Restaurant, FilterOptions } from '../../types';
import { getRestaurants } from '../../services/restaurantService';
import RestaurantCard from '../../components/RestaurantCard';
import SearchBar from '../../components/SearchBar';
import FilterBar from '../../components/FilterBar';

const { width } = Dimensions.get('window');
const numColumns = width > 500 ? 2 : 1;

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    cuisine: null,
    maxDistance: null,
    priceLevel: null,
    rating: null,
    openNow: false
  });

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const data = await getRestaurants(filters);
      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchRestaurants();
    setIsRefreshing(false);
  };

  const handleFilterChange = (filterKey: keyof FilterOptions, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (!text.trim()) {
      setFilteredRestaurants(restaurants);
      return;
    }
    
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(text.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(text.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredRestaurants(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRestaurants(restaurants);
  };
  
  // Fetch restaurants when filters change
  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  // Refetch when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchRestaurants();
    }, [])
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={clearSearch}
      />
      
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {isLoading && !isRefreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : filteredRestaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No restaurants found</Text>
          <Text style={styles.emptySubtext}>Try adjusting your filters or search</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#007AFF"
              colors={['#007AFF']}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C3C43',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
});