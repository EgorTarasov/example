package server

import (
	"context"
	"net"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"

	authHandlers "github.com/EgorTarasov/example/internal/auth/handlers"
	authRepo "github.com/EgorTarasov/example/internal/auth/repo"
	authService "github.com/EgorTarasov/example/internal/auth/service"
	chatHandlers "github.com/EgorTarasov/example/internal/chat/handlers"
	chatService "github.com/EgorTarasov/example/internal/chat/service"

	dashboardHandlers "github.com/EgorTarasov/example/internal/dashboard/handlers"
	dashboardRepos "github.com/EgorTarasov/example/internal/dashboard/repo"
	dashboardService "github.com/EgorTarasov/example/internal/dashboard/service"
	_ "github.com/EgorTarasov/example/internal/docs"
	"github.com/EgorTarasov/example/pkg/postgres"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"

	recovermw "github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"

	fiberSwagger "github.com/swaggo/fiber-swagger"
)

type Server interface {
	Serve()
}

type server struct {
	app    *fiber.App
	cfg    *Config
	nodeId string
	pgPool *pgxpool.Pool
}

// inits routes byt providing corresponding services such as auth and so on
func NewServer(cfg *Config) Server {
	if cfg == nil {
		panic("config not provided")
	}
	app := fiber.New(fiber.Config{
		ServerHeader: "tula-hack",
		BodyLimit:    4096,
	})
	nodeID := uuid.NewString()
	app.Use(logger.New())
	app.Use(recovermw.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     strings.Join(cfg.Server.Cors, ", "),
		AllowCredentials: true,
	}))
	app.Static("/", "./static")
	// Catch-all route to redirect to "/" for SPA
	app.Use(func(c *fiber.Ctx) error {
		// If the request path starts with /api, continue to the next handler
		if len(c.Path()) >= 4 && c.Path()[:4] == "/api" {
			return c.Next()
		}
		// Serve the index.html file for all other routes
		return c.SendFile("./static/index.html")
	})

	api := app.Group("/api")
	views := app.Group("/")

	api.Get("/docs/*", fiberSwagger.WrapHandler)

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString(nodeID)
	})

	pool, err := postgres.InitPostgres(context.Background(), cfg.Pg)
	if err != nil {
		panic(err)
	}
	// ch, err := click.InitClick(context.Background(), cfg.Click)
	// if err != nil {
	// 	panic(err)
	// }

	userRepo := authRepo.NewPgRepo(pool)

	authService := authService.New(userRepo, cfg.Auth.JwtSecret)
	authHandler := authHandlers.NewHandler(authService)

	authHandlers.InitRoutes(api, views, authHandler)

	chatService := chatService.NewChatService()
	chatHandler := chatHandlers.NewChatHandlers(chatService)
	chatHandlers.InitRoutes(api, views, chatHandler)

	go chatHandler.HandleMessages()

	dashboardRepo := dashboardRepos.NewPgRepo(pool)
	dashboardService := dashboardService.New(dashboardRepo)
	dashboardHandler := dashboardHandlers.NewHandler(dashboardService)
	dashboardHandlers.InitRoutes(api, views, dashboardHandler)

	return &server{
		app:    app,
		cfg:    cfg,
		nodeId: nodeID,
		pgPool: pool,
	}
}

func (s *server) Serve() {
	defer s.pgPool.Close()
	go func() {
		adr := net.JoinHostPort("0.0.0.0", strconv.FormatInt(int64(s.cfg.Server.Port), 10))
		if err := s.app.Listen(adr); err != nil {
			log.Err(err).Msg("application interrupted")
		}
	}()

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, syscall.SIGINT, syscall.SIGTERM)
	<-shutdown
	log.Info().Msg("shutting down")
	if err := s.app.Shutdown(); err != nil {
		log.Err(err).Msg("graceful shutdown")
	}

}
