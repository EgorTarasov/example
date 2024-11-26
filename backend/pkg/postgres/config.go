package postgres

type Config struct {
	Dsn string `yaml:"dsn" env:"DSN" env-default:"postgresql://pg-user:pg-password@pg:5432/t1-dev"`
}
