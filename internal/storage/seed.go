package storage

func Seed(s *MemoryStore) {
	cars := []Car{
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
		{
			ID: "5", Brand: "Maruti", Model: "Ertiga", Variant: "VXi CNG",
			PriceINR: 1000000, BodyType: "mpv", FuelType: "cng",
			Transmission: "manual", SeatingCapacity: 7, MileageKMPL: 26.1,
			SafetyRating: 3.0, BootSpaceLitres: 135, CityScore: 7, HighwayScore: 6,
			FeatureTags: []string{"auto-ac", "touchscreen"},
		},
		{
			ID: "6", Brand: "Honda", Model: "Amaze", Variant: "VX Diesel",
			PriceINR: 1100000, BodyType: "sedan", FuelType: "diesel",
			Transmission: "manual", SeatingCapacity: 5, MileageKMPL: 24.7,
			SafetyRating: 3.5, BootSpaceLitres: 420, CityScore: 6, HighwayScore: 9,
			FeatureTags: []string{"auto-ac", "touchscreen"},
		},
		{
			ID: "7", Brand: "Kia", Model: "Seltos", Variant: "HTX Plus",
			PriceINR: 1800000, BodyType: "suv", FuelType: "petrol",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 16.5,
			SafetyRating: 4.0, BootSpaceLitres: 433, CityScore: 7, HighwayScore: 9,
			FeatureTags: []string{"sunroof", "adas", "6-airbags", "touchscreen"},
		},
		{
			ID: "8", Brand: "Toyota", Model: "Innova Crysta", Variant: "GX Diesel",
			PriceINR: 2200000, BodyType: "mpv", FuelType: "diesel",
			Transmission: "manual", SeatingCapacity: 7, MileageKMPL: 15.1,
			SafetyRating: 4.0, BootSpaceLitres: 300, CityScore: 6, HighwayScore: 9,
			FeatureTags: []string{"auto-ac", "touchscreen", "captain-seats"},
		},
		{
			ID: "9", Brand: "Hyundai", Model: "Creta", Variant: "SX(O)",
			PriceINR: 1900000, BodyType: "suv", FuelType: "diesel",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 18.4,
			SafetyRating: 4.5, BootSpaceLitres: 433, CityScore: 8, HighwayScore: 9,
			FeatureTags: []string{"sunroof", "adas", "6-airbags", "touchscreen", "360-camera"},
		},
		{
			ID: "10", Brand: "Maruti", Model: "Alto K10", Variant: "VXi",
			PriceINR: 550000, BodyType: "hatchback", FuelType: "petrol",
			Transmission: "manual", SeatingCapacity: 5, MileageKMPL: 24.9,
			SafetyRating: 2.0, BootSpaceLitres: 214, CityScore: 9, HighwayScore: 5,
			FeatureTags: []string{"touchscreen"},
		},
		{
			ID: "11", Brand: "MG", Model: "Comet EV", Variant: "Excite",
			PriceINR: 750000, BodyType: "hatchback", FuelType: "ev",
			Transmission: "automatic", SeatingCapacity: 4, MileageKMPL: 0,
			SafetyRating: 3.0, BootSpaceLitres: 83, CityScore: 10, HighwayScore: 4,
			FeatureTags: []string{"touchscreen", "fast-charge"},
		},
		{
			ID: "12", Brand: "Toyota", Model: "Camry", Variant: "Hybrid",
			PriceINR: 4800000, BodyType: "sedan", FuelType: "hybrid",
			Transmission: "automatic", SeatingCapacity: 5, MileageKMPL: 19.0,
			SafetyRating: 4.5, BootSpaceLitres: 506, CityScore: 8, HighwayScore: 9,
			FeatureTags: []string{"sunroof", "adas", "6-airbags", "360-camera", "leather-seats"},
		},
	}
	for _, c := range cars {
		s.AddCar(c)
	}
}
