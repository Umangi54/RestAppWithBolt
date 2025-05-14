export const formatDistance = (distance: number): string => {
  if (distance < 0.1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
};

export const formatPriceLevel = (priceLevel: string): string => {
  return priceLevel;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Format phone number for display
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};