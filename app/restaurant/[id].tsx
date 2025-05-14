import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, Clock, Phone, Heart, Share2, Leaf, Wheat, Siren as Fire } from 'lucide-react-native';
import { Restaurant, MenuItem } from '../../types';
import { getRestaurantById, toggleFavorite } from '../../services/restaurantService';
import { formatDistance, formatPhoneNumber } from '../../utils/formatters';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getRestaurantById(id);
          setRestaurant(data);
          setIsFavorite(data?.isFavorite || false);
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurant();
  }, [id]);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleFavoriteToggle = async () => {
    if (!restaurant) return;
    
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    try {
      await toggleFavorite(restaurant.id, newFavoriteState);
    } catch (error) {
      // Revert UI if the API call fails
      setIsFavorite(isFavorite);
      console.error('Error toggling favorite:', error);
    }
  };
  
  const handleCall = () => {
    if (restaurant?.phoneNumber) {
      Linking.openURL(`tel:${restaurant.phoneNumber}`);
    }
  };
  
  const handleOpenMap = () => {
    if (restaurant?.coordinates) {
      const { latitude, longitude } = restaurant.coordinates;
      const scheme = Platform.select({ ios: 'maps:', android: 'geo:' });
      const url = Platform.select({
        ios: `${scheme}?q=${restaurant.name}&ll=${latitude},${longitude}`,
        android: `${scheme}${latitude},${longitude}?q=${restaurant.name}`,
        web: `https://maps.google.com/?q=${latitude},${longitude}`
      });
      
      if (url) {
        Linking.openURL(url);
      }
    }
  };
  
  const handleShare = () => {
    if (Platform.OS !== 'web') {
      // This would use the Share API on native platforms
      console.log('Share functionality');
    } else {
      // On web, we could copy to clipboard or open a share dialog
      if (navigator.share) {
        navigator.share({
          title: restaurant?.name,
          text: `Check out ${restaurant?.name}!`,
          url: window.location.href,
        });
      }
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <View key={item.id} style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        
        <View style={styles.menuItemBadges}>
          {item.isVegetarian && (
            <View style={styles.badge}>
              <Leaf size={14} color="#22C55E" />
              <Text style={[styles.badgeText, { color: '#22C55E' }]}>Vegetarian</Text>
            </View>
          )}
          {item.isGlutenFree && (
            <View style={styles.badge}>
              <Wheat size={14} color="#EAB308" />
              <Text style={[styles.badgeText, { color: '#EAB308' }]}>Gluten-free</Text>
            </View>
          )}
          {item.spicyLevel && item.spicyLevel > 0 && (
            <View style={styles.badge}>
              <Fire size={14} color="#EF4444" />
              <Text style={[styles.badgeText, { color: '#EF4444' }]}>
                {Array(item.spicyLevel).fill('🌶️').join('')}
              </Text>
            </View>
          )}
          {item.isPopular && (
            <View style={[styles.badge, styles.popularBadge]}>
              <Text style={styles.popularBadgeText}>Popular</Text>
            </View>
          )}
        </View>
      </View>
      
      {item.imageUrl && (
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.menuItemImage}
          resizeMode="cover"
        />
      )}
    </View>
  );
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  
  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Restaurant not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: restaurant.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.backButtonOverlay} onPress={handleBack}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
              
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.rating}>{restaurant.rating}</Text>
                <Text style={styles.priceLevel}>{restaurant.priceLevel}</Text>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleFavoriteToggle}>
                <Heart 
                  size={24} 
                  color={isFavorite ? '#FF3B30' : '#8E8E93'} 
                  fill={isFavorite ? '#FF3B30' : 'transparent'} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share2 size={24} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.infoRow}>
              <MapPin size={18} color="#8E8E93" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{restaurant.address}</Text>
                <Text style={styles.distance}>
                  {formatDistance(restaurant.distance)} away
                </Text>
                <TouchableOpacity onPress={handleOpenMap}>
                  <Text style={styles.actionLink}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Clock size={18} color="#8E8E93" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Opening Hours</Text>
                <Text style={styles.infoValue}>{restaurant.openingHours}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Phone size={18} color="#8E8E93" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>
                  {formatPhoneNumber(restaurant.phoneNumber)}
                </Text>
                <TouchableOpacity onPress={handleCall}>
                  <Text style={styles.actionLink}>Call Restaurant</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Menu</Text>
            {restaurant.menu.map((category) => (
              <View key={category.id} style={styles.menuCategory}>
                <Text style={styles.categoryName}>{category.name}</Text>
                {category.items.map(renderMenuItem)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C3C43',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButtonOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 16,
    color: '#3C3C43',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#3C3C43',
  },
  priceLevel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#000000',
  },
  distance: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  actionLink: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3C3C43',
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  menuCategory: {
    marginBottom: 24,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuItemContent: {
    flex: 1,
    marginRight: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 8,
    lineHeight: 20,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  menuItemBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  popularBadge: {
    backgroundColor: '#007AFF',
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});