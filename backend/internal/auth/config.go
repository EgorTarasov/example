package auth

type Config struct {
	JwtSecret string `yaml:"jwt_secret" env:"JWT_SECRET" env-default:"super-secret"`
}
