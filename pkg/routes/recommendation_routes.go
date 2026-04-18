package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/nishant/cardekho-assignment/pkg/controllers"
)

func RegisterRecommendationRoutes(rg *gin.RouterGroup, rc *controllers.RecommendationController) {
	rg.POST("/recommendations", rc.Recommend)
}
