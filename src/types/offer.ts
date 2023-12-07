export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type OfferApi = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: {
    name: string;
    location: TLocation;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  bedrooms: number;
  description: string;
  goods: string[];
  host: {
    id?: number;
    avatarUrl: string;
    isPro: boolean;
    name: string;
  };
  images: string[];
  maxAdults: number;
  location: TLocation;
};
