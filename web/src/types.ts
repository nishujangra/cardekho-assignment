export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  price_inr: number;
  body_type: string;
  fuel_type: string;
  transmission: string;
  seating_capacity: number;
  mileage_kmpl: number;
  safety_rating: number;
  boot_space_litres: number;
  city_score: number;
  highway_score: number;
  feature_tags: string[];
}

export interface UserNeed {
  budget_max_inr: number;
  family_size: number;
  fuel_preference: string;
  primary_usage: string;
  safety_priority: number;
  mileage_priority: number;
  transmission_pref: string;
  body_type_pref: string;
}

export interface Recommendation {
  car: Car;
  score: number;
  why_fits: string[];
  tradeoffs: string[];
}

export interface Shortlist {
  id: string;
  name: string;
  car_ids: string[];
  created_at: string;
}

export interface ShortlistDetail extends Shortlist {
  cars: Car[];
}
