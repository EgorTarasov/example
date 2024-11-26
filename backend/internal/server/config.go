package server

import (
	"github.com/EgorTarasov/example/internal/auth"
	"github.com/EgorTarasov/example/internal/dashboard"
	"github.com/EgorTarasov/example/pkg/postgres"
	"github.com/ilyakaznacheev/cleanenv"
)

type ServerConfig struct {
	Port int      `yaml:"port" env:"PORT" env-default:"9999"`
	Host string   `yaml:"host" env:"HOST" env-default:"larek.tech"`
	Cors []string `yaml:"cors" env:"CORS" env-default:"https://larek.tech"`
}

type Config struct {
	Pg        *postgres.Config  `yaml:"pg"`
	Server    *ServerConfig     `yaml:"server"`
	Auth      *auth.Config      `yaml:"auth"`
	Dashboard *dashboard.Config `yaml:"dashboard"`
}

func NewConfig(configFilePath string, env ...bool) *Config {
	var cfg Config
	err := cleanenv.ReadConfig(configFilePath, &cfg)
	if err != nil {
		panic(err)
	}
	return &cfg
}
