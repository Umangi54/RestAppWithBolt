export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  spicyLevel?: number; // 0-3, where 0 is not spicy
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  distance: number; // in kilometers
  rating: number;
  priceLevel: string; // '$', '$$', '$$$', etc.
  cuisine: string;
  openingHours: string;
  phoneNumber: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isFavorite?: boolean;
  menu: MenuCategory[];
}

export interface FilterOptions {
  cuisine: string | null;
  maxDistance: number | null;
  priceLevel: string | null;
  rating: number | null;
  openNow: boolean;
}