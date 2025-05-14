import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';
import { Restaurant } from '../types';
import { formatDistance, formatPriceLevel } from '../utils/formatters';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPressFavorite?: (id: string, isFavorite: boolean) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width > 500 ? width / 2 - 24 : width - 32;

export default function RestaurantCard({ restaurant, onPressFavorite }: RestaurantCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardWidth }]} 
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Image 
        source={{ uri: restaurant.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <Text style={styles.price}>{formatPriceLevel(restaurant.priceLevel)}</Text>
        </View>
        
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
          
          <View style={styles.distanceContainer}>
            <MapPin size={14} color="#8E8E93" />
            <Text style={styles.distance}>{formatDistance(restaurant.distance)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  cuisine: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#3C3C43',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginLeft: 4,
    fontSize: 14,
    color: '#8E8E93',
  },
});