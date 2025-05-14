import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filterKey: keyof FilterOptions, value: any) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const cuisineTypes = ['All', 'Italian', 'Japanese', 'Mexican', 'American', 'Vegetarian', 'Breakfast & Brunch'];
  const distances = [
    { label: 'Any', value: null },
    { label: '< 1 km', value: 1 },
    { label: '< 2 km', value: 2 },
    { label: '< 5 km', value: 5 },
  ];
  
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cuisine filters */}
        {cuisineTypes.map(cuisine => (
          <TouchableOpacity
            key={`cuisine-${cuisine}`}
            style={[
              styles.filterChip,
              (cuisine === 'All' && !filters.cuisine) || 
              cuisine === filters.cuisine ? styles.filterChipActive : null
            ]}
            onPress={() => onFilterChange('cuisine', cuisine === 'All' ? null : cuisine)}
          >
            <Text style={[
              styles.filterChipText,
              (cuisine === 'All' && !filters.cuisine) || 
              cuisine === filters.cuisine ? styles.filterChipTextActive : null
            ]}>
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Distance filters */}
        {distances.map(distance => (
          <TouchableOpacity
            key={`distance-${distance.label}`}
            style={[
              styles.filterChip,
              filters.maxDistance === distance.value ? styles.filterChipActive : null
            ]}
            onPress={() => onFilterChange('maxDistance', distance.value)}
          >
            <Text style={[
              styles.filterChipText,
              filters.maxDistance === distance.value ? styles.filterChipTextActive : null
            ]}>
              {distance.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    color: '#3C3C43',
  },
  filterChipTextActive: {
    color: 'white',
  },
});