package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/nishant/cardekho-assignment/pkg/controllers"
)

func RegisterCarRoutes(rg *gin.RouterGroup, cc *controllers.CarController) {
	rg.GET("/cars", cc.ListCars)
	rg.GET("/cars/:id", cc.GetCar)
	rg.POST("/cars", cc.AddCar)
}
