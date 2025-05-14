import { Restaurant, FilterOptions } from '../types';

// Mock data for restaurants
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Sunny Side Café',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '123 Sunshine Ave, San Francisco, CA',
    distance: 0.3,
    rating: 4.7,
    priceLevel: '$$',
    cuisine: 'Breakfast & Brunch',
    openingHours: '7:00 AM - 3:00 PM',
    phoneNumber: '4155551234',
    description: 'A bright café specializing in breakfast, brunch, and lunch offerings using locally-sourced ingredients.',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    menu: [
      {
        id: 'breakfast',
        name: 'Breakfast',
        items: [
          {
            id: 'b1',
            name: 'Avocado Toast',
            description: 'Sourdough bread, mashed avocado, poached eggs, cherry tomatoes',
            price: 14.99,
            imageUrl: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            isVegetarian: true,
            isPopular: true
          },
          {
            id: 'b2',
            name: 'Eggs Benedict',
            description: 'English muffin, poached eggs, Canadian bacon, hollandaise sauce',
            price: 16.99,
            imageUrl: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            isPopular: true
          }
        ]
      },
      {
        id: 'drinks',
        name: 'Drinks',
        items: [
          {
            id: 'd1',
            name: 'Fresh Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 4.99,
            isGlutenFree: true
          },
          {
            id: 'd2',
            name: 'Latte',
            description: 'Espresso with steamed milk',
            price: 4.50,
            isVegetarian: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Pasta Paradise',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '456 Noodle Ln, San Francisco, CA',
    distance: 1.2,
    rating: 4.5,
    priceLevel: '$$$',
    cuisine: 'Italian',
    openingHours: '11:00 AM - 10:00 PM',
    phoneNumber: '4155555678',
    description: 'Authentic Italian pasta dishes made with imported ingredients and traditional recipes.',
    coordinates: {
      latitude: 37.7833,
      longitude: -122.4167
    },
    menu: [
      {
        id: 'starters',
        name: 'Starters',
        items: [
          {
            id: 's1',
            name: 'Bruschetta',
            description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
            price: 9.99,
            isVegetarian: true
          },
          {
            id: 's2',
            name: 'Calamari Fritti',
            description: 'Crispy fried calamari served with marinara sauce',
            price: 12.99,
            isPopular: true
          }
        ]
      },
      {
        id: 'pasta',
        name: 'Pasta',
        items: [
          {
            id: 'p1',
            name: 'Spaghetti Carbonara',
            description: 'Classic carbonara with pancetta, egg, black pepper, and pecorino cheese',
            price: 18.99,
            imageUrl: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            isPopular: true
          },
          {
            id: 'p2',
            name: 'Penne Arrabbiata',
            description: 'Spicy tomato sauce with garlic and red chili peppers',
            price: 16.99,
            isVegetarian: true,
            spicyLevel: 2
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Burger Joint',
    imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '789 Patty Rd, San Francisco, CA',
    distance: 0.8,
    rating: 4.2,
    priceLevel: '$$',
    cuisine: 'American',
    openingHours: '11:00 AM - 9:00 PM',
    phoneNumber: '4155559012',
    description: 'Gourmet burgers made with grass-fed beef and fresh, locally-sourced toppings.',
    coordinates: {
      latitude: 37.7694,
      longitude: -122.4862
    },
    menu: [
      {
        id: 'burgers',
        name: 'Burgers',
        items: [
          {
            id: 'bg1',
            name: 'Classic Cheeseburger',
            description: 'Angus beef patty, cheddar cheese, lettuce, tomato, onion, special sauce',
            price: 15.99,
            imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            isPopular: true
          },
          {
            id: 'bg2',
            name: 'Spicy Jalapeño Burger',
            description: 'Angus beef patty, pepper jack cheese, jalapeños, chipotle mayo',
            price: 16.99,
            spicyLevel: 2,
            isPopular: true
          },
          {
            id: 'bg3',
            name: 'Veggie Burger',
            description: 'House-made plant-based patty, avocado, sprouts, vegan mayo',
            price: 14.99,
            isVegetarian: true,
            isGlutenFree: true
          }
        ]
      },
      {
        id: 'sides',
        name: 'Sides',
        items: [
          {
            id: 'sd1',
            name: 'Hand-Cut Fries',
            description: 'Crispy fries with house seasoning',
            price: 4.99,
            isVegetarian: true
          },
          {
            id: 'sd2',
            name: 'Sweet Potato Fries',
            description: 'Crispy sweet potato fries with chipotle aioli',
            price: 5.99,
            isVegetarian: true
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Sushi Wave',
    imageUrl: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '321 Ocean Blvd, San Francisco, CA',
    distance: 1.6,
    rating: 4.8,
    priceLevel: '$$$$',
    cuisine: 'Japanese',
    openingHours: '5:00 PM - 11:00 PM',
    phoneNumber: '4155553456',
    description: 'Premium sushi and Japanese dishes prepared by master chefs with fresh fish delivered daily.',
    coordinates: {
      latitude: 37.8029,
      longitude: -122.4050
    },
    menu: [
      {
        id: 'sushi',
        name: 'Sushi Rolls',
        items: [
          {
            id: 'sr1',
            name: 'Dragon Roll',
            description: 'Eel, cucumber, avocado, tobiko',
            price: 18.99,
            imageUrl: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            isPopular: true
          },
          {
            id: 'sr2',
            name: 'Spicy Tuna Roll',
            description: 'Spicy tuna, cucumber, green onion',
            price: 15.99,
            spicyLevel: 2
          }
        ]
      },
      {
        id: 'appetizers',
        name: 'Appetizers',
        items: [
          {
            id: 'ap1',
            name: 'Edamame',
            description: 'Steamed soybeans with sea salt',
            price: 6.99,
            isVegetarian: true,
            isGlutenFree: true
          },
          {
            id: 'ap2',
            name: 'Miso Soup',
            description: 'Traditional Japanese soup with tofu and seaweed',
            price: 4.99,
            isVegetarian: true
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Taco Town',
    imageUrl: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '567 Salsa St, San Francisco, CA',
    distance: 0.5,
    rating: 4.3,
    priceLevel: '$',
    cuisine: 'Mexican',
    openingHours: '10:00 AM - 10:00 PM',
    phoneNumber: '4155557890',
    description: 'Authentic Mexican street tacos with homemade salsas and traditional recipes.',
    coordinates: {
      latitude: 37.7599,
      longitude: -122.4148
    },
    menu: [
      {
        id: 'tacos',
        name: 'Tacos',
        items: [
          {
            id: 't1',
            name: 'Al Pastor',
            description: 'Marinated pork, pineapple, onion, cilantro',
            price: 3.99,
            imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            isPopular: true
          },
          {
            id: 't2',
            name: 'Pescado',
            description: 'Grilled fish, cabbage slaw, chipotle crema',
            price: 4.99,
            spicyLevel: 1
          },
          {
            id: 't3',
            name: 'Hongos',
            description: 'Grilled mushrooms, guacamole, onion, cilantro',
            price: 3.99,
            isVegetarian: true,
            isGlutenFree: true
          }
        ]
      },
      {
        id: 'sides',
        name: 'Sides',
        items: [
          {
            id: 's1',
            name: 'Guacamole & Chips',
            description: 'Fresh guacamole with house-made tortilla chips',
            price: 7.99,
            isVegetarian: true,
            isGlutenFree: true
          },
          {
            id: 's2',
            name: 'Elote',
            description: 'Mexican street corn with mayo, cheese, chili powder',
            price: 4.99,
            isVegetarian: true
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Green Garden',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '890 Veggie Way, San Francisco, CA',
    distance: 1.9,
    rating: 4.6,
    priceLevel: '$$',
    cuisine: 'Vegetarian',
    openingHours: '9:00 AM - 9:00 PM',
    phoneNumber: '4155554321',
    description: 'Fresh, organic vegetarian and vegan dishes focused on seasonal produce from local farms.',
    coordinates: {
      latitude: 37.7785,
      longitude: -122.4346
    },
    menu: [
      {
        id: 'mains',
        name: 'Main Dishes',
        items: [
          {
            id: 'm1',
            name: 'Buddha Bowl',
            description: 'Quinoa, roasted vegetables, avocado, tahini dressing',
            price: 16.99,
            imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            isVegetarian: true,
            isGlutenFree: true,
            isPopular: true
          },
          {
            id: 'm2',
            name: 'Spicy Cauliflower Wings',
            description: 'Crispy cauliflower, buffalo sauce, ranch dressing',
            price: 14.99,
            isVegetarian: true,
            spicyLevel: 2
          }
        ]
      },
      {
        id: 'salads',
        name: 'Salads',
        items: [
          {
            id: 'sl1',
            name: 'Kale Caesar',
            description: 'Kale, cashew dressing, tempeh bacon, croutons',
            price: 13.99,
            isVegetarian: true
          },
          {
            id: 'sl2',
            name: 'Rainbow Bowl',
            description: 'Mixed greens, seasonal vegetables, seeds, lemon vinaigrette',
            price: 14.99,
            isVegetarian: true,
            isGlutenFree: true
          }
        ]
      }
    ]
  }
];

export const getRestaurants = async (
  filterOptions?: FilterOptions
): Promise<Restaurant[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!filterOptions) {
    return mockRestaurants;
  }

  return mockRestaurants.filter((restaurant) => {
    // Filter by cuisine
    if (filterOptions.cuisine && restaurant.cuisine !== filterOptions.cuisine) {
      return false;
    }

    // Filter by max distance
    if (
      filterOptions.maxDistance !== null &&
      restaurant.distance > filterOptions.maxDistance
    ) {
      return false;
    }

    // Filter by price level
    if (
      filterOptions.priceLevel !== null &&
      restaurant.priceLevel !== filterOptions.priceLevel
    ) {
      return false;
    }

    // Filter by minimum rating
    if (
      filterOptions.rating !== null &&
      restaurant.rating < filterOptions.rating
    ) {
      return false;
    }

    return true;
  });
};

export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const restaurant = mockRestaurants.find(r => r.id === id);
  return restaurant || null;
};

export const getFavoriteRestaurants = async (): Promise<Restaurant[]> => {
  // In a real app, this would fetch from a user's favorites in a database
  // For now, we'll just return a subset of mock data
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockRestaurants.slice(0, 3).map(restaurant => ({
    ...restaurant,
    isFavorite: true
  }));
};

// In a real app, this would update a user's favorites in a database
export const toggleFavorite = async (
  id: string, 
  isFavorite: boolean
): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return true; // Success
};