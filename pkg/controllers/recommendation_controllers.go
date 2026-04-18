package controllers

import (
	"net/http"
	"sort"

	"github.com/gin-gonic/gin"
	"github.com/nishant/cardekho-assignment/internal/storage"
)

type UserNeed struct {
	BudgetMaxINR     int    `json:"budget_max_inr"`
	FamilySize       int    `json:"family_size"`
	FuelPreference   string `json:"fuel_preference"`
	PrimaryUsage     string `json:"primary_usage"`
	SafetyPriority   int    `json:"safety_priority"`
	MileagePriority  int    `json:"mileage_priority"`
	TransmissionPref string `json:"transmission_pref"`
	BodyTypePref     string `json:"body_type_pref"`
}

type Recommendation struct {
	Car       storage.Car `json:"car"`
	Score     float64     `json:"score"`
	WhyFits   []string    `json:"why_fits"`
	Tradeoffs []string    `json:"tradeoffs"`
}

type RecommendationController struct {
	store *storage.MemoryStore
}

func NewRecommendationController(s *storage.MemoryStore) *RecommendationController {
	return &RecommendationController{store: s}
}

func (rc *RecommendationController) Recommend(c *gin.Context) {
	var need UserNeed
	if err := c.ShouldBindJSON(&need); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	allCars := rc.store.ListCars()

	// Hard filter: budget and seating
	var candidates []storage.Car
	for _, car := range allCars {
		if need.BudgetMaxINR > 0 && car.PriceINR > need.BudgetMaxINR {
			continue
		}
		if need.FamilySize > 0 && car.SeatingCapacity < need.FamilySize {
			continue
		}
		if need.FuelPreference != "" && need.FuelPreference != "any" && car.FuelType != need.FuelPreference {
			continue
		}
		if need.TransmissionPref != "" && need.TransmissionPref != "any" && car.Transmission != need.TransmissionPref {
			continue
		}
		if need.BodyTypePref != "" && need.BodyTypePref != "any" && car.BodyType != need.BodyTypePref {
			continue
		}
		candidates = append(candidates, car)
	}

	type scored struct {
		car       storage.Car
		score     float64
		whyFits   []string
		tradeoffs []string
	}

	var results []scored
	for _, car := range candidates {
		s := 0.0
		var why, trade []string

		// Safety score (weight: safety_priority)
		safetyContrib := (car.SafetyRating / 5.0) * float64(need.SafetyPriority) * 20
		s += safetyContrib
		if car.SafetyRating >= 4.0 {
			why = append(why, "High safety rating")
		} else if need.SafetyPriority >= 4 {
			trade = append(trade, "Safety rating below your priority")
		}

		// Mileage score (weight: mileage_priority); EV gets flat bonus
		if car.FuelType == "ev" {
			s += float64(need.MileagePriority) * 10
			why = append(why, "Zero running cost as EV")
		} else if car.MileageKMPL > 0 {
			mileageContrib := (car.MileageKMPL / 30.0) * float64(need.MileagePriority) * 10
			s += mileageContrib
			if car.MileageKMPL >= 20 {
				why = append(why, "Excellent mileage")
			} else if need.MileagePriority >= 4 {
				trade = append(trade, "Mileage below your priority")
			}
		}

		// Usage match
		switch need.PrimaryUsage {
		case "city":
			s += float64(car.CityScore) * 3
			if car.CityScore >= 8 {
				why = append(why, "Great for city driving")
			}
			if car.HighwayScore <= 5 {
				trade = append(trade, "Not ideal for highway trips")
			}
		case "highway":
			s += float64(car.HighwayScore) * 3
			if car.HighwayScore >= 8 {
				why = append(why, "Excels on highways")
			}
			if car.CityScore <= 5 {
				trade = append(trade, "Less suited for city use")
			}
		default: // mixed
			s += float64(car.CityScore+car.HighwayScore) * 1.5
			if car.CityScore >= 7 && car.HighwayScore >= 7 {
				why = append(why, "Well-balanced for mixed use")
			}
		}

		// Price headroom bonus (within budget, closer to budget = better equipped)
		if need.BudgetMaxINR > 0 {
			priceRatio := float64(car.PriceINR) / float64(need.BudgetMaxINR)
			s += priceRatio * 10
		}

		if len(why) == 0 {
			why = append(why, "Meets your basic requirements")
		}

		results = append(results, scored{car: car, score: s, whyFits: why, tradeoffs: trade})
	}

	sort.Slice(results, func(i, j int) bool {
		return results[i].score > results[j].score
	})

	top := 3
	if len(results) < top {
		top = len(results)
	}

	recs := make([]Recommendation, top)
	for i := 0; i < top; i++ {
		recs[i] = Recommendation{
			Car:       results[i].car,
			Score:     results[i].score,
			WhyFits:   results[i].whyFits,
			Tradeoffs: results[i].tradeoffs,
		}
	}

	c.JSON(http.StatusOK, recs)
}
