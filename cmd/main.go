package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/nishant/cardekho-assignment/internal/storage"
	"github.com/nishant/cardekho-assignment/pkg/controllers"
	"github.com/nishant/cardekho-assignment/pkg/routes"
)

func main() {
	store := storage.NewMemoryStore()
	storage.Seed(store)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: false,
	}))

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	api := r.Group("/api")
	routes.RegisterCarRoutes(api, controllers.NewCarController(store))
	routes.RegisterRecommendationRoutes(api, controllers.NewRecommendationController(store))
	routes.RegisterShortlistRoutes(api, controllers.NewShortlistController(store))

	r.Run(":8080")
}
