package storage

func Seed(s *MemoryStore) {
	cars := []Car{
		// Existing Cars
		{
			ID: "1", Brand: "Maruti", Model: "Swift", Variant: "ZXi",
			PriceINR: 850000, BodyType: "hatchback", FuelType: "petrol",
			Transmission: "manual", SeatingCapacity: 5, MileageKMPL: 23.2,
			SafetyRating: 3.0, BootSpaceLitres: 268, CityScore: 8, HighwayScore: 6,
			FeatureTags: []string{"auto-ac", "touchscreen"},
		},
		{
			ID: "2", Brand: "Hyundai", Model: "i20", Variant: "Asta",
			PriceINR: 1050000, BodyType: "hatchback", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 20.4,
			SafetyRating: 3.5, BootSpaceLitres: 311, CityScore: 8, HighwayScore: 7,
			FeatureTags: []string{"sunroof", "auto-ac", "touchscreen"},
		},
		{
			ID: "3", Brand: "Tata", Model: "Nexon", Variant: "XZ+",
			PriceINR: 1400000, BodyType: "suv", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 17.4,
			SafetyRating: 5.0, BootSpaceLitres: 350, CityScore: 7, HighwayScore: 8,
			FeatureTags: []string{"6-airbags", "adas", "sunroof", "touchscreen"},
		},
		{
			ID: "4", Brand: "Tata", Model: "Nexon EV", Variant: "Max LR",
			PriceINR: 1950000, BodyType: "suv", FuelType: "ev",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 0,
			SafetyRating: 5.0, BootSpaceLitres: 350, CityScore: 9, HighwayScore: 7,
			FeatureTags: []string{"6-airbags", "adas", "sunroof", "fast-charge"},
		},

		// Added Cars
		{
			ID: "13", Brand: "Mahindra", Model: "XUV700", Variant: "AX7",
			PriceINR: 2300000, BodyType: "suv", FuelType: "diesel",
			Transmission: "automatic", SeatingCapacity: 7, MileageKMPL: 16.0,
			SafetyRating: 5.0, BootSpaceLitres: 240, CityScore: 7, HighwayScore: 9,
			FeatureTags: []string{"adas", "sunroof", "360-camera", "6-airbags"},
		},
		{
			ID: "14", Brand: "Mahindra", Model: "Scorpio N", Variant: "Z8L",
			PriceINR: 2100000, BodyType: "suv", FuelType: "diesel",
			Transmission: "automatic", SeatingCapacity: 7, MileageKMPL: 15.4,
			SafetyRating: 5.0, BootSpaceLitres: 460, CityScore: 6, HighwayScore: 9,
			FeatureTags: []string{"sunroof", "touchscreen", "6-airbags"},
		},
		{
			ID: "15", Brand: "Skoda", Model: "Slavia", Variant: "Style 1.5",
			PriceINR: 1750000, BodyType: "sedan", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 18.7,
			SafetyRating: 5.0, BootSpaceLitres: 521, CityScore: 7, HighwayScore: 9,
			FeatureTags: []string{"sunroof", "ventilated-seats", "touchscreen"},
		},
		{
			ID: "16", Brand: "Volkswagen", Model: "Virtus", Variant: "GT DSG",
			PriceINR: 1850000, BodyType: "sedan", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 18.1,
			SafetyRating: 5.0, BootSpaceLitres: 521, CityScore: 7, HighwayScore: 9,
			FeatureTags: []string{"sunroof", "digital-cluster", "touchscreen"},
		},
		{
			ID: "17", Brand: "Honda", Model: "City", Variant: "ZX CVT",
			PriceINR: 1650000, BodyType: "sedan", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 18.4,
			SafetyRating: 4.0, BootSpaceLitres: 506, CityScore: 8, HighwayScore: 9,
			FeatureTags: []string{"sunroof", "adas", "6-airbags"},
		},
		{
			ID: "18", Brand: "Maruti", Model: "Brezza", Variant: "ZXi AT",
			PriceINR: 1450000, BodyType: "suv", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 19.8,
			SafetyRating: 4.0, BootSpaceLitres: 328, CityScore: 8, HighwayScore: 7,
			FeatureTags: []string{"sunroof", "360-camera", "touchscreen"},
		},
		{
			ID: "19", Brand: "Tata", Model: "Punch", Variant: "Creative",
			PriceINR: 980000, BodyType: "suv", FuelType: "petrol",
			Transmission: "manual", SeatingCapacity: 5, MileageKMPL: 20.1,
			SafetyRating: 5.0, BootSpaceLitres: 366, CityScore: 8, HighwayScore: 7,
			FeatureTags: []string{"touchscreen", "auto-ac"},
		},
		{
			ID: "20", Brand: "Kia", Model: "Sonet", Variant: "GTX+",
			PriceINR: 1550000, BodyType: "suv", FuelType: "diesel",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 19.0,
			SafetyRating: 4.0, BootSpaceLitres: 392, CityScore: 8, HighwayScore: 8,
			FeatureTags: []string{"sunroof", "ventilated-seats", "touchscreen"},
		},
		{
			ID: "21", Brand: "Renault", Model: "Kiger", Variant: "RXZ Turbo",
			PriceINR: 1120000, BodyType: "suv", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 18.2,
			SafetyRating: 4.0, BootSpaceLitres: 405, CityScore: 8, HighwayScore: 7,
			FeatureTags: []string{"touchscreen", "wireless-charging"},
		},
		{
			ID: "22", Brand: "Nissan", Model: "Magnite", Variant: "XV Premium",
			PriceINR: 1090000, BodyType: "suv", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 17.7,
			SafetyRating: 4.0, BootSpaceLitres: 336, CityScore: 8, HighwayScore: 7,
			FeatureTags: []string{"360-camera", "touchscreen"},
		},
		{
			ID: "23", Brand: "BYD", Model: "Atto 3", Variant: "Special Edition",
			PriceINR: 3350000, BodyType: "suv", FuelType: "ev",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 0,
			SafetyRating: 5.0, BootSpaceLitres: 440, CityScore: 10, HighwayScore: 8,
			FeatureTags: []string{"panoramic-roof", "adas", "fast-charge"},
		},
		{
			ID: "24", Brand: "MG", Model: "ZS EV", Variant: "Essence",
			PriceINR: 2550000, BodyType: "suv", FuelType: "ev",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 0,
			SafetyRating: 5.0, BootSpaceLitres: 448, CityScore: 10, HighwayScore: 8,
			FeatureTags: []string{"sunroof", "adas", "fast-charge"},
		},
	}

	for _, c := range cars {
		s.AddCar(c)
	}
}
