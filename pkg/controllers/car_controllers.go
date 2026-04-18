package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nishant/cardekho-assignment/internal/storage"
)

type CarController struct {
	store *storage.MemoryStore
}

func NewCarController(s *storage.MemoryStore) *CarController {
	return &CarController{store: s}
}

func (cc *CarController) ListCars(c *gin.Context) {
	cars := cc.store.ListCars()

	if budget := c.Query("budget_max"); budget != "" {
		if max, err := strconv.Atoi(budget); err == nil {
			filtered := cars[:0]
			for _, car := range cars {
				if car.PriceINR <= max {
					filtered = append(filtered, car)
				}
			}
			cars = filtered
		}
	}
	if fuel := c.Query("fuel_type"); fuel != "" {
		filtered := cars[:0]
		for _, car := range cars {
			if car.FuelType == fuel {
				filtered = append(filtered, car)
			}
		}
		cars = filtered
	}
	if seating := c.Query("seating"); seating != "" {
		if min, err := strconv.Atoi(seating); err == nil {
			filtered := cars[:0]
			for _, car := range cars {
				if car.SeatingCapacity >= min {
					filtered = append(filtered, car)
				}
			}
			cars = filtered
		}
	}
	if tx := c.Query("transmission"); tx != "" {
		filtered := cars[:0]
		for _, car := range cars {
			if car.Transmission == tx {
				filtered = append(filtered, car)
			}
		}
		cars = filtered
	}
	if bt := c.Query("body_type"); bt != "" {
		filtered := cars[:0]
		for _, car := range cars {
			if car.BodyType == bt {
				filtered = append(filtered, car)
			}
		}
		cars = filtered
	}

	c.JSON(http.StatusOK, cars)
}

func (cc *CarController) GetCar(c *gin.Context) {
	car, ok := cc.store.GetCar(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "car not found"})
		return
	}
	c.JSON(http.StatusOK, car)
}

func (cc *CarController) AddCar(c *gin.Context) {
	var car storage.Car
	if err := c.ShouldBindJSON(&car); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if car.ID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}
	cc.store.AddCar(car)
	c.JSON(http.StatusCreated, car)
}
