# t1 solution

# Подготовка окружения
1. Настройка сервера  
расположите файл конфигурации `server.yaml` в `/etc/t1/server.yaml`
1. Настройка docker  engine на сервере - https://docs.docker.com/engine/install/ubuntu/
1. Настройка docker context для развертывания на сервере
```bash
# 1. Создание контекста для подключения к серверу
docker context create t1-context --docker "host=ssh://<user>@<host>"
# 2. переключение на контекст
docker context use t1-context
# 3. Инициализация swarm для сервера
docker swarm init
```
1. Запуск приложения на сервере
```bash
docker stack deploy -c docker-compose.yaml t1
```
