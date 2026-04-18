package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nishant/cardekho-assignment/internal/storage"
)

type ShortlistController struct {
	store *storage.MemoryStore
}

func NewShortlistController(s *storage.MemoryStore) *ShortlistController {
	return &ShortlistController{store: s}
}

func (sc *ShortlistController) CreateShortlist(c *gin.Context) {
	var body struct {
		Name   string   `json:"name"`
		CarIDs []string `json:"car_ids"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sl := storage.Shortlist{
		ID:        time.Now().Format("20060102150405.000000000"),
		Name:      body.Name,
		CarIDs:    body.CarIDs,
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
	}
	sc.store.SetShortlist(sl)
	c.JSON(http.StatusCreated, sl)
}

func (sc *ShortlistController) ListShortlists(c *gin.Context) {
	c.JSON(http.StatusOK, sc.store.ListShortlists())
}

func (sc *ShortlistController) GetShortlist(c *gin.Context) {
	sl, ok := sc.store.GetShortlist(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "shortlist not found"})
		return
	}

	type DetailedShortlist struct {
		storage.Shortlist
		Cars []storage.Car `json:"cars"`
	}

	var cars []storage.Car
	for _, cid := range sl.CarIDs {
		if car, found := sc.store.GetCar(cid); found {
			cars = append(cars, car)
		}
	}

	c.JSON(http.StatusOK, DetailedShortlist{Shortlist: sl, Cars: cars})
}

func (sc *ShortlistController) UpdateShortlist(c *gin.Context) {
	_, ok := sc.store.GetShortlist(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "shortlist not found"})
		return
	}

	var body struct {
		Name   string   `json:"name"`
		CarIDs []string `json:"car_ids"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existing, _ := sc.store.GetShortlist(c.Param("id"))
	existing.Name = body.Name
	existing.CarIDs = body.CarIDs
	sc.store.SetShortlist(existing)
	c.JSON(http.StatusOK, existing)
}

func (sc *ShortlistController) DeleteShortlist(c *gin.Context) {
	if !sc.store.DeleteShortlist(c.Param("id")) {
		c.JSON(http.StatusNotFound, gin.H{"error": "shortlist not found"})
		return
	}
	c.Status(http.StatusNoContent)
}
