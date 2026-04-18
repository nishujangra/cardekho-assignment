package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/nishant/cardekho-assignment/pkg/controllers"
)

func RegisterShortlistRoutes(rg *gin.RouterGroup, sc *controllers.ShortlistController) {
	rg.POST("/shortlists", sc.CreateShortlist)
	rg.GET("/shortlists", sc.ListShortlists)
	rg.GET("/shortlists/:id", sc.GetShortlist)
	rg.PUT("/shortlists/:id", sc.UpdateShortlist)
	rg.DELETE("/shortlists/:id", sc.DeleteShortlist)
}
