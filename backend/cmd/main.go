package main

import (
	"flag"
	"fmt"

	"github.com/EgorTarasov/example/internal/server"
	"github.com/rs/zerolog/log"
)

// @title			t1 api
// @version		1.0
// @description	 api for t1 hackaton
// @termsOfService	http://swagger.io/terms/
// @contact.name	API Support
// @contact.email	fiber@swagger.io
// @license.name	BSD 3-Clause License
// @license.url	https://raw.githubusercontent.com/EgorTarasov/example/main/LICENSE
// @host			larek.tech
// @BasePath		/
func main() {
	configPath := flag.String("config", "config.yaml", "path to config file")
	flag.Parse()
	log.Info().Str("configPath", *configPath).Msg("loading config")
	log.Info().Msg("starting server")
	cfg := server.NewConfig(*configPath)
	fmt.Println(cfg)
	srv := server.NewServer(cfg)
	srv.Serve()

}
