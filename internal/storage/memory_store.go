package storage

import "sync"

type Car struct {
	ID              string   `json:"id"`
	Brand           string   `json:"brand"`
	Model           string   `json:"model"`
	Variant         string   `json:"variant"`
	PriceINR        int      `json:"price_inr"`
	BodyType        string   `json:"body_type"`
	FuelType        string   `json:"fuel_type"`
	Transmission    string   `json:"transmission"`
	SeatingCapacity int      `json:"seating_capacity"`
	MileageKMPL     float64  `json:"mileage_kmpl"`
	SafetyRating    float64  `json:"safety_rating"`
	BootSpaceLitres int      `json:"boot_space_litres"`
	CityScore       int      `json:"city_score"`
	HighwayScore    int      `json:"highway_score"`
	FeatureTags     []string `json:"feature_tags"`
}

type Shortlist struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	CarIDs    []string `json:"car_ids"`
	CreatedAt string   `json:"created_at"`
}

type MemoryStore struct {
	mu         sync.RWMutex
	Cars       map[string]Car
	Shortlists map[string]Shortlist
}

func NewMemoryStore() *MemoryStore {
	return &MemoryStore{
		Cars:       make(map[string]Car),
		Shortlists: make(map[string]Shortlist),
	}
}

func (s *MemoryStore) GetCar(id string) (Car, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	c, ok := s.Cars[id]
	return c, ok
}

func (s *MemoryStore) ListCars() []Car {
	s.mu.RLock()
	defer s.mu.RUnlock()
	cars := make([]Car, 0, len(s.Cars))
	for _, c := range s.Cars {
		cars = append(cars, c)
	}
	return cars
}

func (s *MemoryStore) AddCar(c Car) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.Cars[c.ID] = c
}

func (s *MemoryStore) GetShortlist(id string) (Shortlist, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	sl, ok := s.Shortlists[id]
	return sl, ok
}

func (s *MemoryStore) ListShortlists() []Shortlist {
	s.mu.RLock()
	defer s.mu.RUnlock()
	sls := make([]Shortlist, 0, len(s.Shortlists))
	for _, sl := range s.Shortlists {
		sls = append(sls, sl)
	}
	return sls
}

func (s *MemoryStore) SetShortlist(sl Shortlist) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.Shortlists[sl.ID] = sl
}

func (s *MemoryStore) DeleteShortlist(id string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.Shortlists[id]; !ok {
		return false
	}
	delete(s.Shortlists, id)
	return true
}
